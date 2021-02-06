/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { QuizEntityState } from './types';
import { QuizNotYetStarted } from '../domain/state/QuizNotYetStarted';
import { RoundStarted } from '../domain/state/RoundStarted';
import { RoundFinished } from '../domain/state/RoundFinished';
import { QuestionAsked } from '../domain/state/QuestionAsked';
import { QuizFinished } from '../domain/state/QuizFinished';
import { QuestionAnswered } from '../domain/state/QuestionAnswered';
import { QuizState, QuizStatus, Round } from '../domain/types';

export const mapEntityStateToQuizState = (
  state: QuizEntityState,
  rounds: Round[]
): QuizState => {
  switch (state.status) {
    case QuizStatus.QUIZ_NOT_YET_STARTED:
      return new QuizNotYetStarted(rounds);

    case QuizStatus.ROUND_STARTED:
      return new RoundStarted(rounds, state.roundNumber!);

    case QuizStatus.ROUND_FINISHED:
      return new RoundFinished(rounds, state.roundNumber!);

    case QuizStatus.QUESTION_ASKED:
      return new QuestionAsked(
        rounds,
        state.roundNumber!,
        state.questionNumber!
      );

    case QuizStatus.QUESTION_ANSWERED:
      return new QuestionAnswered(
        rounds,
        state.roundNumber!,
        state.questionNumber!
      );

    case QuizStatus.QUIZ_FINISHED:
      return new QuizFinished(rounds);

    default:
      throw new Error('Invalid quiz state provided');
  }
};
