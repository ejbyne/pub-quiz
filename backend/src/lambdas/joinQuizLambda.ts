import { Handler } from 'aws-lambda';
import { joinQuizInteractor } from '../interactors/joinQuizInteractor';
import { quizRepository } from './config';

interface JoinQuizRequest {
  arguments: {
    input: JoinQuizResponse;
  };
}

export interface JoinQuizResponse {
  quizId: string;
  playerName: string;
}

export const joinQuizLambda: Handler<JoinQuizRequest> = async (
  event,
  _,
  callback
): Promise<JoinQuizResponse | void> => {
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
