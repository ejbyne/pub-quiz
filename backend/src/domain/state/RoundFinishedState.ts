import {
  BaseQuizState,
  QuizStatus,
  QuizState,
  RoundSummary,
} from './QuizState';
import { Round } from '../Quiz';
import { QuestionAnsweredState } from './QuestionAnsweredState';

export class RoundFinishedState implements BaseQuizState {
  status: QuizStatus.ROUND_FINISHED;
  rounds: Round[];

  roundSummary: RoundSummary;

  constructor(rounds: Round[], roundSummary: RoundSummary) {
    this.status = QuizStatus.ROUND_FINISHED;
    this.rounds = rounds;
    this.roundSummary = roundSummary;
  }

  nextState(): QuizState {
    // const nextRoundWithQuestions = this.rounds.findIndex(
    //   (round, index) =>
    //     index > this.roundSummary.roundNumber && round.questions.length > 0
    // );

    // if (nextRoundWithQuestions === -1) {
    //   return new QuizFinishedState(this.rounds);
    // }

    const nextAnswer = this.rounds[this.roundSummary.roundNumber].questions[0];

    return new QuestionAnsweredState(
      this.rounds,
      this.roundSummary,
      0,
      nextAnswer.question,
      nextAnswer.answer,
      nextAnswer.options
    );
  }
}
