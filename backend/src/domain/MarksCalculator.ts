import { Answer, AnswersByPlayerName, Mark } from './types';

export class MarksCalculator {
  constructor(private answers: AnswersByPlayerName) {}

  calculateMarks(): Mark[] {
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

  private calculateRoundMarks(roundAnswers: Answer[][]): Mark['rounds'] {
    return roundAnswers.map((round) => {
      const marks = round?.map((answer) => answer?.mark ?? 0) ?? [];
      return {
        marks,
        roundTotal: marks.reduce((sum, mark) => sum + mark, 0),
      };
    });
  }

  private calculateTotalMark(roundMarks: Mark['rounds']): number {
    return roundMarks.reduce((sum, round) => sum + round.roundTotal, 0);
  }
}
