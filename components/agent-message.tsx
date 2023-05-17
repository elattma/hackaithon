type AgentMessageProps = {
  content: string;
};

export function AgentMessage({ content }: AgentMessageProps) {
  return (
    <div className="bg-gray-50 border border-gray-300 rounded-sm p-4 w-fit max-w-[75%]">
      <p className="font-medium text-gray-700">{content}</p>
    </div>
  );
}
