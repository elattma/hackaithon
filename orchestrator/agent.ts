import { Next, State } from "@/orchestrator/model";
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";

export abstract class Agent {
  protected openai: OpenAIApi;
  constructor(openai: OpenAIApi) {
    this.openai = openai;
  }

  protected chat = async (params: {
    model: "gpt-3.5-turbo" | "gpt-4";
    messages: ChatCompletionRequestMessage[];
    temperature: number;
    maxTokens: number;
    stream?: boolean;
  }): Promise<string | undefined> => {
    const response = await this.openai.createChatCompletion({
      model: params.model,
      messages: params.messages,
      temperature: params.temperature,
      max_tokens: params.maxTokens,
      stream: params.stream,
    });
    return response.data.choices[0].message?.content;
  };

  abstract act(state: State): Promise<Next>;
}
