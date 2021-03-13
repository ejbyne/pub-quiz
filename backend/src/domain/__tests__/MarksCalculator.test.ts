import { MarksCalculator } from '../MarksCalculator';
import { AnswersByPlayerName } from '../types';

describe('MarksCalculator', () => {
  it('reveals the marks for the current and previous rounds sorted by highest to lowest total mark', () => {
    const answers = {
      Ed: [
        [
          { answer: 'Round 1 - Answer 1', mark: 1 },
          { answer: 'Round 1 - Question 2', mark: 0 },
        ],
        [
          { answer: 'Round 2 - Answer 1', mark: 0 },
          { answer: 'Round 2 - Question 2', mark: 1 },
        ],
      ],
      Henry: [
        [
          { answer: 'Round 1 - Answer 1', mark: 1 },
          { answer: 'Round 1 - Question 2', mark: 1 },
        ],
        [
          { answer: 'Round 2 - Answer 1', mark: 1 },
          { answer: 'Round 2 - Question 2', mark: 1 },
        ],
      ],
      Peeps: [
        [
          { answer: 'Round 1 - Answer 1', mark: 1 },
          { answer: 'Round 1 - Question 2', mark: 0 },
        ],
        [
          { answer: 'Round 2 - Answer 1', mark: 1 },
          { answer: 'Round 2 - Question 2', mark: 1 },
        ],
      ],
    };

    const calculator = new MarksCalculator(answers);

    expect(calculator.calculateMarks()).toEqual([
      {
        playerName: 'Henry',
        rounds: [
          { marks: [1, 1], roundTotal: 2 },
          { marks: [1, 1], roundTotal: 2 },
        ],
        quizTotal: 4,
      },
      {
        playerName: 'Peeps',
        rounds: [
          { marks: [1, 0], roundTotal: 1 },
          { marks: [1, 1], roundTotal: 2 },
        ],
        quizTotal: 3,
      },
      {
        playerName: 'Ed',
        rounds: [
          { marks: [1, 0], roundTotal: 1 },
          { marks: [0, 1], roundTotal: 1 },
        ],
        quizTotal: 2,
      },
    ]);
  });

  it('marks a round with zero if it is missing', () => {
    const answers = {
      Ed: [
        [
          { answer: 'Round 1 - Answer 1', mark: 1 },
          { answer: 'Round 1 - Question 2', mark: 0 },
        ],
        undefined,
      ],
    } as AnswersByPlayerName;

    const calculator = new MarksCalculator(answers);

    expect(calculator.calculateMarks()).toEqual([
      {
        playerName: 'Ed',
        rounds: [
          { marks: [1, 0], roundTotal: 1 },
          { marks: [], roundTotal: 0 },
        ],
        quizTotal: 1,
      },
    ]);
  });

  it('marks an answer with zero if it is missing', () => {
    const answers = {
      Ed: [
        [
          { answer: 'Round 1 - Answer 1', mark: 1 },
          { answer: 'Round 1 - Question 2', mark: 0 },
        ],
        [{ answer: 'Round 2 - Answer 2', mark: 1 }, undefined],
      ],
    } as AnswersByPlayerName;

    const calculator = new MarksCalculator(answers);

    expect(calculator.calculateMarks()).toEqual([
      {
        playerName: 'Ed',
        rounds: [
          { marks: [1, 0], roundTotal: 1 },
          { marks: [1, 0], roundTotal: 1 },
        ],
        quizTotal: 2,
      },
    ]);
  });
});
