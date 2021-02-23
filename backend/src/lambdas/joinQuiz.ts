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
  reconnect?: boolean;
}

const quizTableName = process.env.QUIZ_TABLE_NAME as string;

const quizRepository = new QuizRepository(quizTableName);

export const joinQuiz: Handler<Event> = async (
  event,
  _,
  callback
): Promise<PlayerJoinedEvent | void> => {
  const { quizId, playerName, reconnect } = event.arguments.input;

  try {
    console.log(`Player ${playerName} joining quiz with id ${quizId}`);

    const quiz = await quizRepository.get(quizId);

    if (quiz.playerNames?.includes(playerName)) {
      if (reconnect) {
        return {
          quizId,
          playerName,
        };
      }
      callback(`A player with the name ${playerName} already exists`);
    }

    await quizRepository.addPlayerName(quizId, playerName);

    return {
      quizId,
      playerName,
    };
  } catch (error) {
    callback(error.message);
  }
};
