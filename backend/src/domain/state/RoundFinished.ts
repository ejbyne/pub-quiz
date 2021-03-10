import { AnswersByPlayerName, QuizState, QuizStatus, Round } from '../types';
import { BaseQuizState } from './BaseQuizState';
import { QuestionAnswered } from './QuestionAnswered';

export class RoundFinished extends BaseQuizState {
  status: QuizStatus.ROUND_FINISHED;
  rounds: Round[];
  answers: AnswersByPlayerName;
  roundNumber: number;

  constructor(
    rounds: Round[],
    answers: AnswersByPlayerName,
    roundNumber: number
  ) {
    super(QuizStatus.ROUND_FINISHED, rounds, answers, roundNumber);
  }

  nextState(): QuizState {
    return new QuestionAnswered(this.rounds, this.answers, this.roundNumber, 0);
  }
}
