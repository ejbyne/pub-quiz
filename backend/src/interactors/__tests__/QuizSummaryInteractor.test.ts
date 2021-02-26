import { Quiz } from '../../domain/Quiz';
import { RoundStarted } from '../../domain/state/RoundStarted';
import { quizSummaryInteractor } from '../quizSummaryInteractor';
import { QuizRepository } from '../../repositories/QuizRepository';
import { QuizStatus } from '../../domain/types';

describe('quizSummaryInteractor', () => {
  it('returns the quiz summary', async () => {
    const rounds = [
      {
        roundName: 'Round 1',
        questions: [
          {
            text: 'Question 1',
            answer: 'Answer 1',
          },
        ],
      },
    ];

    const quizRespository = { get: jest.fn(), updateState: jest.fn() };
    quizRespository.get.mockResolvedValue(
      new Quiz('RANDOM_ID', 'A quiz', rounds, new RoundStarted(rounds, 0))
    );

    const result = await quizSummaryInteractor(
      { quizId: 'RANDOM_ID' },
      (quizRespository as unknown) as QuizRepository
    );

    expect(result).toEqual({
      quizId: 'RANDOM_ID',
      quizName: 'A quiz',
      state: {
        __typename: 'RoundStarted',
        quizId: 'RANDOM_ID',
        status: QuizStatus.ROUND_STARTED,
        roundSummary: {
          roundNumber: 0,
          roundName: 'Round 1',
          numberOfQuestions: 1,
        },
      },
    });
  });
});
