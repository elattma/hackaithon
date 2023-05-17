import { Action, ActionType, State } from "@/orchestrator/model";
import { OpenAIApi } from "openai";

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
  return traverseState(api, state);
};
