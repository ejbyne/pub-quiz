/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  QuizFinishedState,
  QuizStatus,
  QuizNotYetStartedState,
  RoundStartedState,
  QuizState,
  QuestionAskedState,
} from '../domain/types';
import { QuizEntityState } from './types';

export const mapEntityStateToQuizState = (data: QuizEntityState): QuizState => {
  switch (data.status) {
    case QuizStatus.QUIZ_NOT_YET_STARTED:
      return new QuizNotYetStartedState();

    case QuizStatus.ROUND_STARTED:
      return new RoundStartedState(
        data.roundNumber!,
        data.roundName!,
        data.numberOfQuestions!
      );

    case QuizStatus.QUESTION_ASKED:
      return new QuestionAskedState(
        data.roundNumber!,
        data.questionNumber!,
        data.questionText!
      );

    case QuizStatus.QUIZ_FINISHED:
      return new QuizFinishedState();

    default:
      throw new Error('Invalid quiz state provided');
  }
};
