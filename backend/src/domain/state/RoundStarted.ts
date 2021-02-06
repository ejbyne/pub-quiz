import { QuizState, QuizStatus, Round } from '../types';
import { BaseQuizState } from './BaseQuizState';
import { QuestionAsked } from './QuestionAsked';

export class RoundStarted extends BaseQuizState {
  status: QuizStatus.ROUND_STARTED;
  rounds: Round[];
  roundNumber: number;

  constructor(rounds: Round[], roundNumber: number) {
    super(QuizStatus.ROUND_STARTED, rounds, roundNumber);
  }

  nextState(): QuizState {
    return new QuestionAsked(this.rounds, this.roundNumber, 0);
  }
}
