import { BaseQuizState, QuizStatus, QuizState } from './QuizState';
import { Round } from '../Quiz';
import { QuizFinishedState } from './QuizFinishedState';
import { RoundStartedState } from './RoundStartedState';

export class RoundFinishedState implements BaseQuizState {
  status: QuizStatus.ROUND_FINISHED;
  rounds: Round[];
  roundNumber: number;
  roundName: string;
  numberOfQuestions: number;

  constructor(
    rounds: Round[],
    roundNumber: number,
    roundName: string,
    numberOfQuestions: number
  ) {
    this.status = QuizStatus.ROUND_FINISHED;
    this.rounds = rounds;
    this.roundNumber = roundNumber;
    this.roundName = roundName;
    this.numberOfQuestions = numberOfQuestions;
  }

  nextState(): QuizState {
    const nextRoundWithQuestions = this.rounds.findIndex(
      (round, index) => index > this.roundNumber && round.questions.length > 0
    );

    if (nextRoundWithQuestions === -1) {
      return new QuizFinishedState(this.rounds);
    }

    return new RoundStartedState(
      this.rounds,
      nextRoundWithQuestions,
      this.rounds[nextRoundWithQuestions].roundName,
      this.rounds[nextRoundWithQuestions].questions.length
    );
  }
}
