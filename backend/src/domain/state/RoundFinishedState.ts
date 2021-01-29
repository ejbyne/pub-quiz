import { QuizState, QuizStatus, Round } from '../types';
import { BaseQuizState } from './BaseQuizState';
import { QuestionAnsweredState } from './QuestionAnsweredState';

export class RoundFinishedState extends BaseQuizState {
  status: QuizStatus.ROUND_FINISHED;
  rounds: Round[];
  roundNumber: number;

  constructor(rounds: Round[], roundNumber: number) {
    super(QuizStatus.ROUND_FINISHED, rounds, roundNumber);
  }

  nextState(): QuizState {
    return new QuestionAnsweredState(this.rounds, this.roundNumber, 0);
  }
}
