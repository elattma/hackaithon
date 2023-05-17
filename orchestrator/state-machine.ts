import { Action, ActionType, State } from "@/orchestrator/model";
import { OpenAIApi } from "openai";

const encoder = new TextEncoder();

// TODO: make this sequential instead of recursive
export async function* traverseState(
  api: OpenAIApi,
  state: State,
  action?: Action
) {
  yield encoder.encode(JSON.stringify(state));
  if (!api || !state) {
    throw new Error("Invalid arguments");
  }
  if (!action && state.prd) {
    // condition where it should stop
    return;
  }
  switch (action?.type) {
    case ActionType.InputDimension:
      // apply action to state
      // do stuff
      break;
    case ActionType.ConfirmFeature:
      // apply action to state
      // do stuff
      break;
    case ActionType.ConfirmPRD:
      // apply action to state
      // do stuff
      break;
  }
  traverseState(api, state);
}