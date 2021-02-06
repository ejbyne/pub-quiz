import { QuizState, QuizStatus, Round } from '../types';
import { BaseQuizState } from './BaseQuizState';
import { QuestionAnswered } from './QuestionAnswered';

export class RoundFinished extends BaseQuizState {
  status: QuizStatus.ROUND_FINISHED;
  rounds: Round[];
  roundNumber: number;

  constructor(rounds: Round[], roundNumber: number) {
    super(QuizStatus.ROUND_FINISHED, rounds, roundNumber);
  }

  nextState(): QuizState {
    return new QuestionAnswered(this.rounds, this.roundNumber, 0);
  }
}
