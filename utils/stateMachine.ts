import { ChatCompletionRequestMessage, OpenAIApi } from "openai";
import { HumanAction, State } from "./model";

export interface CompletionParams {
  model: "gpt-3.5-turbo" | "gpt-4";
  messages: ChatCompletionRequestMessage[];
  temprature?: number;
  stream?: boolean;
  maxTokens?: number;
}

export const completion = (api: OpenAIApi) => {
  return async (params: CompletionParams): Promise<string | undefined> => {
    const response = await api.createChatCompletion({
      model: params.model,
      messages: params.messages,
      temperature: params.temprature ? params.temprature : 0,
      stream: params.stream ? params.stream : false,
      max_tokens: params.maxTokens ? params.maxTokens : 150,
    });
    return response.data.choices[0].message?.content;
  };
};

export const traverseState = async (
  api: OpenAIApi,
  state: State,
  humanAction: HumanAction
): Promise<State> => {
  // orchestrator here
  return {};
};
