/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { QuizEntityState } from './types';
import { QuizNotYetStartedState } from '../domain/state/QuizNotYetStartedState';
import { RoundStartedState } from '../domain/state/RoundStartedState';
import { RoundFinishedState } from '../domain/state/RoundFinishedState';
import { QuestionAskedState } from '../domain/state/QuestionAskedState';
import { QuizFinishedState } from '../domain/state/QuizFinishedState';
import { QuestionAnsweredState } from '../domain/state/QuestionAnsweredState';
import { QuizState, QuizStatus, Round } from '../domain/types';

export const mapEntityStateToQuizState = (
  state: QuizEntityState,
  rounds: Round[]
): QuizState => {
  switch (state.status) {
    case QuizStatus.QUIZ_NOT_YET_STARTED:
      return new QuizNotYetStartedState(rounds);

    case QuizStatus.ROUND_STARTED:
      return new RoundStartedState(rounds, state.roundNumber!);

    case QuizStatus.ROUND_FINISHED:
      return new RoundFinishedState(rounds, state.roundNumber!);

    case QuizStatus.QUESTION_ASKED:
      return new QuestionAskedState(
        rounds,
        state.roundNumber!,
        state.questionNumber!
      );

    case QuizStatus.QUESTION_ANSWERED:
      return new QuestionAnsweredState(
        rounds,
        state.roundNumber!,
        state.questionNumber!
      );

    case QuizStatus.QUIZ_FINISHED:
      return new QuizFinishedState(rounds);

    default:
      throw new Error('Invalid quiz state provided');
  }
};
