import { QuizEntityState } from './types';
import { QuizState, QuizStatus } from '../domain/state/QuizState';

export const mapQuizStateToEntityState = (
  state: QuizState
): QuizEntityState => {
  switch (state.status) {
    case QuizStatus.QUIZ_NOT_YET_STARTED:
      return {
        status: QuizStatus.QUIZ_NOT_YET_STARTED,
      };

    case QuizStatus.ROUND_STARTED:
      return {
        status: QuizStatus.ROUND_STARTED,
        roundSummary: state.roundSummary,
      };

    case QuizStatus.ROUND_FINISHED:
      return {
        status: QuizStatus.ROUND_FINISHED,
        roundSummary: state.roundSummary,
      };

    case QuizStatus.QUESTION_ASKED:
      return {
        status: QuizStatus.QUESTION_ASKED,
        roundSummary: state.roundSummary,
        questionNumber: state.questionNumber,
        questionText: state.questionText,
        questionOptions: state.questionOptions,
      };

    case QuizStatus.QUIZ_FINISHED:
      return {
        status: QuizStatus.QUIZ_FINISHED,
      };

    default:
      throw new Error('Invalid quiz state provided');
  }
};
