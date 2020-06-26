/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  QuizFinishedState,
  QuizStatus,
  QuizNotYetStartedState,
  RoundStartedState,
  QuizState,
  QuestionAskedState,
  Round,
} from '../domain/types';
import { QuizEntityState } from './types';

export const mapEntityStateToQuizState = (
  state: QuizEntityState,
  rounds: Round[]
): QuizState => {
  switch (state.status) {
    case QuizStatus.QUIZ_NOT_YET_STARTED:
      return new QuizNotYetStartedState(rounds);

    case QuizStatus.ROUND_STARTED:
      return new RoundStartedState(
        rounds,
        state.roundNumber!,
        state.roundName!,
        state.numberOfQuestions!
      );

    case QuizStatus.QUESTION_ASKED:
      return new QuestionAskedState(
        rounds,
        state.roundNumber!,
        state.questionNumber!,
        state.questionText!
      );

    case QuizStatus.QUIZ_FINISHED:
      return new QuizFinishedState(rounds);

    default:
      throw new Error('Invalid quiz state provided');
  }
};
