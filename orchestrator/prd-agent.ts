import { Agent } from "@/orchestrator/agent";
import { Action, State } from "@/orchestrator/model";

export class PrdAgent extends Agent {
  async act(state: State, action: Action): Promise<State> {
    return Promise.resolve(state);
  }
}
