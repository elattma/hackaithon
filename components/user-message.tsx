import { MessageSquare } from "lucide-react";

type UserMessageProps = {
  content: string;
};

export function UserMessage({ content }: UserMessageProps) {
  return (
    <div className="bg-green-50 border border-green-300 rounded-sm p-4 w-fit max-w-[75%] self-end flex items-start justify-start gap-4">
      <MessageSquare className="w-4 h-4 shrink-0 text-green-800 mt-1" />
      <p className="font-medium text-green-800">{content}</p>
    </div>
  );
}
