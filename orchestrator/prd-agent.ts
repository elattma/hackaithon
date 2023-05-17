import { Agent } from "@/orchestrator/agent";
import { State } from "@/orchestrator/model";

export class PrdAgent extends Agent {
  async act(state: State): Promise<State> {
    return Promise.resolve(state);
  }
}
