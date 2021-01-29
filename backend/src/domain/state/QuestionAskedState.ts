import { BaseQuizState, QuizStatus, QuizState } from './QuizState';
import { Round } from '../Quiz';
import { RoundFinishedState } from './RoundFinishedState';

export class QuestionAskedState implements BaseQuizState {
  status: QuizStatus.QUESTION_ASKED;
  rounds: Round[];
  roundNumber: number;
  questionNumber: number;

  constructor(rounds: Round[], roundNumber: number, questionNumber: number) {
    this.status = QuizStatus.QUESTION_ASKED;
    this.rounds = rounds;
    this.roundNumber = roundNumber;
    this.questionNumber = questionNumber;
  }

  nextState(): QuizState {
    if (
      this.questionNumber ===
      this.rounds[this.roundNumber].questions.length - 1
    ) {
      return new RoundFinishedState(this.rounds, this.roundNumber);
    }

    return new QuestionAskedState(
      this.rounds,
      this.roundNumber,
      this.questionNumber + 1
    );
  }
}
