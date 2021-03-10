/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { QuizEntityState } from './types';
import { QuizNotYetStarted } from '../domain/state/QuizNotYetStarted';
import { RoundStarted } from '../domain/state/RoundStarted';
import { RoundFinished } from '../domain/state/RoundFinished';
import { QuestionAsked } from '../domain/state/QuestionAsked';
import { QuizFinished } from '../domain/state/QuizFinished';
import { QuestionAnswered } from '../domain/state/QuestionAnswered';
import {
  AnswersByPlayerName,
  QuizState,
  QuizStatus,
  Round,
} from '../domain/types';
import { RoundMarked } from '../domain/state/RoundMarked';

export const mapEntityStateToQuizState = (
  state: QuizEntityState,
  rounds: Round[],
  answers: AnswersByPlayerName
): QuizState => {
  switch (state.status) {
    case QuizStatus.QUIZ_NOT_YET_STARTED:
      return new QuizNotYetStarted(rounds, answers);

    case QuizStatus.ROUND_STARTED:
      return new RoundStarted(rounds, answers, state.roundNumber!);

    case QuizStatus.QUESTION_ASKED:
      return new QuestionAsked(
        rounds,
        answers,
        state.roundNumber!,
        state.questionNumber!
      );

    case QuizStatus.ROUND_FINISHED:
      return new RoundFinished(rounds, answers, state.roundNumber!);

    case QuizStatus.QUESTION_ANSWERED:
      return new QuestionAnswered(
        rounds,
        answers,
        state.roundNumber!,
        state.questionNumber!
      );

    case QuizStatus.ROUND_MARKED:
      return new RoundMarked(rounds, answers, state.roundNumber!);

    case QuizStatus.QUIZ_FINISHED:
      return new QuizFinished(rounds, answers);

    default:
      throw new Error('Invalid quiz state provided');
  }
};
