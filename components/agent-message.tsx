import { MessageSquare } from "lucide-react";

type AgentMessageProps = {
  content: string;
};

export function AgentMessage({ content }: AgentMessageProps) {
  return (
    <div className="bg-sky-50 border border-sky-300 p-4 w-fit max-w-[80%] flex items-start justify-start gap-4 rounded-r-lg rounded-tl-lg">
      <MessageSquare className="shrink-0 w-4 h-4 text-sky-900 mt-1" />
      <p className="font-medium text-sky-900 whitespace-pre-wrap text-sm">
        {content}
      </p>
    </div>
  );
}
