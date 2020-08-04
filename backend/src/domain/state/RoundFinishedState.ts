import {
  BaseQuizState,
  QuizStatus,
  QuizState,
  RoundSummary,
} from './QuizState';
import { Round } from '../Quiz';
import { QuizFinishedState } from './QuizFinishedState';
import { RoundStartedState } from './RoundStartedState';

export class RoundFinishedState implements BaseQuizState {
  status: QuizStatus.ROUND_FINISHED;
  rounds: Round[];

  roundSummary: RoundSummary;

  constructor(rounds: Round[], roundSummary: RoundSummary) {
    this.status = QuizStatus.ROUND_FINISHED;
    this.rounds = rounds;
    this.roundSummary = roundSummary;
  }

  nextState(): QuizState {
    const nextRoundWithQuestions = this.rounds.findIndex(
      (round, index) =>
        index > this.roundSummary.roundNumber && round.questions.length > 0
    );

    if (nextRoundWithQuestions === -1) {
      return new QuizFinishedState(this.rounds);
    }

    return new RoundStartedState(this.rounds, {
      roundNumber: nextRoundWithQuestions,
      roundName: this.rounds[nextRoundWithQuestions].roundName,
      numberOfQuestions: this.rounds[nextRoundWithQuestions].questions.length,
    });
  }
}
