import { Agent } from "@/orchestrator/agent";
import { State } from "@/orchestrator/model";

export class FeatureAgent extends Agent {
  async act(state: State): Promise<State> {
    // if state already has everything besides the features and the tables
    // then just create the features and tables early return

    // else if state has not yet identified problems
    // identify problems and early return

    return Promise.resolve(state);
  }
}
