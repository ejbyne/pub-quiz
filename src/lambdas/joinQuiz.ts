import { Handler } from 'aws-lambda';

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

export const joinQuiz: Handler<Event> = async (
  event: Event
): Promise<PlayerJoined> => {
  const { quizId, playerName } = event.arguments.input;

  console.log('joining quiz', quizId, playerName);

  return {
    quizId,
    playerName,
  };
};
