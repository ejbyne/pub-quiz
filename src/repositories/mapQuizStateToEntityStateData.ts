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
        roundName: state.roundName,
        numberOfQuestions: state.numberOfQuestions,
      };

    case QuizStatus.QUESTION_ASKED:
      return {
        status: QuizStatus.QUESTION_ASKED,
        roundNumber: state.roundNumber,
        questionNumber: state.questionNumber,
        questionText: state.questionText,
      };

    case QuizStatus.QUIZ_FINISHED:
      return {
        status: QuizStatus.QUIZ_FINISHED,
      };

    default:
      throw new Error('Invalid quiz state provided');
  }
};
