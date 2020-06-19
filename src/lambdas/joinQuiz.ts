import { Handler } from 'aws-lambda';
import { QuizRepository } from '../repositories/QuizRepository';

interface Event {
  arguments: {
    input: {
      quizId: string;
      playerName: string;
    };
  };
}

interface PlayerJoined {
  quizId: string;
  playerName: string;
}

const quizTableName = process.env.QUIZ_TABLE_NAME as string;

const quizRepository = new QuizRepository(quizTableName);

export const joinQuiz: Handler<Event> = async (
  event: Event
): Promise<PlayerJoined> => {
  const { quizId, playerName } = event.arguments.input;

  console.log(`Player ${playerName} joining quiz with id ${quizId}`);

  await quizRepository.addPlayerName(quizId, playerName);

  return {
    quizId,
    playerName,
  };
};
