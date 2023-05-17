import { Question } from "./model";

const promptQuestionAnswer = (question: Question, prefix: string): string[] => {
  const { text, answer } = question;
  let questionAnswers = [`${prefix}Question: "${text}". Answer: "${answer}"`];
  if (question?.followUpQuestions?.length) {
    questionAnswers = questionAnswers.concat(
      promptQuestionAnswer(question, `${prefix} `)
    );
  }
  return questionAnswers;
};

export const promptQuestionAnswers = (questions: Question[]): string => {
  let prompt = ["Here is what you know:\n"];
  for (const question of questions) {
    prompt = prompt.concat(promptQuestionAnswer(question, ""));
  }
  return prompt.join("\n");
};
