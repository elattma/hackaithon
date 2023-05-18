import { MessageSquare } from "lucide-react";

type UserMessageProps = {
  content: string;
};

export function UserMessage({ content }: UserMessageProps) {
  return (
    <div className="bg-green-50 border border-green-300 p-4 w-fit max-w-[80%] self-end flex items-start justify-start gap-4 rounded-tr-lg rounded-l-lg">
      <p className="font-medium text-green-800 text-sm">{content}</p>
      <MessageSquare className="w-4 h-4 shrink-0 text-green-800 mt-1" />
    </div>
  );
}
