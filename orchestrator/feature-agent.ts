import { ChatCompletionRequestMessageRoleEnum } from "openai";

import { Agent } from "@/orchestrator/agent";
import type { Question, State } from "@/orchestrator/model";

export class FeatureAgent extends Agent {
  async act(state: State): Promise<State> {
    if (state.dimension === undefined) {
      // STEP: Generate dimension
      // LLM generates dimension
      const systemMessageContent = `Pretend you are a product manager and you are interacting with your boss.
Your ultimate objective is to come up with a high-quality feature that you can build into the existing product.
Based on the request from your boss, your first task is to come up with an interesting dimension to conduct research on.
This dimension may be very clear from your boss's message or you might need to come up with an important dimension on your own.`;
      const systemMessage = {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content: systemMessageContent,
      };
      const userMessage = {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: "", // TODO: FILL IN
      };
      const completion = await this.openai.createChatCompletion({
        model: "gpt-4",
        messages: [systemMessage, userMessage],
      });
      const llmResponse = completion.data.choices[0].message;

      // Parse output for dimension
      if (llmResponse === undefined) {
        return Promise.resolve(state);
      }
      const dimension = llmResponse.content;
      const newState = {
        ...state,
        dimension: { text: dimension },
      };
      return Promise.resolve(newState);
    } else if (state.dimension.questions === undefined) {
      // STEP: Generate questions
      // LLM generates questions
      const systemMessageContent = `Pretend you are a product manager that is conducting research to come up with a high-quality feature.
The first step in your research process is to come up with questions that you need answers to in order to make informed product decisions.
Based on the dimension that is specified, come up with a list of 5 critical questions that you would like the answer to before you start thinking about new features to build.
Your output should be a numbered list of 5 questions.`;
      const systemMessage = {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content: systemMessageContent,
      };
      const userMessage = {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: state.dimension.text,
      };
      const completion = await this.openai.createChatCompletion({
        model: "gpt-4",
        messages: [systemMessage, userMessage],
      });

      // Parse output for list of questions
      const llmResponse = completion.data.choices[0].message;
      if (llmResponse === undefined) {
        return Promise.resolve(state);
      }
      const questions = getQuestionsFromLlmResponse(llmResponse.content);

      return Promise.resolve({
        ...state,
        dimension: {
          ...state.dimension,
          questions: questions,
        },
      });
    } else if (state.dimension.questions.some((q) => q.answer === undefined)) {
      // Answer questions
    } else if (
      state.dimension.questions.some((q) => q.followUpQuestions === undefined)
    ) {
      // Generate follow up questions
    } else if (
      state.dimension.questions.some((q) =>
        q.followUpQuestions?.some((fuq) => fuq.answer === undefined)
      )
    ) {
      // Answer follow up questions
    } else if (state.problems === undefined) {
      // Identify problems
    } else if (state.problems.some((p) => p.feature === undefined)) {
      // Generate feature
    }

    return Promise.resolve(state);
  }
}

function getQuestionsFromLlmResponse(llmResponse: string): Question[] {
  const lines = llmResponse.split("\n");
  const questions: Question[] = [];

  for (const line of lines) {
    const question = line.trim();
    const match = question.match(/^\d+\.\s+(.*)$/);
    if (match) {
      const questionText = match[1];
      questions.push({ text: questionText });
    }
  }

  return questions;
}
