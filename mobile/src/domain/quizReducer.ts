import { QuizState } from '../graphql/types';

export interface Quiz {
  quizId?: string;
  quizName?: string;
  playerNames?: string[] | null;
  quizState?: QuizState;
}

export const quizReducer = (
  quiz: Quiz = {},
  quizUpdate: Partial<Quiz>,
): Quiz => {
  console.log('received next action', JSON.stringify(quizUpdate));

  return { ...quiz, ...quizUpdate };
};
