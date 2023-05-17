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

export interface Action {
  type: string;
}

export interface ConfirmFeatureAction extends Action {
  type: "CONFIRM_FEATURE";
}

export interface ConfirmPRDAction extends Action {
  type: "CONFIRM_PRD";
}

export interface InputDimensionAction extends Action {
  type: "INPUT_DIMENSION";
  dimension: Dimension;
}
