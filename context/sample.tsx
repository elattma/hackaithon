import { ActionType, AgentType, State } from "@/orchestrator/model";

export const FOUND_QUESTIONS_STATE: State = {
  input:
    "Hi Raina. I need you to think of a new feature that addresses concerns, complaints, etc. that our users have raised recently about our API.",
  next: { agent: AgentType.RESEARCH },
  questions: [
    {
      text: "What is the main product or service your company provides?",
    },
    {
      text: "Who is the target audience for your product?",
    },
  ],
};

export const FOUND_ANSWERS_STATE: State = {
  input:
    "Hi Raina. I need you to think of a new feature that addresses concerns, complaints, etc. that our users have raised recently about our API.",
  next: { agent: AgentType.RESEARCH },
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
  ],
};

export const FOLLOW_UP_QUESTIONS_STATE: State = {
  input:
    "Hi Raina. I need you to think of a new feature that addresses concerns, complaints, etc. that our users have raised recently about our API.",
  next: { agent: AgentType.RESEARCH },
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
  ],
  followUpQuestions: [
    {
      text: "What are the current key features of the B2B unified data platform that differentiate it from competitors?",
    },
    {
      text: "Can you provide any specific product performance metrics or customer feedback that highlights areas for improvement or potential growth?",
    },
  ],
};

export const FOUND_FOLLOW_UP_ANSWERS_STATE: State = {
  input:
    "Hi Raina. I need you to think of a new feature that addresses concerns, complaints, etc. that our users have raised recently about our API.",
  next: { agent: AgentType.RESEARCH },
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
  ],
  followUpQuestions: [
    {
      text: "What are the current key features of the B2B unified data platform that differentiate it from competitors?",
      answer: "No answer found.",
    },
    {
      text: "Can you provide any specific product performance metrics or customer feedback that highlights areas for improvement or potential growth?",
      answer:
        "The document provides some specific metrics and feedback related to the product's performance and customer satisfaction. For example:\n" +
        "\n" +
        "- Objective 3: Expand Product Offering\n" +
        "- Launch 2 new product features by end of Q1.\n" +
        "- Increase product adoption rate by 15% through user onboarding program.\n" +
        "- Achieve a 10% increase in product revenue through upselling and cross-selling.\n" +
        "\n" +
        "- Objective 1: Increase Customer Acquisition\n" +
        "- Achieve 20% increase in website traffic through SEO optimization.\n" +
        "- Increase lead generation by 25% through targeted social media ads.\n" +
        "- Achieve a 15% increase in sales conversion rate through A/B testing.\n" +
        "\n" +
        "- Objective 2: Enhance Customer Experience\n" +
        "- Achieve 95% customer satisfaction rating through customer feedback surveys.\n" +
        "- Reduce customer response time to less than 2 hours through improved customer service procedures.\n" +
        "\n" +
        "However, the specific areas of concern related to customer complaints are not provided in the context.",
    },
  ],
};

