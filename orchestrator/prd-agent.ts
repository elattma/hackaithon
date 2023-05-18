import { Agent } from "@/orchestrator/agent";
import {
  ActionType,
  AgentType,
  EditPrdParams,
  Next,
  State,
} from "@/orchestrator/model";
import { promptQuestionAnswers } from "@/orchestrator/prompter";
import { ChatCompletionRequestMessage } from "openai";

export class PrdAgent extends Agent {
  async act(state: State): Promise<Next> {
    if (state.prd === undefined) {
      const questions = state.questions;
      if (!questions?.length) {
        throw new Error("No questions found");
      }

      const feature = state.features?.[0];
      if (!feature) {
        throw new Error("No feature found");
      }

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

      const featurePrompt: ChatCompletionRequestMessage = {
        role: "system",
        content: `The feature you must write this Product Requirements Document about is: ${feature.name}.
        The feature is described as: ${feature.description}. 
        The feature is estimated to take ${feature.hours} hours to complete.
        The rationale behind the feature is: ${feature.rationale}.
        The pros of the feature are: ${feature.pros}. The cons of the feature are: ${feature.cons}.`,
      };

      const qaText = promptQuestionAnswers(
        questions.concat(state.followUpQuestions ?? [])
      );
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
    } else if (state.next?.external_prompt?.response) {
      console.log("rewrite!!!");
      const prdPrompt: ChatCompletionRequestMessage = {
        role: "user",
        content: `Here is the current Product Requirements Document:\n${state.prd}`,
      };

      const params = state.next.external_prompt.response
        .params as EditPrdParams;
      const systemPrompt: ChatCompletionRequestMessage = {
        role: "system",
        content: `Edit the provided Product Requirements Document according to: ${params.text}`,
      };

      const userPrompt: ChatCompletionRequestMessage = {
        role: "user",
        content: "Rewrite the entire Product Requirements Document! Begin!",
      };

      const prd = await this.chat({
        model: "gpt-3.5-turbo",
        messages: [prdPrompt, systemPrompt, userPrompt],
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

    console.log("on to ticketeer!");
    return {
      agent: AgentType.TICKETEER,
    };
  }
}
