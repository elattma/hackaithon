import { Messages } from "@/components/messages";

export function Chat() {
  return (
    <main className="flex-1 overflow-y-auto my-4 rounded-sm border flex flex-col">
      <Messages />
    </main>
  );
}
