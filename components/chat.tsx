"use client";

import { Messages } from "@/components/messages";
import { Button } from "./ui/button";
import { useStateContext } from "@/context/state";
import { Input } from "@/components/ui/input";

const decoder = new TextDecoder();

// TODO: add somewhere we can add a password

export function Chat() {
  const { state, setState } = useStateContext();

  // const { state, setState } = useStateContext();
  // const [password, setPassword] = useState<string | undefined>("mimo4aiagents");
  // const callApi = async () => {
  //   const response = await fetch("http://localhost:3000/api", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       state: state,
  //       password,
  //     }),
  //   });
  //   if (!response.body) {
  //     return;
  //   }
  //   const reader = response.body.getReader();
  //   while (true) {
  //     const { done, value } = await reader.read();
  //     if (done) {
  //       const decoded = decoder.decode(value);
  //       try {
  //         const state: State = JSON.parse(decoded);
  //         setState(state);
  //         console.log("state!", state);
  //         const request = state.next?.external_prompt?.request;
  //         if (state.next?.agent === AgentType.END) {
  //           // you know you are done with your goal
  //         }
  //         if (request?.type === ActionType.ProvideInput) {
  //           // todo: prompt to provide input
  //         } else if (request?.type === ActionType.ConfirmPRD) {
  //           // todo: prompt to confirm
  //         } else if (request?.type === ActionType.ConfirmFeature) {
  //           // todo: prompt to confirm feature
  //         } else {
  //           // ???? did something go wrong? or just end?
  //         }
  //         // TODO: set agent message here depending on what the state is
  //         // TODO: parse next, and prompt for what to do next
  //       } catch (e) {
  //         console.log("error parsing state!", e);
  //       }
  //       return;
  //     }
  //     const thought = decoder.decode(value);
  //     console.log("thought!", thought);
  //     // TODO: set thoughts in UI here
  //   }
  // };

  return (
    <main className="flex-1 overflow-y-auto my-4 rounded-sm border flex flex-col">
      <div className="flex flex-col flex-1 pt-4 px-2"></div>
      <Input />
    </main>
  );
}
