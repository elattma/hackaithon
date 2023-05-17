import { OpenAIApi } from "openai";
import { HumanAction, State } from "./model";

export const traverseState = async (
  api: OpenAIApi,
  state: State,
  humanAction: HumanAction
): Promise<State> => {
  // orchestrator here
  return {};
};
