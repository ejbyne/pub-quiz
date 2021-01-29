import { BaseQuizState, QuizStatus, QuizState } from './QuizState';
import { Round } from '../Quiz';
import { QuestionAskedState } from './QuestionAskedState';

export class RoundStartedState implements BaseQuizState {
  status: QuizStatus.ROUND_STARTED = QuizStatus.ROUND_STARTED;
  rounds: Round[];
  roundNumber: number;

  constructor(rounds: Round[], roundNumber: number) {
    this.rounds = rounds;
    this.roundNumber = roundNumber;
  }

  nextState(): QuizState {
    return new QuestionAskedState(this.rounds, this.roundNumber, 0);
  }
}
