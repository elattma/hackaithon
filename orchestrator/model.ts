export interface Question {
  text: string;
  answer?: string;
}

export interface Dimension {
  text: string;
  questions?: Question[];
  followUpQuestions?: Question[];
}

export interface Problem {
  text: string;
  feature?: string;
  table?: string;
}

export interface State {
  dimension?: Dimension;
  problems?: Problem[];
  prd?: string;
  tasks?: string[];
}

export enum ActionType {
  InputDimension = "INPUT_DIMENSION",
  ConfirmFeature = "CONFIRM_FEATURE",
  ConfirmPRD = "CONFIRM_PRD",
}

export interface ActionParams {}

export interface InputDimensionActionParams extends ActionParams {
  dimension: Dimension;
}

export interface Action {
  type: ActionType;
  params: ActionParams;
}
