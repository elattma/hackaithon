import { Agent } from "@/orchestrator/agent";
import { ActionType, AgentType, Next, State } from "@/orchestrator/model";
import { promptQuestionAnswers } from "@/orchestrator/prompter";
import { ChatCompletionRequestMessage } from "openai";

const systemPrompt: ChatCompletionRequestMessage = {
  role: "system",
  content: `You are a product manager at a startup. You are writing a Product 
  Requirements Document for a new feature. 
  Write it given the provided information. Use proper grammar, full sentences 
  and correct punctuation. It MUST BE AT LEAST 500 WORDS LONG.
  -------------------------
  Follow this format:
  <INSERT Clear and descriptive title for the PRD>
  1. Introduction
  <INSERT introduction to the problem>
  2. Product Overview
  <INSERT feature overview>
  3. User Personas
  <INSERT user personas>
  4. Goals and Objectives
  <INSERT goals and objectives>
  5. Features and Functionalities
  <INSERT features and functionalities>
  6. User Flow
  <INSERT user flow>
  7. Wireframes
  <INSERT wireframes>
  8. Non-Functional Requirements
  <INSERT non-functional requirements>
  9. Assumptions
  <INSERT assumptions>
  10. Dependencies
  <INSERT dependencies>
  11. Acceptance Criteria
  <INSERT acceptance criteria>`,
};

export class PrdAgent extends Agent {
  async act(state: State): Promise<Next> {
    const questions = state.questions;
    if (!questions?.length) {
      throw new Error("No questions found");
    }

    const problem = state.problems?.[0];
    const feature = problem?.feature;
    const table = problem?.table;

    const featurePrompt: ChatCompletionRequestMessage = {
      role: "system",
      content: `The feature you must write this Product Requirements Document about is: ${feature}. 
      Here is a table of information you previously learned about the feature: ${table}`,
    };

    const qaText = promptQuestionAnswers(questions);
    const qaPrompt: ChatCompletionRequestMessage = {
      role: "user",
      content: qaText,
    };

    const prdPrompt: ChatCompletionRequestMessage = {
      role: "user",
      content: "Please write the Product Requirements Document!",
    };

    const prd = await this.chat({
      model: "gpt-3.5-turbo",
      messages: [systemPrompt, featurePrompt, qaPrompt, prdPrompt],
      temperature: 0,
      maxTokens: 2000,
    });

    state.prd = prd;
    return {
      agent: AgentType.TICKETEER,
      external_prompt: {
        request: {
          type: ActionType.ConfirmPRD,
        },
      },
    };
  }
}
