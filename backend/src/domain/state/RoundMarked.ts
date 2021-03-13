import { BaseQuizState } from './BaseQuizState';
import {
  AnswersByPlayerName,
  PlayerMarks,
  QuizState,
  QuizStatus,
  Round,
} from '../types';
import { RoundStarted } from './RoundStarted';
import { MarksCalculator } from '../MarksCalculator';

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

  get marks(): PlayerMarks[] {
    return new MarksCalculator(this.answers).calculateMarks();
  }

  nextState(): QuizState {
    return new RoundStarted(
      this.rounds,
      this.answers,
      this.nextRoundWithQuestions
    );
  }
}
