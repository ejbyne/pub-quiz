import { Handler } from 'aws-lambda';
import { quizRepository } from './config';

interface SubmitMarksRequest {
  arguments: {
    input: {
      quizId: string;
      playerName: string;
      roundNumber: number;
      marks?: number[];
    };
  };
}
interface SubmitMarksResponse {
  quizId: string;
  playerName: string;
}

export const submitMarksLambda: Handler<SubmitMarksRequest> = async (
  event,
  _,
  callback
): Promise<SubmitMarksResponse | void> => {
  try {
    await quizRepository.saveMarks(event.arguments.input);
    const { quizId, playerName } = event.arguments.input;
    return {
      quizId,
      playerName,
    };
  } catch (error) {
    callback(error.message);
  }
};
