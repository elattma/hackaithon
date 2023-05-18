import { ChatCompletionRequestMessageRoleEnum } from "openai";

import { Agent } from "@/orchestrator/agent";
import { getContext } from "@/orchestrator/mimo";
import {
  ActionType,
  AgentType,
  Next,
  Question,
  State,
} from "@/orchestrator/model";

export class ResearchAgent extends Agent {
  async act(state: State): Promise<Next> {
    if (state.input === undefined) {
      // ???
    } else if (state.questions === undefined) {
      // STEP 1: Generate questions
      // Format prompt
      const systemMessageContent = `You are Raina, an AI product manager that operates on behalf of a company.
You are very good at your job and you are trusted by the company to make incredible product decisions.
Your ultimate goal is to come up with a valuable new feature for the company's product that is backed up by substantial data, research, and reasoning.
You do not know anything about the company you are working for or its product, so you need to ask questions to find out more.
Based on the message that the company has sent you below, come up with a numbered list of 2 questions that you need answered before you can come up with a new feature.
Your questions should be simple and contain only one part, because you will have the opportunity to ask follow-up questions.`;
      const systemMessage = {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content: systemMessageContent,
      };
      const userMessage = {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: state.input,
      };

      // Call GPT-4
      const response = await this.openai.createChatCompletion({
        model: "gpt-4",
        messages: [systemMessage, userMessage],
      });

      // Process response to get questions
      const llmResponse = response.data.choices[0].message;
      if (llmResponse === undefined) throw new Error("LLM call failed");
      const questions: Question[] = getQuestionsFromLlmResponse(
        llmResponse.content
      );

      state.questions = questions;
      return {
        agent: AgentType.RESEARCH,
      };
    } else if (state.questions.some((q) => q.answer === undefined)) {
      // Answer questions...
      const questions = state.questions;

      // For each question, query Mimo to get context
      const mimoPromises = [];
      // Send requests to Mimo in parallel
      for (const question of questions) {
        const promise = getContext(question.text, 3600);
        mimoPromises.push(promise);
      }
      const mimoResults = await Promise.all(mimoPromises);
      const contexts = [...mimoResults];

      // For each question:context pair, use GPT-4 to answer the question
      const gpt4Promises = [];
      const systemMessageContent = `Use the context provided above to answer the question below.
If you cannot answer the question using the context, return "No answer found"`;
      const systemMessage = {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content: systemMessageContent,
      };
      // Fire off requests to GPT-3.5 in parallel
      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const context = contexts[i];
        const contextMessageContent = `CONTEXT
--------
${context}`;
        const contextMessage = {
          role: ChatCompletionRequestMessageRoleEnum.System,
          content: contextMessageContent,
        };
        const userMessage = {
          role: ChatCompletionRequestMessageRoleEnum.User,
          content: question.text,
        };
        const promise = this.openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [contextMessage, systemMessage, userMessage],
        });
        gpt4Promises.push(promise);
      }
      const gpt4Results = await Promise.all(gpt4Promises);
      // Parse answers from LLM responses
      const answers = [];
      for (const gpt4Result of gpt4Results) {
        const llmResponse = gpt4Result.data.choices[0].message;
        if (llmResponse === undefined) answers.push("No answer found");
        else answers.push(llmResponse.content);
      }

      // Update state with answers
      const answeredQuestions = [];
      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        question.answer = answers[i];
        answeredQuestions.push(question);
      }
      state.questions = answeredQuestions;
      return {
        agent: AgentType.RESEARCH,
      };
    } else if (state.followUpQuestions === undefined) {
      // Generate follow up questions..
      // Format prompt
      const formattedQuestions = formatQuestions(state.questions);
      const questionsMessageContent = `QUESTIONS AND ANSWERS
--------
${formattedQuestions}`;
      const questionsMessage = {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content: questionsMessageContent,
      };
      const systemMessageContent = `You are Raina, an AI product manager that operates on behalf of a company.
You are very good at your job and you are trusted by the company to make incredible product decisions.
Your ultimate goal is to come up with a valuable new feature for the company's product that is backed up by substantial data, research, and reasoning.
You have already learned some information about the company and its product as reflected by the questions and answers provided above, but there is room to learn more.
Based on the questions and answers provided above, come up with a numbered list of 2 follow up questions that go deeper into the explored topics.
They should be simple, meaningful, and not have multiple parts.`;
      const systemMessage = {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content: systemMessageContent,
      };
      const userMessage = {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: "Begin!",
      };

      // Call GPT-4
      const result = await this.openai.createChatCompletion({
        model: "gpt-4",
        messages: [questionsMessage, systemMessage, userMessage],
      });

      // Process response to get questions
      const llmResponse = result.data.choices[0].message;
      if (llmResponse === undefined) throw new Error("LLM call failed");
      const followUpQuestions = getQuestionsFromLlmResponse(
        llmResponse.content
      );

      // Update state with questions and return
      state.followUpQuestions = followUpQuestions;
      return {
        agent: AgentType.RESEARCH,
      };
    } else if (
      state.followUpQuestions?.some((fuq) => fuq.answer === undefined)
    ) {
      // Answer follow up questions...
      // Answer questions...
      const questions = state.followUpQuestions;

      // For each question, query Mimo to get context
      const mimoPromises = [];
      // Send requests to Mimo in parallel
      for (const question of questions) {
        const promise = getContext(question.text, 3600);
        mimoPromises.push(promise);
      }
      const mimoResults = await Promise.all(mimoPromises);
      const contexts = [...mimoResults];

      // For each question:context pair, use GPT-4 to answer the question
      const gpt4Promises = [];
      const systemMessageContent = `Use the context provided above to answer the question below.
If you cannot answer the question using the context, return "No answer found"`;
      const systemMessage = {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content: systemMessageContent,
      };
      // Fire off requests to GPT-3.5 in parallel
      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const context = contexts[i];
        const contextMessageContent = `CONTEXT
--------
${context}`;
        const contextMessage = {
          role: ChatCompletionRequestMessageRoleEnum.System,
          content: contextMessageContent,
        };
        const userMessage = {
          role: ChatCompletionRequestMessageRoleEnum.User,
          content: question.text,
        };
        const promise = this.openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [contextMessage, systemMessage, userMessage],
        });
        gpt4Promises.push(promise);
      }
      const gpt4Results = await Promise.all(gpt4Promises);
      // Parse answers from LLM responses
      const answers = [];
      for (const gpt4Result of gpt4Results) {
        const llmResponse = gpt4Result.data.choices[0].message;
        if (llmResponse === undefined) answers.push("No answer found");
        else answers.push(llmResponse.content);
      }

      // Update state with answers
      const answeredQuestions = [];
      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        question.answer = answers[i];
        answeredQuestions.push(question);
      }
      state.followUpQuestions = answeredQuestions;
      return {
        agent: AgentType.RESEARCH,
      };
    } else if (state.features === undefined) {
      // Come up with features...
      const allQuestions = state.questions.concat(state.followUpQuestions);
      const formattedQuestions = formatQuestions(allQuestions);
      const notesMessageContent = `NOTES
--------
${formattedQuestions}`;
      const notesMessage = {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content: notesMessageContent,
      };
      const systemMessageContent = `You are Raina, an AI product manager that operates on behalf of a company.
You have conducted research into the company you are operating on behalf of and your notes about the company can be found above in the form of questions and answers.
Using the information contained in these notes, you must identify features that can be added to the company's product.
The features should be supported by your research and should improve an existing part of the company's product, address a problem with the product, or introduce something entirely new.
The features should not be generic; they should be fit to the company's product and address specfic needs and gaps.
Once you have thought of your features, you should return a list of features, represented by JSON objects.
The JSON objects should have the following fields:
{"name": "the name of the feature", "description": "a description of the feature", "hours": "an estimated time to complete the feature in hours", "rationale": "why you chose this feature and what evidence you have that it is needed or wanted", "pros": "the pros of implementing the new feature; i.e., who it benefits, what purpose it serves", "cons": "the cons of implementing the new feature, such as risks"}

Again, your answer should be a list of feature objects and MUST be valid JSON that can be converted to a JSON object using JSON.parse().

You should support your answer with as much detail and evidence from your notes as possible.`;
      const systemMessage = {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content: systemMessageContent,
      };
      const userMessage = {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: "Begin!",
      };

      // Call GPT-4
      const result = await this.openai.createChatCompletion({
        model: "gpt-4",
        messages: [notesMessage, systemMessage, userMessage],
      });
      const llmResponse = result.data.choices[0].message;
      if (llmResponse === undefined) throw new Error("LLM call failed");
      const jsonString = llmResponse.content;
      console.log(jsonString);
      const jsonStartIndex = jsonString.indexOf("[");
      const strippedJsonString = jsonString.substring(jsonStartIndex);
      console.log(strippedJsonString);
      state.features = JSON.parse(strippedJsonString);
      return {
        agent: AgentType.PRD,
        external_prompt: {
          request: {
            type: ActionType.ConfirmFeature,
          },
        },
      };
    }

    throw new Error("Invalid state");
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

function formatQuestions(questions: Question[]): string {
  let result = "";

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const formattedQuestion = `${i + 1}. ${question.text}\n${
      question.answer
    }\n`;
    result += formattedQuestion;
  }

  return result;
}
