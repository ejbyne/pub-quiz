import { Handler } from 'aws-lambda';
import { QuizRepository } from '../repositories/QuizRepository';
import { joinQuizInteractor } from '../interactors/joinQuizInteractor';

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

export const joinQuizLambda: Handler<Event> = async (
  event,
  _,
  callback
): Promise<PlayerJoinedEvent | void> => {
  const command = event.arguments.input;
  console.log(
    `Player ${command.playerName} joining quiz with id ${command.quizId}`
  );
  try {
    return joinQuizInteractor(command, quizRepository);
  } catch (error) {
    callback(error.message);
  }
};
