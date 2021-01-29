import { QuizState, QuizStatus } from '../domain/types';
import { QuizEntityState } from './types';

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
        roundNumber: state.roundNumber,
      };

    case QuizStatus.ROUND_FINISHED:
      return {
        status: QuizStatus.ROUND_FINISHED,
        roundNumber: state.roundNumber,
      };

    case QuizStatus.QUESTION_ASKED:
      return {
        status: QuizStatus.QUESTION_ASKED,
        roundNumber: state.roundNumber,
        questionNumber: state.questionNumber,
      };

    case QuizStatus.QUESTION_ANSWERED:
      return {
        status: QuizStatus.QUESTION_ANSWERED,
        roundNumber: state.roundNumber,
        questionNumber: state.questionNumber,
      };

    case QuizStatus.QUIZ_FINISHED:
      return {
        status: QuizStatus.QUIZ_FINISHED,
      };

    default:
      throw new Error('Invalid quiz state provided');
  }
};
