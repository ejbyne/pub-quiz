import { Handler } from 'aws-lambda';
import { NextQuizStateResponse } from './nextQuizStateLambda';
import { quizSummaryInteractor } from '../interactors/quizSummaryInteractor';
import { quizRepository } from './config';
import { PlayerStatus } from '../domain/types';

interface QuizSummaryRequest {
  arguments: {
    quizId: string;
  };
}

export interface QuizSummaryResponse {
  quizId: string;
  quizName: string;
  playerNames?: string[];
  players?: {
    name: string;
    status: PlayerStatus;
  }[];
  currentRound?: {
    text: string;
    options?: string[];
    answer?: string;
  }[];
  state: NextQuizStateResponse;
}

export const quizSummaryLambda: Handler<QuizSummaryRequest> = async (
  event,
  _,
  callback
): Promise<QuizSummaryResponse | void> => {
  const { quizId } = event.arguments;

  try {
    console.log(`Getting summary for quiz with id ${quizId}`);
    return quizSummaryInteractor(event.arguments, quizRepository);
  } catch (error) {
    callback(error.message);
  }
};
