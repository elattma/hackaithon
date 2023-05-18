import { Feature } from "@/orchestrator/model";
import { MessageSquare } from "lucide-react";

type FeatureProps = {
  features: Feature[];
};

export function Features({ features }: FeatureProps) {
  return (
    <div className="bg-sky-50 border border-sky-300 p-4 max-w-[80%] flex items-start justify-start gap-4 rounded-r-lg rounded-tl-lg flex-1">
      <MessageSquare className="w-4 h-4 shrink-0 text-sky-800 mt-1" />
      <div className="flex flex-col w-full gap-2">
        <p className="text-sm font-medium text-sky-900">
          My research has led me to the follow features
        </p>
        <table className="flex flex-col rounded-sm border border-sky-300 text-xs w-full">
          <thead className="contents">
            <tr className="flex items-center border-b py-1 border-sky-300 text-sky-950">
              <th className="flex-1 basis-[20%] px-2 text-start">Name</th>
              <th className="flex-1 basis-[20%] px-2 text-start">
                Description
              </th>
              <th className="flex-1 basis-[5%] px-2 text-start">Hours</th>
              <th className="flex-1 basis-[25%] px-2 text-start">Rationale</th>
              <th className="flex-1 basis-[15%] px-2 text-start">Pros</th>
              <th className="flex-1 basis-[15%] px-2 text-start">Cons</th>
            </tr>
          </thead>
          <tbody className="contents">
            {features.map((feature, index) => (
              <tr
                className="flex items-start border-b border-sky-300 py-1 text-sky-800 last:border-b-0 whitespace-break-spaces"
                key={index}
              >
                <td className="flex-1 basis-[20%] px-2">{`${index + 1}. ${
                  feature.name
                }`}</td>
                <td className="flex-1 basis-[20%] px-2">
                  {feature.description}
                </td>
                <td className="flex-1 basis-[5%] px-2">{feature.hours}</td>
                <td className="flex-1 basis-[25%] px-2">{feature.rationale}</td>
                <td className="flex-1 basis-[15%] px-2">{feature.pros}</td>
                <td className="flex-1 basis-[15%] px-2">{feature.cons}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-sm font-medium text-sky-900">
          Please respond with the number of the feature you would like to move
          forward with and I will write a product requirements document for that
          feature based on all of my research.
        </p>
      </div>
    </div>
  );
}
