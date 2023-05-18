"use client";

import { AgentType, State } from "@/orchestrator/model";
import { createContext, useContext, useState } from "react";

type StateContext = {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
};

const stateContext = createContext<StateContext | undefined>(undefined);

type StateProviderProps = {
  children: React.ReactNode;
};

export function StateProvider({ children }: StateProviderProps) {
  const [state, setState] = useState<State>({
    input:
      "Hi Raina. I need you to think of a new feature that addresses concerns, complaints, etc. that our users have raised recently about our API",
    next: { agent: AgentType.PRD },
    questions: [
      {
        text: "What is the primary function and purpose of your API?",
        answer:
          "The primary function and purpose of our API is to allow AI agents to interface with all data in an enterprise by querying with natural language through a unified data platform. This helps businesses improve their data management processes and provides easier access to insights from their data.",
      },
      {
        text: "Can you provide a summary of the most common concerns and complaints from users?",
        answer:
          "Based on the provided context, common concerns and complaints from users include:\n" +
          "\n" +
          "1. Trouble with the automatic update feature not working in real-time.\n" +
          "2. Missing or corrupted data in the database.\n" +
          "3. Difficulty in running reports due to long loading times.\n" +
          "4. Error messages when attempting to upload data because of file format issues.",
      },
      {
        text: "What is the user base size and target audience for your API?",
        answer: "No answer found",
      },
      {
        text: "Are there any limitations or restrictions in modifying or adding features to the API?",
        answer: "No answer found",
      },
      {
        text: "How are users currently providing feedback on the API?",
        answer: "No answer found",
      },
      {
        text: "What are your competitors doing differently in their APIs that may address some of the issues raised by your users?",
        answer: "No answer found",
      },
    ],
    followUpQuestions: [
      {
        text: "What specific industries or sectors make up the majority of your current user base?",
        answer:
          "Based on the context provided, Morlong Associates serves clients in various industries, including healthcare, finance, and retail. The second company, specializing in cloud computing solutions, has a strong presence in the healthcare and financial services industries. However, specific industries or sectors for the third company are not mentioned in the provided context.",
      },
      {
        text: "What channels or platforms do you currently use for collecting user feedback and monitoring user satisfaction?",
        answer: "No answer found",
      },
      {
        text: "Can you share any data on the performance metrics of your API, such as average response times, uptime, and API call success rates?",
        answer: "No answer found.",
      },
      {
        text: "What are the key differentiating factors between your API and those of your competitors in terms of functionality, pricing, and support?",
        answer: "No answer found",
      },
      {
        text: "Are there any specific feature requests or common suggestions from users that could be helpful in adding new functionality to the API?",
        answer: "No answer found",
      },
      {
        text: "Do you have any case studies or success stories from your existing users regarding the benefits and positive impacts of using your API in their businesses?",
        answer:
          "Yes, there are several success stories from existing users mentioned in the company newsletters. Here are a few examples:\n" +
          "\n" +
          "1. Chapman: Using the B2B unified data platform, Chapman streamlined their data management processes and reduced manual errors by 80%. This led to a significant increase in operational efficiency and allowed them to make more informed business decisions.\n" +
          "\n" +
          "2. Benton: The platform helped Benton uncover previously unknown insights from their data, leading to a 30% increase in revenue over the course of just six months.\n" +
          "\n" +
          "3. Chemel: The platform helped Chemel streamline their supply chain management processes, leading to a 20% reduction in costs and a 10% increase in efficiency.\n" +
          "\n" +
          "4. Feltz Printing Service: The data visualization tools helped Feltz Printing Service identify new opportunities in their sales data, leading to a 15% increase in revenue in just six months.",
      },
    ],
    features: [
      {
        name: "Personalized Recommendations",
        description:
          "An AI-powered system that analyzes user behavior within the platform to provide personalized recommendations based on their preferences and interests.",
        hours: "120",
        rationale:
          "In the notes, the company's product is mentioned to have over 5000 listings. This can be overwhelming for users to navigate and explore. By implementing a personalized recommendation system, we can improve the user experience and help them find more relevant listings based on their interests.",
        pros: "Improves user experience, increases user engagement, helps users discover new items, and can boost sales.",
        cons: "Resource-intensive, potential privacy concerns, and requires continuous development and maintenance.",
      },
      {
        name: "Efficient Search Filters",
        description:
          "Improve the search functionality by adding advanced filters to help users narrow down their searches based on various parameters, such as pricing, location, tags related to the listings, etc.",
        hours: "80",
        rationale:
          "As mentioned in the notes, the company's product has a large user base, and better search functionality is needed. By implementing efficient search filters, users can easily find and explore the listings that they are interested in or looking for.",
        pros: "Enhanced user experience, faster and more accurate search results, enables users to find specific listings with ease.",
        cons: "Requires thorough testing, ongoing maintenance, and UX/UI considerations.",
      },
      {
        name: "Interactive Map View",
        description:
          "Integrate an interactive map view into the platform, allowing users to visualize listings geographically and explore listings in specific areas.",
        hours: "100",
        rationale:
          "The notes mention that the company's product has a significant number of listings from various regions. Providing users with an interactive map view enhances their browsing experience by allowing them to focus on specific areas or regions that interest them.",
        pros: "Increased user engagement, improved user experience, easier to navigate listings based on location.",
        cons: "Requires third-party integration (e.g., Google Maps API), may increase development costs, requires ongoing maintenance.",
      },
      {
        name: "In-App Messaging System",
        description:
          "Implement an in-app messaging system for users to directly communicate with each other regarding listings, transactions, or any other queries.",
        hours: "150",
        rationale:
          "Notes show that there's a significant number of transactions happening on the platform, but there's no direct communication channel between users. An in-app messaging system would facilitate communication and make transactions smoother and more efficient.",
        pros: "Enhances user experience, promotes a sense of community, encourages stronger user connections, increases trust between users.",
        cons: "Resource-intensive, possible moderation challenges, and potential privacy concerns.",
      },
    ],
  });

  return (
    <stateContext.Provider value={{ state, setState }}>
      {children}
    </stateContext.Provider>
  );
}

export function useStateContext() {
  const context = useContext(stateContext);
  if (context === undefined) {
    throw new Error("useStateContext must be used within a StateProvider");
  }
  return context;
}
