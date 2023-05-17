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
  tables?: string[];
}

export interface State {
  dimension?: Dimension;
  problems?: Problem[];
  prd?: string;
  tasks?: string[];
}

export interface HumanAction {
  type: "" | "";
  text: string;
}
