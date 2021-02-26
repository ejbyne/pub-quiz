import { nextQuizStateInteractor } from '../nextQuizStateInteractor';
import { QuizRepository } from '../../repositories/QuizRepository';
import { RoundStarted } from '../../domain/state/RoundStarted';
import { QuestionAsked } from '../../domain/state/QuestionAsked';
import { QuizStatus } from '../../domain/types';
import { Quiz } from '../../domain/Quiz';

describe('nextQuizStateInteractor', () => {
  it('calculates the next state', async () => {
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

    const result = await nextQuizStateInteractor(
      { quizId: 'RANDOM_ID' },
      (quizRespository as unknown) as QuizRepository
    );

    expect(quizRespository.get).toHaveBeenCalledWith('RANDOM_ID');

    expect(quizRespository.updateState).toHaveBeenCalledWith(
      'RANDOM_ID',
      new QuestionAsked(rounds, 0, 0)
    );

    expect(result).toEqual({
      __typename: 'QuestionAsked',
      quizId: 'RANDOM_ID',
      status: QuizStatus.QUESTION_ASKED,
      roundSummary: {
        roundNumber: 0,
        roundName: 'Round 1',
        numberOfQuestions: 1,
      },
      question: { number: 0, options: undefined, text: 'Question 1' },
    });
  });
});
