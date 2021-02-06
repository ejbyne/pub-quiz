import { QuizState, QuizStatus, Round } from '../types';
import { BaseQuizState } from './BaseQuizState';
import { QuizFinished } from './QuizFinished';
import { RoundStarted } from './RoundStarted';

export class QuizNotYetStarted extends BaseQuizState {
  status: QuizStatus.QUIZ_NOT_YET_STARTED;
  rounds: Round[];

  constructor(rounds: Round[]) {
    super(QuizStatus.QUIZ_NOT_YET_STARTED, rounds);
  }

  nextState(): QuizState {
    if (this.nextRoundWithQuestions === -1) {
      return new QuizFinished(this.rounds);
    }

    return new RoundStarted(this.rounds, this.nextRoundWithQuestions);
  }
}
