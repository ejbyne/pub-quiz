import { QuizState } from '../domain/types';
import { NextStateEvent } from './nextQuizState';

export const mapQuizStateToResponseState = (
  quizId: string,
  state: QuizState
): NextStateEvent => ({
  __typename: state.constructor.name,
  quizId,
  status: state.status,
  roundSummary: state.roundSummary,
  question: state.question,
});
