import { BaseQuizState, QuizStatus, QuizState } from './QuizState';
import { Round } from '../Quiz';
import { QuestionAskedState } from './QuestionAskedState';

export class RoundStartedState implements BaseQuizState {
  status: QuizStatus.ROUND_STARTED = QuizStatus.ROUND_STARTED;
  rounds: Round[];

  roundNumber: number;
  roundName: string;
  numberOfQuestions: number;

  constructor(
    rounds: Round[],
    roundNumber: number,
    roundName: string,
    numberOfQuestions: number
  ) {
    this.rounds = rounds;
    this.roundNumber = roundNumber;
    this.roundName = roundName;
    this.numberOfQuestions = numberOfQuestions;
  }

  nextState(): QuizState {
    return new QuestionAskedState(
      this.rounds,
      this.roundNumber,
      0,
      this.rounds[this.roundNumber].questions[0].question
    );
  }
}
