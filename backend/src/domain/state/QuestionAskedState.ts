import { BaseQuizState, QuizStatus, QuizState } from './QuizState';
import { Round } from '../Quiz';
import { RoundFinishedState } from './RoundFinishedState';

export class QuestionAskedState implements BaseQuizState {
  status: QuizStatus.QUESTION_ASKED;
  rounds: Round[];

  roundNumber: number;
  questionNumber: number;
  questionText: string;

  constructor(
    rounds: Round[],
    roundNumber: number,
    questionNumber: number,
    questionText: string
  ) {
    this.status = QuizStatus.QUESTION_ASKED;
    this.rounds = rounds;
    this.roundNumber = roundNumber;
    this.questionNumber = questionNumber;
    this.questionText = questionText;
  }

  nextState(): QuizState {
    if (
      this.questionNumber ===
      this.rounds[this.roundNumber].questions.length - 1
    ) {
      return new RoundFinishedState(
        this.rounds,
        this.roundNumber,
        this.rounds[this.roundNumber].roundName,
        this.rounds[this.roundNumber].questions.length
      );
    }

    return new QuestionAskedState(
      this.rounds,
      this.roundNumber,
      this.questionNumber + 1,
      this.rounds[this.roundNumber].questions[this.questionNumber + 1].question
    );
  }
}
