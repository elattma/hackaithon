"use client";

import { AgentMessage } from "@/components/agent-message";
import { AgentThought } from "@/components/agent-thought";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserMessage } from "@/components/user-message";
import { useStateContext } from "@/context/state";
import { ActionType, AgentType, State } from "@/orchestrator/model";
import { useState } from "react";
import { Features } from "@/components/features";

const decoder = new TextDecoder();

const x = {
  input: "HELLO",
  next: {
    agent: "END",
    external_prompt: { request: { type: "CONFIRM_FEATURE" } },
  },
  questions: [
    {
      text: "What is the main product or service your company provides?",
      answer:
        "Our main product or service is not specified in the provided context.",
    },
    {
      text: "Who is the target audience for your product?",
      answer:
        "The target audience for the B2B unified data platform is enterprise-level businesses in finance, healthcare, retail, and technology industries.",
    },
    {
      text: "What are the current features or functionalities of the product?",
      answer:
        "The current features and functionalities of the product are not explicitly mentioned in the provided text. However, the core features planned for the product include data integration, natural language querying, data analysis and visualization, and a user-friendly interface.",
    },
    {
      text: "What are the key performance indicators (KPIs) for the product's success?",
      answer: encodeURIComponent(
        "The key performance indicators (KPIs) for the product's success mentioned in the text are:\n\n1. Website traffic\n2. Lead generation\n3. Sales conversion rate\n4. Customer satisfaction rating\n5. Product revenue"
      ),
    },
    {
      text: "Who are your main competitors in the market?",
      answer:
        "Competitors in the market include other law firms and document management providers.",
    },
    {
      text: "Have you received any customer feedback or identified gaps that the product needs to address?",
      answer: "No answer found",
    },
  ],
  followUpQuestions: [
    {
      text: "What specific types of data sources does the B2B unified data platform currently support for integration?",
      answer: "No answer found.",
    },
    {
      text: "What security measures are implemented to ensure data privacy and compliance with industry-specific regulations?",
      answer:
        "The context does not provide specific information about the security measures implemented to ensure data privacy and compliance with industry-specific regulations.",
    },
    {
      text: "Can you provide examples of how your existing users have benefited from the platform's data analysis and visualization features?",
      answer: encodeURIComponent(
        "Yes, there are two examples of customer success stories who benefited from the platform's data analysis and visualization features:\n\n1. Feltz Printing Service: Our data visualization tools helped Feltz Printing Service to identify new opportunities in their sales data, leading to a 15% increase in revenue in just six months.\n\n2. Benton: Our platform helped Benton to uncover previously unknown insights from their data, leading to a 30% increase in revenue over the course of just six months."
      ),
    },
    {
      text: "How does the platform handle high volumes of data and scale according to a business's growing needs?",
      answer: "No answer found",
    },
    {
      text: "What are the main competitive advantages of your product compared to those offered by other law firms and document management providers?",
      answer: "No answer found",
    },
    {
      text: "Can you share any examples of feature requests or improvements that have been suggested by current customers?",
      answer: "No answer found",
    },
  ],
  features: [
    {
      name: "Advanced Analytics Dashboard",
      description:
        "An upgraded analytics dashboard that provides deep insights into user behavior and product performance.",
      estimated_hours: 120,
      pros: "Helps the company make data-driven decisions; better understanding of user behavior; identifies product weak points",
      cons: "Takes time and resources to develop; may initially have a steep learning curve for some team members",
    },
    {
      name: "User Experience Improvements",
      description:
        "Improve the product's user interface and experience to make it more intuitive and appealing.",
      estimated_hours: 80,
      pros: "Higher user satisfaction; increased user retention; more engagement with the product",
      cons: "May require design overhaul; users might need to adjust to the new layout",
    },
    {
      name: "AI Personalized Recommendations",
      description:
        "An AI-powered recommendation system that suggests relevant content or features based on user preferences.",
      estimated_hours: 100,
      pros: "Increased user engagement; more targeted marketing; better utilization of content or features",
      cons: "Requires proper data collection; might raise privacy concerns; AI model development and maintenance",
    },
    {
      name: "Digital Customer Support Assistant",
      description:
        "A chatbot system to assist users with product-related questions and offer customized support.",
      estimated_hours: 150,
      pros: "Improved customer support availability; reduced response time; cost-saving in support department",
      cons: "Initial setup and training expenses; may require periodic updates",
    },
    {
      name: "Gamification and Rewards System",
      description:
        "Introducing a gamification system that rewards users with points, badges, and achievements for accomplishing specific tasks within the product.",
      estimated_hours: 90,
      pros: "Boost user engagement; encourage user loyalty; foster healthy competition",
      cons: "Needs careful planning and design; may not appeal to all user demographics; requires ongoing monitoring and updates",
    },
  ],
};

