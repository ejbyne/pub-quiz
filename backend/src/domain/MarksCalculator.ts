import { Answer, AnswersByPlayerName, PlayerMarks } from './types';

export class MarksCalculator {
  constructor(private answers: AnswersByPlayerName) {}

  calculateMarks(): PlayerMarks[] {
    return Object.entries(this.answers)
      .map(([playerName, roundAnswers]) => {
        const roundMarks = this.calculateRoundMarks(roundAnswers);

        return {
          playerName,
          rounds: roundMarks,
          quizTotal: this.calculateTotalMark(roundMarks),
        };
      })
      .sort((a, b) => b.quizTotal - a.quizTotal);
  }

  private calculateRoundMarks(roundAnswers: Answer[][]): PlayerMarks['rounds'] {
    return roundAnswers.map((round) => {
      const marks = round?.map((answer) => answer?.mark ?? 0) ?? [];
      return {
        marks,
        roundTotal: marks.reduce((sum, mark) => sum + mark, 0),
      };
    });
  }

  private calculateTotalMark(roundMarks: PlayerMarks['rounds']): number {
    return roundMarks.reduce((sum, round) => sum + round.roundTotal, 0);
  }
}
