import { Handler } from 'aws-lambda';
import { quizRepository } from './config';

interface SubmitMarksRequest {
  arguments: {
    input: {
      quizId: string;
      playerName: string;
      roundNumber: number;
      marks: number[];
    };
  };
}

export const submitAnswersLambda: Handler<SubmitMarksRequest> = async (
  event
): Promise<boolean> => {
  await quizRepository.saveMarks(event.arguments.input);
  return true;
};
