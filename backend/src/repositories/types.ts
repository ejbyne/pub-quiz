import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { QuizStatus } from '../domain/types';
export interface QuizEntity {
  quizId: string;
  quizName: string;
  rounds: {
    roundName: string;
    questions: {
      text: string;
      answer: string;
    }[];
  }[];
  state: QuizEntityState;
  playerNames?: DocumentClient.DynamoDbSet;
  answers: Record<string, { answer: string }[][]>;
}

export interface QuizEntityState {
  status: QuizStatus;
  roundNumber?: number;
  questionNumber?: number;
}

export interface SubmitAnswersCommand {
  quizId: string;
  playerName: string;
  roundNumber: number;
  answers: {
    answer: string;
  }[];
}
