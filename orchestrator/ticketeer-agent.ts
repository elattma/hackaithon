import { Agent } from "@/orchestrator/agent";
import { AgentType, Next, State, Task } from "@/orchestrator/model";
import { LinearClient } from "@linear/sdk";
import { ChatCompletionRequestMessage } from "openai";

const systemPrompt: ChatCompletionRequestMessage = {
  role: "system",
  content: `Pretend you are a project manager. 
  Create a list of tasks to assign to your team in order to 
  build out the feature in the given Product Requirements Document.
  Once you have thought of your tasks, you should return a list of tasks, represented by JSON objects.
  The JSON objects should have the following fields:
  {"name": "the name of the task", "description": "a description of the task", "assignee": "who to assign the ticket to", "due_date": "how many story points the task is worth"}
  Again, your answer should be a list of feature objects and MUST be valid JSON that can be converted to a JSON object using JSON.parse().`,
};

export class TicketeerAgent extends Agent {
  async act(state: State): Promise<Next> {
    if (state.tasks === undefined) {
      const prdPrompt: ChatCompletionRequestMessage = {
        role: "user",
        content: `Here is the Product Requirements Document for the feature:\n${state.prd}`,
      };

      const userPrompt: ChatCompletionRequestMessage = {
        role: "user",
        content: "Begin!",
      };

      const response = await this.chat({
        model: "gpt-4",
        messages: [prdPrompt, systemPrompt, userPrompt],
        temperature: 0.0,
        maxTokens: 1000,
      });
      if (!response) {
        throw new Error("No response from OpenAI API");
      }
      const tasks: Task[] = JSON.parse(response);
      console.log(tasks);
      state.tasks = tasks;

      return {
        agent: AgentType.TICKETEER,
      };
    } else {
      const linearClient = new LinearClient({
        accessToken: process.env.LINEAR_ACCESS_TOKEN,
      });

      const teamId = (await linearClient.teams()).nodes[0].id;
      const projectId = (await linearClient.projects()).nodes[0].id;

      for (const task of state.tasks) {
        const issue = await linearClient.createIssue({
          teamId: teamId,
          projectId: projectId,
          title: task.name || "",
          description: task.description || "",
        });
        console.log("Created issue!", issue);
      }

      return {
        agent: AgentType.END,
      };
    }
  }
}
