import { Handler } from 'aws-lambda';
import { QuizRepository } from '../repositories/QuizRepository';

interface Event {
  arguments: {
    input: PlayerJoinedEvent;
  };
}

interface PlayerJoinedEvent {
  quizId: string;
  playerName: string;
}

const quizTableName = process.env.QUIZ_TABLE_NAME as string;

const quizRepository = new QuizRepository(quizTableName);

export const joinQuiz: Handler<Event> = async (
  event,
  _,
  callback
): Promise<PlayerJoinedEvent | void> => {
  const { quizId, playerName } = event.arguments.input;

  try {
    console.log(`Player ${playerName} joining quiz with id ${quizId}`);

    await quizRepository.addPlayerName(quizId, playerName);

    return {
      quizId,
      playerName,
    };
  } catch (error) {
    callback(error.message);
  }
};
