"use client";

import { Messages } from "@/components/messages";
import { Action, ActionType, State } from "@/orchestrator/model";
import { Button } from "./ui/button";

// TODO: add provider for "state"
export function Chat() {
  const callApi = async () => {
    console.log("clicked!");
    const state: State = {};
    const action: Action = {
      type: ActionType.InputDimension,
      params: {},
    };
    const response = await fetch("http://localhost:3000/api", {
      method: "POST",
      body: JSON.stringify({
        state,
        action,
      }),
    });
    if (!response.body) {
      return;
    }
    const reader = response.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        console.log("done!");
        // TODO: update state object in frontend
        return;
      }
      // TODO: message to frontend
    }
  };

  return (
    <main className="flex-1 overflow-y-auto my-4 rounded-sm border flex flex-col">
      <Messages />
      <Button onClick={callApi}>Press Me</Button>
    </main>
  );
}
