type UserMessageProps = {
  content: string;
};

export function UserMessage({ content }: UserMessageProps) {
  return (
    <div className="bg-green-50 border border-green-300 rounded-sm p-4 w-fit max-w-[75%] self-end">
      <p className="font-medium text-green-800">{content}</p>
    </div>
  );
}
