/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { QuizEntityState } from './types';
import { Round } from '../domain/Quiz';
import { QuizState, QuizStatus } from '../domain/state/QuizState';
import { QuizNotYetStartedState } from '../domain/state/QuizNotYetStartedState';
import { RoundStartedState } from '../domain/state/RoundStartedState';
import { RoundFinishedState } from '../domain/state/RoundFinishedState';
import { QuestionAskedState } from '../domain/state/QuestionAskedState';
import { QuizFinishedState } from '../domain/state/QuizFinishedState';

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

    case QuizStatus.ROUND_FINISHED:
      return new RoundFinishedState(
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