// TODO: add somewhere we can add a password

export function Chat() {
  const { state, setState } = useStateContext();
  const [input, setInput] = useState<string>("");

  const provideInput: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    const newState: State = {
      ...state,
      input,
      next: {
        agent: AgentType.RESEARCH,
      },
    };
    setState(newState);
    const response = await fetch("http://localhost:3000/api", {
      method: "POST",
      body: JSON.stringify({
        state: newState,
        password: "mimo4aiagents",
      }),
    });
    if (!response.body) {
      return;
    }
    const reader = response.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        const decoded = decoder.decode(value);
        try {
          console.log(decoded);
          const decodedState: State = JSON.parse(decoded);
          setState(decodedState);
          console.log("state!", decodedState);
          const request = decodedState.next?.external_prompt?.request;
          if (decodedState.next?.agent === AgentType.END) {
            // you know you are done with your goal
          } else if (request?.type === ActionType.ConfirmPRD) {
            // todo: prompt to confirm
          } else if (request?.type === ActionType.ConfirmFeature) {
            // todo: prompt to confirm feature
          } else {
            // ???? did something go wrong? or just end?
          }
          // TODO: set agent message here depending on what the state is
          // TODO: parse next, and prompt for what to do next
        } catch (e) {
          console.log("error parsing state!", e);
        }
        return;
      }
      const thought = decoder.decode(value);
      console.log("thought!", thought);
      // TODO: set thoughts in UI here
    }
  };

  return (
    <main className="flex-1 overflow-y-auto my-4 rounded-sm border flex flex-col p-4 gap-4">
      <div className="flex flex-col flex-1 gap-4 overflow-y-auto">
        <AgentMessage content="Hello! I'm Raina, your AI product manager. How can I help you?" />
        {state.input === undefined ? null : (
          <>
            <UserMessage content={state.input} />
            <AgentThought content="Thinking about questions to research" />
          </>
        )}
        {state.questions === undefined ? null : (
          <AgentThought
            content={`Attempting to answer these questions:\n${state.questions.reduce(
              (acc, curr, index) => acc + `${index + 1}. ${curr.text}\n`,
              ""
            )}`}
          />
        )}
        {state.questions?.some((q) => q.answer === undefined) ? (
          <AgentThought content="Found answers to my questions... Thinking of follow up questions" />
        ) : null}
        {state.followUpQuestions === undefined ? null : (
          <AgentThought
            content={`Attempting to answer these follow up questions:\n${state.followUpQuestions.reduce(
              (acc, curr, index) => acc + `${index + 1}. ${curr.text}\n`,
              ""
            )}`}
          />
        )}
        {state.followUpQuestions?.some((q) => q.answer === undefined) ? null : (
          <AgentThought content="Found answers to my follow up questions... Synthesizing my knowledge and coming up with new features" />
        )}
        {state.features === undefined ? null : (
          <Features features={state.features} />
        )}
      </div>
      <form
        className="flex items-center gap-4"
        onSubmit={(event) => {
          provideInput(event);
          setInput("");
        }}
      >
        <Input
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <Button>Send</Button>
      </form>
    </main>
  );
}
