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

export const submitAnswersLambda: Handler<SubmitAnswersRequest> = async (
  event
): Promise<boolean> => {
  await quizRepository.saveAnswers(event.arguments.input);
  return true;
};
