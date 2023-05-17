export type Question = {
  text: string;
  answer?: string;
  followUpQuestions?: Question[];
};

export type Dimension = {
  text: string;
  questions?: Question[];
};

export type Problem = {
  text: string;
  feature?: string;
  table?: string;
};

export type State = {
  dimension?: Dimension;
  problems?: Problem[];
  prd?: string;
  tasks?: string[];
};

export enum ActionType {
  InputDimension = "INPUT_DIMENSION",
  ConfirmFeature = "CONFIRM_FEATURE",
  ConfirmPRD = "CONFIRM_PRD",
}

export type ActionParams = {};

export type InputDimensionActionParams = {
  dimension: Dimension;
} & ActionParams;

export type Action = {
  type: ActionType;
  params: ActionParams;
};
