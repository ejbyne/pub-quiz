import { Handler } from 'aws-lambda';
import { quizRepository } from './config';

interface SubmitAnswersRequest {
  arguments: {
    input: {
      quizId: string;
      playerName: string;
      roundNumber: number;
      answers?: string[];
    };
  };
}

interface SubmitAnswersResponse {
  quizId: string;
  playerName: string;
}

export const submitAnswersLambda: Handler<SubmitAnswersRequest> = async (
  event,
  _,
  callback
): Promise<SubmitAnswersResponse | void> => {
  try {
    await quizRepository.saveAnswers(event.arguments.input);
    const { quizId, playerName } = event.arguments.input;
    return {
      quizId,
      playerName,
    };
  } catch (error) {
    callback(error.message);
  }
};
