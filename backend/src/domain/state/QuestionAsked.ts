import { AnswersByPlayerName, QuizState, QuizStatus, Round } from '../types';
import { BaseQuizState } from './BaseQuizState';
import { RoundFinished } from './RoundFinished';

export class QuestionAsked extends BaseQuizState {
  status: QuizStatus.QUESTION_ASKED;
  rounds: Round[];
  answers: AnswersByPlayerName;
  roundNumber: number;
  questionNumber: number;

  constructor(
    rounds: Round[],
    answers: AnswersByPlayerName,
    roundNumber: number,
    questionNumber: number
  ) {
    super(
      QuizStatus.QUESTION_ASKED,
      rounds,
      answers,
      roundNumber,
      questionNumber
    );
  }

  get question(): { number: number; text: string; options?: string[] } {
    const { text, options } = this.rounds[this.roundNumber].questions[
      this.questionNumber
    ];
    return { number: this.questionNumber, text, options };
  }

  get currentRound(): { number: number; text: string; options?: string[] }[] {
    return this.rounds[this.roundNumber].questions
      .slice(0, this.questionNumber + 1)
      .map(({ text, options }, index) => ({
        number: index,
        text,
        options,
      }));
  }

  nextState(): QuizState {
    if (this.isLastQuestionInRound) {
      return new RoundFinished(this.rounds, this.answers, this.roundNumber);
    }

    return new QuestionAsked(
      this.rounds,
      this.answers,
      this.roundNumber,
      this.questionNumber + 1
    );
  }
}
