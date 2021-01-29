/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { QuizEntityState } from './types';
import { Round } from '../domain/Quiz';
import { QuizState, QuizStatus } from '../domain/state/QuizState';
import { QuizNotYetStartedState } from '../domain/state/QuizNotYetStartedState';
import { RoundStartedState } from '../domain/state/RoundStartedState';
import { RoundFinishedState } from '../domain/state/RoundFinishedState';
import { QuestionAskedState } from '../domain/state/QuestionAskedState';
import { QuizFinishedState } from '../domain/state/QuizFinishedState';
import { QuestionAnsweredState } from '../domain/state/QuestionAnsweredState';

export const mapEntityStateToQuizState = (
  state: QuizEntityState,
  rounds: Round[]
): QuizState => {
  switch (state.status) {
    case QuizStatus.QUIZ_NOT_YET_STARTED:
      return new QuizNotYetStartedState(rounds);

    case QuizStatus.ROUND_STARTED:
      return new RoundStartedState(rounds, state.roundSummary!);

    case QuizStatus.ROUND_FINISHED:
      return new RoundFinishedState(rounds, state.roundSummary!);

    case QuizStatus.QUESTION_ASKED:
      return new QuestionAskedState(
        rounds,
        state.roundSummary!,
        state.questionNumber!,
        state.questionText!,
        state.questionOptions
      );

    case QuizStatus.QUESTION_ANSWERED:
      return new QuestionAnsweredState(
        rounds,
        state.roundSummary!,
        state.questionNumber!,
        state.questionText!,
        state.questionAnswer!,
        state.questionOptions
      )

    case QuizStatus.QUIZ_FINISHED:
      return new QuizFinishedState(rounds);

    default:
      throw new Error('Invalid quiz state provided');
  }
};
