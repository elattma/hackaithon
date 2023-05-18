import { MessageSquare } from "lucide-react";

type AgentMessageProps = {
  content: string;
};

export function AgentMessage({ content }: AgentMessageProps) {
  return (
    <div className="bg-sky-50 border border-sky-300 rounded-sm p-4 w-fit max-w-[75%] flex items-start justify-start gap-4">
      <MessageSquare className="shrink-0 w-4 h-4 text-sky-900 mt-1" />
      <p className="font-medium text-sky-900 whitespace-pre-wrap">{content}</p>
    </div>
  );
}
