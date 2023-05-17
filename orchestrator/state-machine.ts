import { OpenAIApi } from "openai";
import { Action, ActionType, State } from "@/orchestrator/model";

// TODO: make this sequential instead of recursive
export const traverseState = async (
  api: OpenAIApi,
  state: State,
  action?: Action
): Promise<State | undefined> => {
  if (!api || !state) {
    throw new Error("Invalid arguments");
  }
  if (!action && state.prd) {
    // condition where it should stop
    return state;
  }
  switch (action?.type) {
    case ActionType.InputDimension:
      // do stuff
      break;
    case ActionType.ConfirmFeature:
      // do stuff
      break;
    case ActionType.ConfirmPRD:
      // do stuff
      break;
  }
  return traverseState(api, state);
};
