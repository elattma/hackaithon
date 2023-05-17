import { AgentType, State } from "@/orchestrator/model";
import { OpenAIApi } from "openai";
import { PrdAgent } from "./prd-agent";
import { ResearchAgent } from "./research-agent";

const encoder = new TextEncoder();

// TODO: make this sequential instead of recursive
export async function* traverseState(api: OpenAIApi, state: State) {
  if (!api || !state || state.next?.agent === AgentType.ERROR) {
    throw new Error("Invalid arguments");
  }
  if (!state.next) {
    // Assuming this only happens when starting from the beginning
    // TODO: add check for other state and handle cases where somehow this was nullified
    // Can parse state and figure out where to start in the state machine
    state.next = {
      agent: AgentType.RESEARCH,
    };
  } else if (state.next.external_prompt) {
    yield encoder.encode(JSON.stringify(state));
    return;
  }

  switch (state.next.agent) {
    case AgentType.RESEARCH:
      const researchAgent = new ResearchAgent(api);
      state.next = await researchAgent.act(state);
      yield encoder.encode("Research Agent did something!");
      break;
    case AgentType.PRD:
      const prdAgent = new PrdAgent(api);
      state.next = await prdAgent.act(state);
      yield encoder.encode("PRD Agent did something!");
      break;
    case AgentType.TICKETEER:
      const ticketeerAgent = new ResearchAgent(api);
      state.next = await ticketeerAgent.act(state);
      yield encoder.encode("Ticketeer Agent did something!");
      break;
    case AgentType.END:
      state.next = {
        agent: AgentType.END,
      };
      yield encoder.encode("I'm finished!");
      yield encoder.encode(JSON.stringify(state));
      return;
    case AgentType.ERROR:
    default:
      state.next = {
        agent: AgentType.ERROR,
      };
      yield encoder.encode("Something went wrong!");
      yield encoder.encode(JSON.stringify(state));
      return;
  }
  traverseState(api, state);
}
