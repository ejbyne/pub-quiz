import { QuizState, QuizStatus, Round } from '../types';
import { BaseQuizState } from './BaseQuizState';
import { RoundFinished } from './RoundFinished';

export class QuestionAsked extends BaseQuizState {
  status: QuizStatus.QUESTION_ASKED;
  rounds: Round[];
  roundNumber: number;
  questionNumber: number;

  constructor(rounds: Round[], roundNumber: number, questionNumber: number) {
    super(QuizStatus.QUESTION_ASKED, rounds, roundNumber, questionNumber);
  }

  get question(): { number: number; text: string; options?: string[] } {
    const { text, options } = this.rounds[this.roundNumber].questions[
      this.questionNumber
    ];
    return { number: this.questionNumber, text, options };
  }

  nextState(): QuizState {
    if (this.isLastQuestionInRound) {
      return new RoundFinished(this.rounds, this.roundNumber);
    }

    return new QuestionAsked(
      this.rounds,
      this.roundNumber,
      this.questionNumber + 1
    );
  }
}
