import { QuizState, QuizStatus, Round } from '../types';
import { BaseQuizState } from './BaseQuizState';

export class QuizFinished extends BaseQuizState {
  status: QuizStatus.QUIZ_FINISHED;
  rounds: Round[];

  constructor(rounds: Round[]) {
    super(QuizStatus.QUIZ_FINISHED, rounds);
  }

  nextState(): QuizState {
    return this;
  }
}
