import { BaseQuizState } from './BaseQuizState';
import { AnswersByPlayerName, QuizState, QuizStatus, Round } from '../types';
import { RoundStarted } from './RoundStarted';

export class RoundMarked extends BaseQuizState {
  status: QuizStatus.ROUND_MARKED;
  rounds: Round[];
  answers: AnswersByPlayerName;
  roundNumber: number;

  constructor(
    rounds: Round[],
    answers: AnswersByPlayerName,
    roundNumber: number
  ) {
    super(QuizStatus.ROUND_MARKED, rounds, answers, roundNumber);
  }

  nextState(): QuizState {
    return new RoundStarted(
      this.rounds,
      this.answers,
      this.nextRoundWithQuestions
    );
  }
}
