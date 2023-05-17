"use client";

import { Messages } from "@/components/messages";
import { useStateContext } from "@/context/state";
import { State } from "@/orchestrator/model";
import { Button } from "./ui/button";

const decoder = new TextDecoder();

export function Chat() {
  const context = useStateContext();
  const callApi = async () => {
    const response = await fetch("http://localhost:3000/api", {
      method: "POST",
      body: JSON.stringify({
        state: context?.state,
      }),
    });
    if (!response.body) {
      return;
    }
    const reader = response.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        const decoded = decoder.decode(value);
        try {
          const state: State = JSON.parse(decoded);
          context?.setState(state);
          console.log("state!", state);
          // TODO: set agent message here depending on what the state is
          // TODO: parse next, and prompt for what to do next
        } catch (e) {
          console.log("error parsing state!", e);
        }
        return;
      }
      const thought = decoder.decode(value);
      console.log("thought!", thought);
      // TODO: set thoughts in UI here
    }
  };

  return (
    <main className="flex-1 overflow-y-auto my-4 rounded-sm border flex flex-col">
      <Messages />
      <Button onClick={callApi}>Press Me</Button>
    </main>
  );
}
