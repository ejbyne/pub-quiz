import { saveQuizInteractor } from '../saveQuizInteractor';
import { QuizRepository } from '../../repositories/QuizRepository';
import { QuizNotYetStarted } from '../../domain/state/QuizNotYetStarted';
import { Quiz } from '../../domain/Quiz';

describe('saveQuizInteractor', () => {
  it('should save the quiz', async () => {
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

    const command = {
      quizId: 'RANDOM_ID',
      quizName: "Ed's quiz",
      rounds,
    };

    const quizRepository = { save: jest.fn() };

    const result = await saveQuizInteractor(
      command,
      (quizRepository as unknown) as QuizRepository
    );

    expect(quizRepository.save).toHaveBeenCalledWith(
      new Quiz(
        expect.any(String),
        "Ed's quiz",
        rounds,
        new QuizNotYetStarted(rounds)
      )
    );

    expect(result).toEqual(true);
  });
});
