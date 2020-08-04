import { BaseQuizState, QuizStatus, QuizState } from './QuizState';
import { Round } from '../Quiz';
import { QuizFinishedState } from './QuizFinishedState';
import { RoundStartedState } from './RoundStartedState';

export class QuizNotYetStartedState implements BaseQuizState {
  status: QuizStatus.QUIZ_NOT_YET_STARTED = QuizStatus.QUIZ_NOT_YET_STARTED;
  rounds: Round[];

  constructor(rounds: Round[]) {
    this.rounds = rounds;
  }

  nextState(): QuizState {
    const nextRoundWithQuestions = this.rounds.findIndex(
      (round) => round.questions.length > 0
    );

    if (nextRoundWithQuestions === -1) {
      return new QuizFinishedState(this.rounds);
    }

    const nextRoundSummary = {
      roundNumber: nextRoundWithQuestions,
      roundName: this.rounds[nextRoundWithQuestions].roundName,
      numberOfQuestions: this.rounds[nextRoundWithQuestions].questions.length,
    };

    return new RoundStartedState(this.rounds, nextRoundSummary);
  }
}
