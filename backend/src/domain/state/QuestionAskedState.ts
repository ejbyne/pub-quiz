import {
  BaseQuizState,
  QuizStatus,
  QuizState,
  RoundSummary,
} from './QuizState';
import { Round } from '../Quiz';
import { RoundFinishedState } from './RoundFinishedState';

export class QuestionAskedState implements BaseQuizState {
  status: QuizStatus.QUESTION_ASKED;
  rounds: Round[];

  roundSummary: RoundSummary;
  questionNumber: number;
  questionText: string;

  constructor(
    rounds: Round[],
    roundSummary: RoundSummary,
    questionNumber: number,
    questionText: string
  ) {
    this.status = QuizStatus.QUESTION_ASKED;
    this.rounds = rounds;
    this.roundSummary = roundSummary;
    this.questionNumber = questionNumber;
    this.questionText = questionText;
  }

  nextState(): QuizState {
    if (
      this.questionNumber ===
      this.rounds[this.roundSummary.roundNumber].questions.length - 1
    ) {
      return new RoundFinishedState(this.rounds, this.roundSummary);
    }

    return new QuestionAskedState(
      this.rounds,
      this.roundSummary,
      this.questionNumber + 1,
      this.rounds[this.roundSummary.roundNumber].questions[
        this.questionNumber + 1
      ].question
    );
  }
}
