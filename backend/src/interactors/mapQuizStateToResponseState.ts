import { QuizState } from '../domain/types';
import { NextQuizStateResponse } from '../lambdas/nextQuizStateLambda';
import { QuizFinished } from '../domain/state/QuizFinished';
import { RoundMarked } from '../domain/state/RoundMarked';

export const mapQuizStateToResponseState = (
  quizId: string,
  state: QuizState
): NextQuizStateResponse => ({
  __typename: state.constructor.name,
  quizId,
  status: state.status,
  roundSummary: state.roundSummary,
  question: state.question,
  marks: (state as RoundMarked | QuizFinished).marks,
});
