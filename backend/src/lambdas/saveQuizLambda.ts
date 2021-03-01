import { Handler } from 'aws-lambda';
import { saveQuizInteractor } from '../interactors/saveQuizInteractor';
import { quizRepository } from './config';

interface SaveQuizRequest {
  arguments: {
    input: {
      quizName: string;
      rounds: {
        roundName: string;
        questions: {
          text: string;
          answer: string;
          options?: string[];
        }[];
      }[];
    };
  };
}

export const saveQuizLambda: Handler<SaveQuizRequest> = async (
  event
): Promise<boolean> => {
  const command = event.arguments.input;
  console.log(`Saving quiz with name ${command.quizName}`);
  return saveQuizInteractor(command, quizRepository);
};
