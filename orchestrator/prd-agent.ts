import { Agent } from "./agent";
import { State } from "./model";

export class PrdAgent extends Agent {
  async act(state: State): Promise<State> {
    return Promise.resolve(state);
  }
}
