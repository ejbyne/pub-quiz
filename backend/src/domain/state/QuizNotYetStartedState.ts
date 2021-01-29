import { QuizState, QuizStatus, Round } from '../types';
import { BaseQuizState } from './BaseQuizState';
import { QuizFinishedState } from './QuizFinishedState';
import { RoundStartedState } from './RoundStartedState';

export class QuizNotYetStartedState extends BaseQuizState {
  status: QuizStatus.QUIZ_NOT_YET_STARTED;
  rounds: Round[];

  constructor(rounds: Round[]) {
    super(QuizStatus.QUIZ_NOT_YET_STARTED, rounds);
  }

  nextState(): QuizState {
    const nextRoundWithQuestions = this.nextRoundWithQuestions();

    if (nextRoundWithQuestions === -1) {
      return new QuizFinishedState(this.rounds);
    }

    return new RoundStartedState(this.rounds, nextRoundWithQuestions);
  }

  nextRoundWithQuestions(): number {
    return this.rounds.findIndex((round) => round.questions.length > 0);
  }
}
