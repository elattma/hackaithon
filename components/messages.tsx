import { AgentMessage } from "@/components/agent-message";
import { UserMessage } from "@/components/user-message";

export function Messages() {
  return (
    <div className="pt-4 px-4 flex flex-col gap-4 flex-1">
      <AgentMessage content="Hello! I'm Raina, your AI product manager. How can I help you?" />
      <UserMessage content="Come up with a new feature that is based on customer feedback from the last two weeks" />
    </div>
  );
}
