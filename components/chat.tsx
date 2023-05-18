"use client";

import { AgentMessage } from "@/components/agent-message";
import { AgentThought } from "@/components/agent-thought";
import { Features } from "@/components/features";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserMessage } from "@/components/user-message";
import { useStateContext } from "@/context/state";
import { ActionType, AgentType, State } from "@/orchestrator/model";
import { useState } from "react";

const decoder = new TextDecoder();

// TODO: add somewhere we can add a password

export function Chat() {
  const { state, setState } = useStateContext();
  const [input, setInput] = useState<string>("");

  const provideInput: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    const newState: State = {
      ...state,
      input,
      next: {
        agent: AgentType.RESEARCH,
      },
    };
    setState(newState);
    const response = await fetch("http://localhost:3000/api", {
      method: "POST",
      body: JSON.stringify({
        state: newState,
        password: "mimo4aiagents",
      }),
    });
    if (!response.body) {
      return;
    }
    const reader = response.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        return;
      }
      const decoded = decoder.decode(value);
      try {
        console.log(decoded);
        const decodedState: State = JSON.parse(decoded);
        setState(decodedState);
        console.log("state!", decodedState);
        const request = decodedState.next?.external_prompt?.request;
        if (decodedState.next?.agent === AgentType.END) {
          // you know you are done with your goal
        }
        if (request?.type === ActionType.ProvideInput) {
          // todo: prompt to provide input
        } else if (request?.type === ActionType.ConfirmPRD) {
          // todo: prompt to confirm
        } else if (request?.type === ActionType.ConfirmFeature) {
          // todo: prompt to confirm feature
        } else {
          // ???? did something go wrong? or just end?
        }
        // TODO: set agent message here depending on what the state is
        // TODO: parse next, and prompt for what to do next
      } catch (e) {
        console.log("error parsing state!", e);
      }
      // TODO: set thoughts in UI here
    }
  };

  return (
    <main className="flex-1 overflow-y-auto my-4 rounded-sm border flex flex-col p-4 gap-4">
      <div className="flex flex-col flex-1 gap-4 overflow-y-auto">
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
        {state.questions?.some((q) => q.answer === undefined) ? (
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
        {state.followUpQuestions?.some((q) => q.answer === undefined) ? null : (
          <AgentThought content="Found answers to my follow up questions... Synthesizing my knowledge and coming up with new features" />
        )}
        {state.features === undefined ? null : (
          <Features features={state.features} />
        )}
      </div>
      <form
        className="flex items-center gap-4"
        onSubmit={(event) => {
          provideInput(event);
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
