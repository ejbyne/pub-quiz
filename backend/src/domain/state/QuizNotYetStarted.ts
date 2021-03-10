import { AnswersByPlayerName, QuizState, QuizStatus, Round } from '../types';
import { BaseQuizState } from './BaseQuizState';
import { QuizFinished } from './QuizFinished';
import { RoundStarted } from './RoundStarted';

export class QuizNotYetStarted extends BaseQuizState {
  status: QuizStatus.QUIZ_NOT_YET_STARTED;
  rounds: Round[];
  answers: AnswersByPlayerName;

  constructor(rounds: Round[], answers: AnswersByPlayerName = {}) {
    super(QuizStatus.QUIZ_NOT_YET_STARTED, rounds, answers);
  }

  nextState(): QuizState {
    if (this.nextRoundWithQuestions === -1) {
      return new QuizFinished(this.rounds, this.answers);
    }

    return new RoundStarted(
      this.rounds,
      this.answers,
      this.nextRoundWithQuestions
    );
  }
}
