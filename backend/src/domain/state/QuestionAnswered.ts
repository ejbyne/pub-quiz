import { Question, QuizState, QuizStatus, Round } from '../types';
import { BaseQuizState } from './BaseQuizState';
import { QuizFinished } from './QuizFinished';
import { RoundStarted } from './RoundStarted';

export class QuestionAnswered extends BaseQuizState {
  status: QuizStatus.QUESTION_ANSWERED;
  rounds: Round[];
  roundNumber: number;
  questionNumber: number;

  constructor(rounds: Round[], roundNumber: number, questionNumber: number) {
    super(QuizStatus.QUESTION_ANSWERED, rounds, roundNumber, questionNumber);
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
    const allQuestions = this.rounds[this.roundNumber].questions.map(
      (question, index) => ({
        ...question,
        number: index,
      })
    );
    const answeredQuestions = allQuestions.slice(0, this.questionNumber + 1);
    const unansweredQuestions = allQuestions
      .slice(this.questionNumber + 1)
      .map(({ number, text, options }) => ({
        number,
        text,
        options,
      }));
    return [...answeredQuestions, ...unansweredQuestions];
  }

  nextState(): QuizState {
    if (this.isLastQuestionInRound) {
      if (this.nextRoundWithQuestions === -1) {
        return new QuizFinished(this.rounds);
      }

      return new RoundStarted(this.rounds, this.nextRoundWithQuestions);
    }

    return new QuestionAnswered(
      this.rounds,
      this.roundNumber,
      this.questionNumber + 1
    );
  }
}