export const FOUND_FEATURES_STATE: State = {
  input:
    "Hi Raina. I need you to think of a new feature that addresses concerns, complaints, etc. that our users have raised recently about our API.",
  next: {
    agent: AgentType.PRD,
    external_prompt: { request: { type: ActionType.ConfirmFeature } },
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
  ],
  followUpQuestions: [
    {
      text: "What are the current key features of the B2B unified data platform that differentiate it from competitors?",
      answer: "No answer found.",
    },
    {
      text: "Can you provide any specific product performance metrics or customer feedback that highlights areas for improvement or potential growth?",
      answer:
        "The document provides some specific metrics and feedback related to the product's performance and customer satisfaction. For example:\n" +
        "\n" +
        "- Objective 3: Expand Product Offering\n" +
        "- Launch 2 new product features by end of Q1.\n" +
        "- Increase product adoption rate by 15% through user onboarding program.\n" +
        "- Achieve a 10% increase in product revenue through upselling and cross-selling.\n" +
        "\n" +
        "- Objective 1: Increase Customer Acquisition\n" +
        "- Achieve 20% increase in website traffic through SEO optimization.\n" +
        "- Increase lead generation by 25% through targeted social media ads.\n" +
        "- Achieve a 15% increase in sales conversion rate through A/B testing.\n" +
        "\n" +
        "- Objective 2: Enhance Customer Experience\n" +
        "- Achieve 95% customer satisfaction rating through customer feedback surveys.\n" +
        "- Reduce customer response time to less than 2 hours through improved customer service procedures.\n" +
        "\n" +
        "However, the specific areas of concern related to customer complaints are not provided in the context.",
    },
  ],
  features: [
    {
      name: "Advanced Data Segmentation",
      description:
        "Segment data by industry, region, and company size to provide more targeted insights for users.",
      hours: 6,
      rationale:
        "Aimed at improving product adoption rate (15% increase goal) and expanding the product offering.",
      pros: "Can help users gain more personalized insights relevant to their businesses, making the platform more valuable and increasing customer satisfaction.",
      cons: "Requires significant effort to implement, may need additional data sources, and potential privacy concerns.",
    },
    {
      name: "AI-Powered Recommendations",
      description:
        "Leverage AI to provide personalized recommendations and opportunities to users based on their usage patterns and business goals.",
      hours: 6,
      rationale:
        "Addressing the objective to increase customer acquisition (20% increase in website traffic, 15% increase in sales conversion rate) and enhance customer experience (95% satisfaction rating goal).",
      pros: "Improves user experience, increases customer retention, and drives upselling/cross-selling by suggesting relevant features based on user behavior.",
      cons: "Concerns over data privacy, may require significant development time, and challenges in accurately predicting user needs.",
    },
    {
      name: "Improved Customer Service Portal",
      description:
        "Redesign the customer service portal to streamline support requests and reduce response time.",
      hours: 6,
      rationale:
        "Aligns with the goal to enhance customer experience (reduce customer response time to less than 2 hours).",
      pros: "Improved customer satisfaction, easier issue resolution, and better customer retention.",
      cons: "Time-consuming to redesign, potential training required for support staff, and might need additional resources to maintain fast response times.",
    },
    {
      name: "Onboarding Program Enhancement",
      description:
        "Implement a better user onboarding program with tutorial videos, webinars, and personalized support to increase product adoption and customer satisfaction.",
      hours: 6,
      rationale:
        " Supports the objective to expand product offering (increasing product adoption rate by 15%) and enhance customer experience (95% satisfaction rating goal).",
      pros: "Increases customer retention, faster user adoption, and improved customer satisfaction.",
      cons: "Requires resources to develop content and provide personalized support, and costs associated with hosting webinars and creating tutorial videos.",
    },
    {
      name: "Mobile App",
      description:
        "Develop a mobile app to enable users to access the platform anytime, anywhere.",
      hours: 6,
      rationale:
        "Aims to increase product adoption rate, user engagement, and customer satisfaction while facilitating upsells and cross-sells.",
      pros: "Provides on-the-go access, increases user engagement, and can lead to higher customer satisfaction.",
      cons: "Requires significant development resources, potential compatibility issues with different devices, and ongoing maintenance.",
    },
  ],
};

