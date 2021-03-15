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

export const submitMarksLambda: Handler<SubmitMarksRequest> = async (
  event,
  _,
  callback
): Promise<boolean | void> => {
  try {
    await quizRepository.saveMarks(event.arguments.input);
    return true;
  } catch (error) {
    callback(error.message);
  }
};
