import { Task } from "@/orchestrator/model";
import { MessageSquare } from "lucide-react";

type TaskProps = {
  tasks: Task[];
};

export function Tasks({ tasks }: TaskProps) {
  return (
    <div className="bg-sky-50 border border-sky-300 p-4 max-w-[80%] flex items-start justify-start gap-4 rounded-r-lg rounded-tl-lg flex-1">
      <MessageSquare className="w-4 h-4 shrink-0 text-sky-800 mt-1" />
      <div className="flex flex-col w-full gap-2">
        <p className="text-sm font-medium text-sky-900">
          Here are the tasks I have identified:
        </p>
        <table className="flex flex-col rounded-sm border border-sky-300 text-xs w-full">
          <thead className="contents">
            <tr className="flex items-center border-b py-1 border-sky-300 text-sky-950">
              <th className="flex-1 basis-[30%] px-2 text-start">Name</th>
              <th className="flex-1 basis-[30%] px-2 text-start">
                Description
              </th>
              <th className="flex-1 basis-[10%] px-2 text-start">
                Story Points
              </th>
              <th className="flex-1 basis-[30%] px-2 text-start">
                Assignee Role
              </th>
            </tr>
          </thead>
          <tbody className="contents">
            {tasks.map((task, index) => (
              <tr
                className="flex items-start border-b border-sky-300 py-1 text-sky-800 last:border-b-0 whitespace-break-spaces"
                key={index}
              >
                <td className="flex-1 basis-[30%] px-2">{`${index + 1}. ${
                  task.name
                }`}</td>
                <td className="flex-1 basis-[30%] px-2">{task.description}</td>
                <td className="flex-1 basis-[10%] px-2">{task.due_date}</td>
                <td className="flex-1 basis-[30%] px-2">{task.assignee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
