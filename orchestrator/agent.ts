import { ChatCompletionRequestMessage, OpenAIApi } from "openai";
import { State } from "./model";

export abstract class Agent {
  protected api: OpenAIApi;
  constructor(api: OpenAIApi) {
    this.api = api;
  }

  private chat = (api: OpenAIApi) => {
    return async (params: {
      model: "gpt-3.5-turbo" | "gpt-4";
      messages: ChatCompletionRequestMessage[];
      temprature?: number;
      stream?: boolean;
      maxTokens?: number;
    }): Promise<string | undefined> => {
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

  abstract act(state: State): Promise<State>;
}
