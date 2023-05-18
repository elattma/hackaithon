import { Lightbulb } from "lucide-react";

type AgentThoughtProps = {
  content: string;
};

export function AgentThought({ content }: AgentThoughtProps) {
  return (
    <div className="bg-gray-50 border border-gray-300 rounded-sm p-4 w-fit max-w-[75%] flex items-start justify-start gap-4">
      <Lightbulb className="shrink-0 w-4 h-4 text-gray-700 mt-1" />
      <p className="font-medium text-gray-700 whitespace-pre-wrap">{content}</p>
    </div>
  );
}
