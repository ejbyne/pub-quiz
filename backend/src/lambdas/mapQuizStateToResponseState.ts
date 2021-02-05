import { QuizState } from '../domain/types';
import { NextStateEvent } from './nextQuizState';

export const mapQuizStateToResponseState = (
  quizId: string,
  state: QuizState
): NextStateEvent => ({
  __typename: state.constructor.name.replace('State', ''),
  quizId,
  status: state.status,
  roundSummary: state.roundSummary,
  questionNumber: state.questionNumber,
  questionText: state.questionText,
  questionAnswer: state.questionAnswer,
  questionOptions: state.questionOptions,
});
