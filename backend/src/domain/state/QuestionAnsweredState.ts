import { Question, QuizState, QuizStatus, Round } from '../types';
import { BaseQuizState } from './BaseQuizState';
import { QuizFinishedState } from './QuizFinishedState';
import { RoundStartedState } from './RoundStartedState';

export class QuestionAnsweredState extends BaseQuizState {
  status: QuizStatus;
  rounds: Round[];
  roundNumber: number;
  questionNumber: number;

  constructor(rounds: Round[], roundNumber: number, questionNumber: number) {
    super(QuizStatus.QUESTION_ANSWERED, rounds, roundNumber, questionNumber);
  }

  get questionText(): string {
    return this.question.question;
  }

  get questionAnswer(): string {
    return this.question.answer;
  }

  get questionOptions(): string[] | undefined {
    return this.question.options;
  }

  private get question(): Question {
    return this.rounds[this.roundNumber].questions[this.questionNumber];
  }

  nextState(): QuizState {
    if (this.isLastQuestionInRound()) {
      const nextRoundWithQuestions = this.nextRoundWithQuestions();

      if (nextRoundWithQuestions === -1) {
        return new QuizFinishedState(this.rounds);
      }

      return new RoundStartedState(this.rounds, this.roundNumber + 1);
    }

    return new QuestionAnsweredState(
      this.rounds,
      this.roundNumber,
      this.questionNumber + 1
    );
  }

  isLastQuestionInRound(): boolean {
    return (
      this.questionNumber === this.rounds[this.roundNumber].questions.length - 1
    );
  }

  nextRoundWithQuestions(): number {
    return this.rounds.findIndex(
      (round, index) => index > this.roundNumber && round.questions.length > 0
    );
  }
}
