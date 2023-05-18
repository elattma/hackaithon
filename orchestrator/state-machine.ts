import { ActionType, AgentType, State } from "@/orchestrator/model";
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
  if (!api || !state || !state.next || state.next?.agent === AgentType.ERROR) {
    throw new Error("Invalid arguments");
  }
  if (state.next.external_prompt) {
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
    case AgentType.END:
      state.next = {
        agent: AgentType.END,
        external_prompt: {
          request: {
            type: ActionType.ConfirmFeature,
          },
        },
      };
      yield encoder.encode(JSON.stringify(state));
      console.log("Finished!");
      console.log(state.next);
      return;
    default:
      state.next = {
        agent: AgentType.ERROR,
      };
      yield encoder.encode(JSON.stringify(state));
      return;
  }
  console.log(state.next);
  yield* traverseState(api, state);
}
