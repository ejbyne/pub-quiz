import { quizReducer, QuizActionType } from '../quizReducer';

describe('quiz reducer', () => {
  it('should store the quiz id', () => {
    const quiz = {};

    const result = quizReducer(quiz, {
      quizId: 'RANDOM_ID',
    });

    expect(result.quizId).toEqual('RANDOM_ID');
  });
});
