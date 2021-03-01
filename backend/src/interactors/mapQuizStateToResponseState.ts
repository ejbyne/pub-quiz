import { QuizState } from '../domain/types';
import { NextQuizStateResponse } from '../lambdas/nextQuizStateLambda';

export const mapQuizStateToResponseState = (
  quizId: string,
  state: QuizState
): NextQuizStateResponse => ({
  __typename: state.constructor.name,
  quizId,
  status: state.status,
  roundSummary: state.roundSummary,
  question: state.question,
});
