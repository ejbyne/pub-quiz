import {
  BaseQuizState,
  QuizStatus,
  QuizState,
  RoundSummary,
} from './QuizState';
import { Round } from '../Quiz';
import { QuestionAskedState } from './QuestionAskedState';

export class RoundStartedState implements BaseQuizState {
  status: QuizStatus.ROUND_STARTED = QuizStatus.ROUND_STARTED;
  rounds: Round[];

  roundSummary: RoundSummary;

  constructor(rounds: Round[], roundSummary: RoundSummary) {
    this.rounds = rounds;
    this.roundSummary = roundSummary;
  }

  nextState(): QuizState {
    return new QuestionAskedState(
      this.rounds,
      this.roundSummary,
      0,
      this.rounds[this.roundSummary.roundNumber].questions[0].question
    );
  }
}
