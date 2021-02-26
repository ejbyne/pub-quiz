import { JoinQuizCommand, joinQuizInteractor } from '../joinQuizInteractor';
import { QuizRepository } from '../../repositories/QuizRepository';

describe('join quiz interactor', () => {
  let quizRepository: { addPlayerName: jest.Mock };

  beforeEach(() => {
    quizRepository = {
      addPlayerName: jest.fn(),
    };
  });

  it('adds a new player to the quiz', async () => {
    const command: JoinQuizCommand = {
      quizId: 'RANDOM_ID',
      playerName: 'Henry',
    };

    quizRepository.addPlayerName.mockResolvedValue(undefined);

    const result = await joinQuizInteractor(
      command,
      (quizRepository as unknown) as QuizRepository
    );

    expect(quizRepository.addPlayerName).toHaveBeenCalledWith(
      'RANDOM_ID',
      'Henry'
    );

    expect(result).toEqual({
      quizId: 'RANDOM_ID',
      playerName: 'Henry',
    });
  });
});
