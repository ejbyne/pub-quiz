import { Handler } from 'aws-lambda';
import { v4 as uuid } from 'uuid';
import { Quiz } from '../domain/Quiz';
import { QuizNotYetStarted } from '../domain/state/QuizNotYetStarted';
import { generateRounds } from '../quizApi';
import { quizRepository } from './config';

interface GenerateRandomQuizRequest {
  arguments: {
    input: {
      quizName: string;
    };
  };
}

interface GenerateRandomQuizResponse {
  quizId: string;
  quizName: string;
}

export const generateRandomQuizLambda: Handler<GenerateRandomQuizRequest> = async (
  event
): Promise<GenerateRandomQuizResponse> => {
  const { quizName } = event.arguments.input;
  const quizId = uuid();
  const rounds = await generateRounds();

  console.log(
    `Saving quiz with name ${quizName}, id ${quizId} and rounds ${rounds}`
  );

  const newQuiz = new Quiz(
    quizId,
    quizName,
    rounds,
    new QuizNotYetStarted(rounds)
  );

  await quizRepository.save(newQuiz);

  return {
    quizId,
    quizName,
  };
};
