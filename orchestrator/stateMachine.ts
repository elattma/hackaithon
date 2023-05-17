import { OpenAIApi } from "openai";
import { Action, State } from "./model";

export const traverseState = async (
  api: OpenAIApi,
  state: State,
  action: Action
): Promise<State> => {
  // orchestrator here
  return {};
};
