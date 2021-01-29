import { Round } from '../Quiz';
import { QuizFinishedState } from './QuizFinishedState';
import {
  BaseQuizState,
  QuizState,
  QuizStatus,
  RoundSummary,
} from './QuizState';
import { RoundStartedState } from './RoundStartedState';

export class QuestionAnsweredState implements BaseQuizState {
  status: QuizStatus;
  rounds: Round[];

  roundSummary: RoundSummary;
  questionNumber: number;
  questionText: string;
  questionOptions?: string[];
  questionAnswer: string;

  constructor(
    rounds: Round[],
    roundSummary: RoundSummary,
    questionNumber: number,
    questionText: string,
    questionAnswer: string,
    questionOptions?: string[]
  ) {
    this.status = QuizStatus.QUESTION_ANSWERED;
    this.rounds = rounds;
    this.roundSummary = roundSummary;
    this.questionNumber = questionNumber;
    this.questionText = questionText;
    this.questionAnswer = questionAnswer;
    this.questionOptions = questionOptions;
  }

  nextState(): QuizState {
    if (
      this.questionNumber ===
      this.rounds[this.roundSummary.roundNumber].questions.length - 1
    ) {
      const nextRoundWithQuestions = this.rounds.findIndex(
        (round, index) =>
          index > this.roundSummary.roundNumber && round.questions.length > 0
      );

      if (nextRoundWithQuestions === -1) {
        return new QuizFinishedState(this.rounds);
      }

      const nextRound = this.rounds[this.roundSummary.roundNumber + 1];

      return new RoundStartedState(this.rounds, {
        roundNumber: this.roundSummary.roundNumber + 1,
        roundName: nextRound.roundName,
        numberOfQuestions: nextRound.questions.length,
      });
    }

    const nextAnswer = this.rounds[this.roundSummary.roundNumber].questions[
      this.questionNumber + 1
    ];

    return new QuestionAnsweredState(
      this.rounds,
      this.roundSummary,
      this.questionNumber + 1,
      nextAnswer.question,
      nextAnswer.answer,
      nextAnswer.options
    );
  }
}