export const PRD_STATE: State = {
  input:
    "Hi Raina. I need you to think of a new feature that addresses concerns, complaints, etc. that our users have raised recently about our API.",
  next: {
    agent: AgentType.TICKETEER,
    external_prompt: {
      request: { type: ActionType.ConfirmPRD },
    },
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
  ],
  followUpQuestions: [
    {
      text: "What are the current key features of the B2B unified data platform that differentiate it from competitors?",
      answer: "No answer found.",
    },
    {
      text: "Can you provide any specific product performance metrics or customer feedback that highlights areas for improvement or potential growth?",
      answer:
        "The document provides some specific metrics and feedback related to the product's performance and customer satisfaction. For example:\n" +
        "\n" +
        "- Objective 3: Expand Product Offering\n" +
        "- Launch 2 new product features by end of Q1.\n" +
        "- Increase product adoption rate by 15% through user onboarding program.\n" +
        "- Achieve a 10% increase in product revenue through upselling and cross-selling.\n" +
        "\n" +
        "- Objective 1: Increase Customer Acquisition\n" +
        "- Achieve 20% increase in website traffic through SEO optimization.\n" +
        "- Increase lead generation by 25% through targeted social media ads.\n" +
        "- Achieve a 15% increase in sales conversion rate through A/B testing.\n" +
        "\n" +
        "- Objective 2: Enhance Customer Experience\n" +
        "- Achieve 95% customer satisfaction rating through customer feedback surveys.\n" +
        "- Reduce customer response time to less than 2 hours through improved customer service procedures.\n" +
        "\n" +
        "However, the specific areas of concern related to customer complaints are not provided in the context.",
    },
  ],
  features: [
    {
      name: "Onboarding Program Enhancement",
      description:
        "Implement a better user onboarding program with tutorial videos, webinars, and personalized support to increase product adoption and customer satisfaction.",
      hours: 6,
      rationale:
        " Supports the objective to expand product offering (increasing product adoption rate by 15%) and enhance customer experience (95% satisfaction rating goal).",
      pros: "Increases customer retention, faster user adoption, and improved customer satisfaction.",
      cons: "Requires resources to develop content and provide personalized support, and costs associated with hosting webinars and creating tutorial videos.",
    },
  ],
  prd:
    "Title: B2B Unified Data Platform - New Feature PRD\n" +
    "\n" +
    "1. Introduction\n" +
    "Our B2B unified data platform is a comprehensive solution that enables enterprise-level businesses in finance, healthcare, retail, and technology industries to manage their data effectively. The platform provides a range of features and functionalities that help businesses to streamline their data management processes, improve data quality, and gain valuable insights from their data. However, we have identified a need to expand our product offering to meet the evolving needs of our customers and stay ahead of our competitors. This PRD outlines a new feature that we plan to launch by the end of Q1.\n" +
    "\n" +
    "2. Product Overview\n" +
    "The new feature we plan to launch is a data visualization tool that will enable our customers to create interactive dashboards and reports from their data. The tool will provide a range of visualization options, including charts, graphs, and tables, and will allow users to customize their dashboards to suit their specific needs. The tool will be integrated into our existing platform, and users will be able to access it through their existing accounts.\n" +
    "\n" +
    "3. User Personas\n" +
    "Our target audience for the new feature is data analysts and business intelligence professionals in enterprise-level businesses. These users are typically responsible for analyzing large volumes of data and presenting insights to key stakeholders within their organizations. They require a tool that is easy to use, flexible, and customizable, and that enables them to create compelling visualizations that communicate complex data in a clear and concise manner.\n" +
    "\n" +
    "4. Goals and Objectives\n" +
    "Our goals and objectives for the new feature are as follows:\n" +
    "\n" +
    "- Launch the data visualization tool by the end of Q1.\n" +
    "- Increase product adoption rate by 15% through a user onboarding program.\n" +
    "- Achieve a 10% increase in product revenue through upselling and cross-selling.\n" +
    "\n" +
    "5. Features and Functionalities\n" +
    "The data visualization tool will provide the following features and functionalities:\n" +
    "\n" +
    "- A range of visualization options, including charts, graphs, and tables.\n" +
    "- Customizable dashboards that enable users to arrange and display their data in a way that suits their specific needs.\n" +
    "- Interactive features that allow users to drill down into their data and explore it in more detail.\n" +
    "- Integration with our existing platform, enabling users to access the tool through their existing accounts.\n" +
    "- User-friendly interface that is easy to use and requires minimal training.\n" +
    "\n" +
    "6. User Flow\n" +
    "The user flow for the data visualization tool will be as follows:\n" +
    "\n" +
    "- Users will log in to their existing accounts on our platform.\n" +
    "- They will navigate to the data visualization tool within the platform.\n" +
    "- They will select the data they wish to visualize and choose the type of visualization they want to create.\n" +
    "- They will customize their dashboard to suit their specific needs, using the drag-and-drop interface.\n" +
    "- They will save their dashboard and share it with key stakeholders within their organization.\n" +
    "\n" +
    "7. Wireframes\n" +
    "The wireframes for the data visualization tool are attached to this PRD.\n" +
    "\n" +
    "8. Non-Functional Requirements\n" +
    "The data visualization tool must meet the following non-functional requirements:\n" +
    "\n" +
    "- Performance: The tool must be fast and responsive, even when dealing with large volumes of data.\n" +
    "- Security: The tool must be secure and comply with industry standards for data protection.\n" +
    "- Scalability: The tool must be scalable to meet the needs of our growing customer base.\n" +
    "\n" +
    "9. Assumptions\n" +
    "We assume that our customers will be receptive to the new feature and that it will meet their needs for a flexible and customizable data visualization tool. We also assume that our development team will be able to deliver the feature on time and within budget.\n" +
    "\n" +
    "10. Dependencies\n" +
    "The development of the data visualization tool is dependent on the availability of our development team and the successful integration of the tool with our existing platform.\n" +
    "\n" +
    "11. Acceptance Criteria\n" +
    "The data visualization tool will be considered successful if it meets the following acceptance criteria:\n" +
    "\n" +
    "- It is launched by the end of Q1.\n" +
    "- It is easy to use and requires minimal training.\n" +
    "- It provides a range of visualization options and is customizable to suit users' specific needs.\n" +
    "- It is fast and responsive, even when dealing with large volumes of data.\n" +
    "- It is secure and complies with industry standards for data protection.\n" +
    "- It is scalable to meet the needs of our growing customer base.\n" +
    "- It is well-received by our customers and leads to an increase in product adoption rate and revenue.",
};

