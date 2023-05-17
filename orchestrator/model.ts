export type Question = {
  text: string;
  answer?: string;
};

export type Feature = {
  name: string;
  description: string;
  estimatedHours: string;
  pros: string;
  cons: string;
};

export enum AgentType {
  RESEARCH = "RESEARCH",
  PRD = "PRD",
  TICKETEER = "TICKETEER",
  END = "END",
  ERROR = "ERROR",
}

export type ExternalPrompt = {
  request: Action;
  response?: Action;
};

export type Next = {
  agent?: AgentType;
  external_prompt?: ExternalPrompt;
};

export type Task = {
  name?: string;
  description?: string;
  assignee?: string;
  due_date?: string;
};

export type State = {
  input?: string;
  questions?: Question[];
  followUpQuestions?: Question[];
  features?: Feature[];
  prd?: string;
  tasks?: Task[];
  next?: Next;
};

export enum ActionType {
  ProvideInput = "PROVIDE_INPUT",
  ConfirmFeature = "CONFIRM_FEATURE",
  ConfirmPRD = "CONFIRM_PRD",
}

export type ActionParams = {};

export type ProvideInputActionParams = {
  input: string;
} & ActionParams;

export type Action = {
  type: ActionType;
  params?: ActionParams;
};
