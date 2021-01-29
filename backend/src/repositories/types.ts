import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { QuizStatus } from '../domain/types';
export interface QuizEntity {
  quizId: string;
  quizName: string;
  rounds: {
    roundName: string;
    questions: {
      question: string;
      answer: string;
    }[];
  }[];
  state: QuizEntityState;
  playerNames?: DocumentClient.DynamoDbSet;
}
export interface QuizEntityState {
  status: QuizStatus;
  roundNumber?: number;
  questionNumber?: number;
}
