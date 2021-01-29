import { BaseQuizState, QuizStatus, QuizState } from './QuizState';
import { Round } from '../Quiz';
import { QuestionAnsweredState } from './QuestionAnsweredState';

export class RoundFinishedState implements BaseQuizState {
  status: QuizStatus.ROUND_FINISHED;
  rounds: Round[];
  roundNumber: number;

  constructor(rounds: Round[], roundNumber: number) {
    this.status = QuizStatus.ROUND_FINISHED;
    this.rounds = rounds;
    this.roundNumber = roundNumber;
  }

  nextState(): QuizState {
    return new QuestionAnsweredState(this.rounds, this.roundNumber, 0);
  }
}
