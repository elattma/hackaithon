export type Question = {
  text: string;
  answer?: string;
  followUpQuestions?: FollowUpQuestion[];
};

export type FollowUpQuestion = {
  text: string;
  answer?: string;
};

export type Problem = {
  text: string;
  feature?: string;
  table?: string;
};

export type State = {
  input?: string;
  questions?: Question[];
  problems?: Problem[];
  prd?: string;
  tasks?: string[];
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
  params: ActionParams;
};
