import { AgentType, State } from "@/orchestrator/model";
import { OpenAIApi } from "openai";
import { PrdAgent } from "./prd-agent";
import { ResearchAgent } from "./research-agent";
import { TicketeerAgent } from "./ticketeer-agent";

const encoder = new TextEncoder();

// TODO: make this sequential instead of recursive
export async function* traverseState(
  api: OpenAIApi,
  state: State
): AsyncGenerator {
  console.log("traverseState!", state);
  if (!api || !state || !state.next || state.next?.agent === AgentType.ERROR) {
    throw new Error("Invalid arguments");
  }
  if (
    state.next.external_prompt?.request &&
    !state.next.external_prompt?.response
  ) {
    return;
  }

  switch (state.next.agent) {
    case AgentType.RESEARCH:
      const researchAgent = new ResearchAgent(api);
      state.next = await researchAgent.act(state);
      yield encoder.encode(JSON.stringify(state));
      break;
    case AgentType.PRD:
      const prdAgent = new PrdAgent(api);
      state.next = await prdAgent.act(state);
      yield encoder.encode(JSON.stringify(state));
      break;
    case AgentType.TICKETEER:
      const ticketeerAgent = new TicketeerAgent(api);
      state.next = await ticketeerAgent.act(state);
      yield encoder.encode(JSON.stringify(state));
      break;
    default:
      state.next = {
        agent: AgentType.ERROR,
      };
  }
  console.log("next state:", state);
  if (
    state.next.agent === AgentType.ERROR ||
    state.next.agent === AgentType.END
  ) {
    return;
  }
  yield* traverseState(api, state);
}
