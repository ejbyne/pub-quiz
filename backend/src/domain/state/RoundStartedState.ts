import { QuizState, QuizStatus, Round } from '../types';
import { BaseQuizState } from './BaseQuizState';
import { QuestionAskedState } from './QuestionAskedState';

export class RoundStartedState extends BaseQuizState {
  status: QuizStatus.ROUND_STARTED;
  rounds: Round[];
  roundNumber: number;

  constructor(rounds: Round[], roundNumber: number) {
    super(QuizStatus.ROUND_STARTED, rounds, roundNumber);
  }

  nextState(): QuizState {
    return new QuestionAskedState(this.rounds, this.roundNumber, 0);
  }
}
