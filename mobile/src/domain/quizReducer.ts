import { QuizSummary } from '../graphql/types';

export type Quiz = QuizSummary

export const quizReducer = (
  quiz: Partial<Quiz> = {},
  quizUpdate: Partial<Quiz>,
): Partial<Quiz> => {
  console.log('received next action', JSON.stringify(quizUpdate));

  return { ...quiz, ...quizUpdate };
};
