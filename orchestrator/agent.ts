import { PineconeClient } from "@pinecone-database/pinecone";
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";
import { State } from "@/orchestrator/model";

export abstract class Agent {
  protected openai: OpenAIApi;
  protected cache: PineconeClient;

  constructor(openai: OpenAIApi, cache: PineconeClient) {
    this.openai = openai;
    this.cache = cache;
  }

  private chat = async (params: {
    model: "gpt-3.5-turbo" | "gpt-4";
    messages: ChatCompletionRequestMessage[];
    temprature?: number;
    stream?: boolean;
    maxTokens?: number;
  }): Promise<string | undefined> => {
    const response = await this.openai.createChatCompletion({
      model: params.model,
      messages: params.messages,
      temperature: params.temprature ? params.temprature : 0,
      stream: params.stream ? params.stream : false,
      max_tokens: params.maxTokens ? params.maxTokens : 150,
    });
    return response.data.choices[0].message?.content;
  };

  abstract act(state: State): Promise<State>;
}
