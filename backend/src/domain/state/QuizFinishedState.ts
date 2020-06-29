import { BaseQuizState, QuizStatus, QuizState } from './QuizState';
import { Round } from '../Quiz';

export class QuizFinishedState implements BaseQuizState {
  status: QuizStatus.QUIZ_FINISHED;
  rounds: Round[];

  constructor(rounds: Round[]) {
    this.status = QuizStatus.QUIZ_FINISHED;
    this.rounds = rounds;
  }

  nextState(): QuizState {
    return this;
  }
}