export const CREATED_TICKETS_STATE: State = {
  input:
    "Hi Raina. I need you to think of a new feature that addresses concerns, complaints, etc. that our users have raised recently about our API.",
  next: {
    agent: AgentType.TICKETEER,
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
  ],
  followUpQuestions: [
    {
      text: "What are the current key features of the B2B unified data platform that differentiate it from competitors?",
      answer: "No answer found.",
    },
    {
      text: "Can you provide any specific product performance metrics or customer feedback that highlights areas for improvement or potential growth?",
      answer:
        "The document provides some specific metrics and feedback related to the product's performance and customer satisfaction. For example:\n" +
        "\n" +
        "- Objective 3: Expand Product Offering\n" +
        "- Launch 2 new product features by end of Q1.\n" +
        "- Increase product adoption rate by 15% through user onboarding program.\n" +
        "- Achieve a 10% increase in product revenue through upselling and cross-selling.\n" +
        "\n" +
        "- Objective 1: Increase Customer Acquisition\n" +
        "- Achieve 20% increase in website traffic through SEO optimization.\n" +
        "- Increase lead generation by 25% through targeted social media ads.\n" +
        "- Achieve a 15% increase in sales conversion rate through A/B testing.\n" +
        "\n" +
        "- Objective 2: Enhance Customer Experience\n" +
        "- Achieve 95% customer satisfaction rating through customer feedback surveys.\n" +
        "- Reduce customer response time to less than 2 hours through improved customer service procedures.\n" +
        "\n" +
        "However, the specific areas of concern related to customer complaints are not provided in the context.",
    },
  ],
  features: [
    {
      name: "Onboarding Program Enhancement",
      description:
        "Implement a better user onboarding program with tutorial videos, webinars, and personalized support to increase product adoption and customer satisfaction.",
      hours: 6,
      rationale:
        " Supports the objective to expand product offering (increasing product adoption rate by 15%) and enhance customer experience (95% satisfaction rating goal).",
      pros: "Increases customer retention, faster user adoption, and improved customer satisfaction.",
      cons: "Requires resources to develop content and provide personalized support, and costs associated with hosting webinars and creating tutorial videos.",
    },
  ],
  prd:
    "Title: B2B Unified Data Platform - New Feature PRD\n" +
    "\n" +
    "1. Introduction\n" +
    "Our B2B unified data platform is a comprehensive solution that enables enterprise-level businesses in finance, healthcare, retail, and technology industries to manage their data effectively. The platform provides a range of features and functionalities that help businesses to streamline their data management processes, improve data quality, and gain valuable insights from their data. However, we have identified a need to expand our product offering to meet the evolving needs of our customers and stay ahead of our competitors. This PRD outlines a new feature that we plan to launch by the end of Q1.\n" +
    "\n" +
    "2. Product Overview\n" +
    "The new feature we plan to launch is a data visualization tool that will enable our customers to create interactive dashboards and reports from their data. The tool will provide a range of visualization options, including charts, graphs, and tables, and will allow users to customize their dashboards to suit their specific needs. The tool will be integrated into our existing platform, and users will be able to access it through their existing accounts.\n" +
    "\n" +
    "3. User Personas\n" +
    "Our target audience for the new feature is data analysts and business intelligence professionals in enterprise-level businesses. These users are typically responsible for analyzing large volumes of data and presenting insights to key stakeholders within their organizations. They require a tool that is easy to use, flexible, and customizable, and that enables them to create compelling visualizations that communicate complex data in a clear and concise manner.\n" +
    "\n" +
    "4. Goals and Objectives\n" +
    "Our goals and objectives for the new feature are as follows:\n" +
    "\n" +
    "- Launch the data visualization tool by the end of Q1.\n" +
    "- Increase product adoption rate by 15% through a user onboarding program.\n" +
    "- Achieve a 10% increase in product revenue through upselling and cross-selling.\n" +
    "\n" +
    "5. Features and Functionalities\n" +
    "The data visualization tool will provide the following features and functionalities:\n" +
    "\n" +
    "- A range of visualization options, including charts, graphs, and tables.\n" +
    "- Customizable dashboards that enable users to arrange and display their data in a way that suits their specific needs.\n" +
    "- Interactive features that allow users to drill down into their data and explore it in more detail.\n" +
    "- Integration with our existing platform, enabling users to access the tool through their existing accounts.\n" +
    "- User-friendly interface that is easy to use and requires minimal training.\n" +
    "\n" +
    "6. User Flow\n" +
    "The user flow for the data visualization tool will be as follows:\n" +
    "\n" +
    "- Users will log in to their existing accounts on our platform.\n" +
    "- They will navigate to the data visualization tool within the platform.\n" +
    "- They will select the data they wish to visualize and choose the type of visualization they want to create.\n" +
    "- They will customize their dashboard to suit their specific needs, using the drag-and-drop interface.\n" +
    "- They will save their dashboard and share it with key stakeholders within their organization.\n" +
    "\n" +
    "7. Wireframes\n" +
    "The wireframes for the data visualization tool are attached to this PRD.\n" +
    "\n" +
    "8. Non-Functional Requirements\n" +
    "The data visualization tool must meet the following non-functional requirements:\n" +
    "\n" +
    "- Performance: The tool must be fast and responsive, even when dealing with large volumes of data.\n" +
    "- Security: The tool must be secure and comply with industry standards for data protection.\n" +
    "- Scalability: The tool must be scalable to meet the needs of our growing customer base.\n" +
    "\n" +
    "9. Assumptions\n" +
    "We assume that our customers will be receptive to the new feature and that it will meet their needs for a flexible and customizable data visualization tool. We also assume that our development team will be able to deliver the feature on time and within budget.\n" +
    "\n" +
    "10. Dependencies\n" +
    "The development of the data visualization tool is dependent on the availability of our development team and the successful integration of the tool with our existing platform.\n" +
    "\n" +
    "11. Acceptance Criteria\n" +
    "The data visualization tool will be considered successful if it meets the following acceptance criteria:\n" +
    "\n" +
    "- It is launched by the end of Q1.\n" +
    "- It is easy to use and requires minimal training.\n" +
    "- It provides a range of visualization options and is customizable to suit users' specific needs.\n" +
    "- It is fast and responsive, even when dealing with large volumes of data.\n" +
    "- It is secure and complies with industry standards for data protection.\n" +
    "- It is scalable to meet the needs of our growing customer base.\n" +
    "- It is well-received by our customers and leads to an increase in product adoption rate and revenue.",
  tasks: [
    {
      name: "Design user interface",
      description:
        "Design the user interface for the data visualization tool, including the layout, navigation, and visual elements.",
      assignee: "UI Designer",
      due_date: "5 story points",
    },
    {
      name: "Develop visualization options",
      description:
        "Develop the code for various visualization options, including charts, graphs, and tables.",
      assignee: "Frontend Developer",
      due_date: "8 story points",
    },
    {
      name: "Create customizable dashboard functionality",
      description:
        "Develop the functionality for users to create and customize their dashboards using a drag-and-drop interface.",
      assignee: "Frontend Developer",
      due_date: "8 story points",
    },
    {
      name: "Implement interactive features",
      description:
        "Develop the interactive features that allow users to drill down into their data and explore it in more detail.",
      assignee: "Frontend Developer",
      due_date: "6 story points",
    },
    {
      name: "Integrate with existing platform",
      description:
        "Integrate the data visualization tool with the existing B2B unified data platform, ensuring seamless access for users.",
      assignee: "Backend Developer",
      due_date: "8 story points",
    },
    {
      name: "Develop user onboarding program",
      description:
        "Create a user onboarding program to help users learn how to use the data visualization tool effectively.",
      assignee: "Product Manager",
      due_date: "4 story points",
    },
    {
      name: "Test performance, security, and scalability",
      description:
        "Conduct thorough testing to ensure the data visualization tool meets non-functional requirements for performance, security, and scalability.",
      assignee: "QA Engineer",
      due_date: "6 story points",
    },
    {
      name: "Gather user feedback",
      description:
        "Gather feedback from users during the development process to ensure the tool meets their needs and expectations.",
      assignee: "Product Manager",
      due_date: "3 story points",
    },
    {
      name: "Launch marketing campaign",
      description:
        "Develop and execute a marketing campaign to promote the new data visualization tool to existing and potential customers.",
      assignee: "Marketing Manager",
      due_date: "5 story points",
    },
  ],
};
