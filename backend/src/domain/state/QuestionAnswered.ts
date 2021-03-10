import { AnswersByPlayerName, QuizState, QuizStatus, Round } from '../types';
import { BaseQuizState } from './BaseQuizState';
import { QuizFinished } from './QuizFinished';
import { RoundMarked } from './RoundMarked';

export class QuestionAnswered extends BaseQuizState {
  status: QuizStatus.QUESTION_ANSWERED;
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
      QuizStatus.QUESTION_ANSWERED,
      rounds,
      answers,
      roundNumber,
      questionNumber
    );
  }

  get question(): {
    number: number;
    text: string;
    options?: string[];
    answer: string;
  } {
    const question = this.rounds[this.roundNumber].questions[
      this.questionNumber
    ];
    return { ...question, number: this.questionNumber };
  }

  get currentRound(): {
    number: number;
    text: string;
    options?: string[];
    answer?: string;
  }[] {
    return [
      ...this.answeredQuestionsInRound,
      ...this.unansweredQuestionsInRound,
    ];
  }

  private get allQuestionsInRound() {
    return this.rounds[this.roundNumber].questions.map((question, index) => ({
      ...question,
      number: index,
    }));
  }

  private get answeredQuestionsInRound() {
    return this.allQuestionsInRound.slice(0, this.questionNumber + 1);
  }

  private get unansweredQuestionsInRound() {
    return this.allQuestionsInRound
      .slice(this.questionNumber + 1)
      .map(({ number, text, options }) => ({
        number,
        text,
        options,
      }));
  }

  nextState(): QuizState {
    if (this.isLastQuestionInRound) {
      if (this.nextRoundWithQuestions === -1) {
        return new QuizFinished(this.rounds, this.answers);
      }

      return new RoundMarked(this.rounds, this.answers, this.roundNumber);
    }

    return new QuestionAnswered(
      this.rounds,
      this.answers,
      this.roundNumber,
      this.questionNumber + 1
    );
  }
}
