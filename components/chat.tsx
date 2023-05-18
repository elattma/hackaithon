"use client";

import { AgentMessage } from "@/components/agent-message";
import { AgentThought } from "@/components/agent-thought";
import { Features } from "@/components/features";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserMessage } from "@/components/user-message";
import { useStateContext } from "@/context/state";
import {
  ActionType,
  AgentType,
  EditPrdParams,
  State,
} from "@/orchestrator/model";
import { useEffect, useRef, useState } from "react";
import { Tasks } from "./tasks";

const decoder = new TextDecoder();

// TODO: add somewhere we can add a password

export function Chat() {
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { state, setState } = useStateContext();
  const [input, setInput] = useState<string>("");
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const traverse = async (event: any, newState?: State) => {
    event.preventDefault();
    if (newState === undefined) {
      return;
    }
    console.log("traversing!", newState);
    const response = await fetch("http://localhost:3000/api", {
      method: "POST",
      body: JSON.stringify({
        state: newState,
        password: "mimo4aiagents",
      }),
    });
    if (!response.body) {
      console.log("no body!");
      return;
    }
    const reader = response.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        console.log("done!");
        return;
      }
      const decoded = decoder.decode(value);
      try {
        console.log(decoded);
        const decodedState: State = JSON.parse(decoded);
        setState(decodedState);
        console.log("state!", decodedState);
      } catch (e) {
        console.log("error parsing state!", e);
      }
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state]);

  return (
    <main className="flex-1 overflow-y-auto my-4 rounded-sm border flex flex-col p-4 gap-4">
      <div className="flex flex-col flex-1 gap-3 overflow-y-auto">
        <AgentMessage content="Hello! I'm Raina, your AI product manager. How can I help you?" />
        {state.input === undefined ? null : (
          <>
            <UserMessage content={state.input} />
            <AgentThought content="Thinking about questions to research" />
          </>
        )}
        {state.questions === undefined ? null : (
          <AgentThought
            content={`Attempting to answer these questions:\n${state.questions.reduce(
              (acc, curr, index) => acc + `${index + 1}. ${curr.text}\n`,
              ""
            )}`}
          />
        )}
        {state.questions &&
        state.questions.some((q) => q.answer !== undefined) ? (
          <AgentThought content="Found answers to my questions... Thinking of follow up questions" />
        ) : null}
        {state.followUpQuestions === undefined ? null : (
          <AgentThought
            content={`Attempting to answer these follow up questions:\n${state.followUpQuestions.reduce(
              (acc, curr, index) => acc + `${index + 1}. ${curr.text}\n`,
              ""
            )}`}
          />
        )}
        {state.followUpQuestions &&
        state.followUpQuestions.some((q) => q.answer !== undefined) ? (
          <AgentThought content="Found answers to my follow up questions... Synthesizing my knowledge and coming up with new features" />
        ) : null}
        {state.features === undefined ? null : (
          <Features features={state.features} />
        )}
        {state.features && state.features.length === 1 ? (
          <AgentThought content="Creating a Product Requirements Document from the feature you have selected" />
        ) : null}
        {state.prd === undefined ? null : (
          <>
            <AgentMessage
              content={`Here is the Product Requirements Document:
            
            ${state.prd}`}
            />
            <AgentMessage
              content={`Type "confirm" to create the tickets or enter in how you would like me to edit your document`}
            />
          </>
        )}
        {showConfirm ? <UserMessage content="confirm" /> : null}
        {state.next?.agent === AgentType.PRD &&
        state.next?.external_prompt?.response?.type ===
          ActionType.ConfirmPRD ? (
          <AgentThought
            content={"Editing your Product Requirements Document accordingly."}
          />
        ) : null}
        {state.tasks === undefined ? null : (
          <>
            <AgentMessage content="Here are tickets based on the PRD. I've created them for you in Linear as well." />
            <Tasks tasks={state.tasks} />
          </>
        )}
        {state.next?.agent === AgentType.END ? (
          <AgentThought content={"Done!"} />
        ) : null}
        <div ref={chatEndRef} />
      </div>
      <form
        className="flex items-center gap-4"
        onSubmit={(event) => {
          let newState: State | undefined = undefined;
          if (!state.next) {
            newState = {
              ...state,
              input,
              next: {
                agent: AgentType.RESEARCH,
              },
            };
          } else if (state.next.agent === AgentType.RESEARCH) {
            newState = state;
          } else if (state.next.agent === AgentType.PRD) {
            if (!state.next.external_prompt) {
              console.log("invalid state!");
              return;
            }
            let feat = -1;
            try {
              feat = parseInt(input);
            } catch (e) {}
            if (feat < 1 || !state.features || feat > state.features.length) {
              console.log("invalid feature!");
              return;
            }
            newState = {
              ...state,
              features: [state.features[feat - 1]],
              next: {
                agent: state.next.agent,
                external_prompt: {
                  request: state.next.external_prompt.request,
                  response: {
                    type: ActionType.ConfirmFeature,
                  },
                },
              },
            };
          } else if (state.next.agent === AgentType.TICKETEER) {
            if (input === "confirm") {
              newState = {
                ...state,
                next: {
                  agent: AgentType.TICKETEER,
                },
              };
              setShowConfirm(true);
            } else if (input === "stop") {
              newState = {
                ...state,
                next: {
                  agent: AgentType.END,
                },
              };
            } else {
              if (state.next?.external_prompt === undefined) {
                console.log("invalid state!");
                return;
              }
              newState = {
                ...state,
                next: {
                  agent: AgentType.PRD,
                  external_prompt: {
                    request: state.next.external_prompt.request,
                    response: {
                      type: ActionType.ConfirmPRD,
                      params: {
                        text: input,
                      } as EditPrdParams,
                    },
                  },
                },
              };
            }
          } else if (state.next.agent === AgentType.END) {
            return;
          }

          if (newState === undefined) {
            console.log("invalid state!");
            return;
          }
          setState(newState);
          traverse(event, newState);
          setInput("");
        }}
      >
        <Input
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <Button>Send</Button>
      </form>
    </main>
  );
}
