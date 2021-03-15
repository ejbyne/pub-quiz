import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';
import { Quiz } from '../domain/Quiz';
import { QuizEntity, SubmitAnswersCommand, SubmitMarksCommand } from './types';
import { mapEntityStateToQuizState } from './mapEntityStateToQuizState';
import { mapQuizStateToEntityState } from './mapQuizStateToEntityState';
import { Answer, AnswersByPlayerName, QuizState } from '../domain/types';

export class QuizRepository {
  private documentClient: DocumentClient;

  private tableName: string;

  constructor(
    tableName: string,
    dynamoClientConfiguration?: ServiceConfigurationOptions
  ) {
    this.documentClient = new DocumentClient({
      ...dynamoClientConfiguration,
      apiVersion: '2012-10-08',
    });
    this.tableName = tableName;
  }

  async get(quizId: string): Promise<Quiz> {
    const { Item } = await this.documentClient
      .get({
        TableName: this.tableName,
        Key: { quizId },
        ConsistentRead: true,
      })
      .promise();

    if (!Item) {
      throw new Error(`The quiz ID does not exist`);
    }

    const {
      quizName,
      rounds,
      state,
      playerNames,
      answers,
    } = Item as QuizEntity;

    return new Quiz(
      quizId,
      quizName,
      rounds,
      mapEntityStateToQuizState(state, rounds, answers),
      playerNames as string[] | undefined,
      answers as AnswersByPlayerName
    );
  }

  async save(quiz: Quiz): Promise<void> {
    const entity: QuizEntity = {
      quizId: quiz.quizId,
      quizName: quiz.quizName,
      rounds: quiz.rounds,
      state: mapQuizStateToEntityState(quiz.state),
      playerNames: quiz.playerNames?.length
        ? this.documentClient.createSet(quiz.playerNames)
        : undefined,
      answers: quiz.answers ?? {},
    };

    const params = {
      TableName: this.tableName,
      Item: entity,
    };

    await this.documentClient.put(params).promise();
  }

  async addPlayerName(quizId: string, newPlayerName: string): Promise<void> {
    const savedQuiz = await this.get(quizId);

    const playerNames = savedQuiz.playerNames?.values as string[] | undefined;

    if (playerNames?.includes(newPlayerName)) {
      return undefined;
    }

    await this.documentClient
      .update({
        TableName: this.tableName,
        Key: { quizId },
        UpdateExpression: 'ADD playerNames :name',
        ExpressionAttributeValues: {
          ':name': this.documentClient.createSet([newPlayerName]),
        },
      })
      .promise();
  }

  async updateState(quizId: string, state: QuizState): Promise<void> {
    await this.documentClient
      .update({
        TableName: this.tableName,
        Key: { quizId },
        UpdateExpression: 'SET #state = :state',
        ExpressionAttributeNames: {
          '#state': 'state',
        },
        ExpressionAttributeValues: {
          ':state': mapQuizStateToEntityState(state),
        },
      })
      .promise();
  }

  async getAll(): Promise<Quiz[]> {
    const params: DocumentClient.ScanInput = {
      TableName: this.tableName,
    };

    const result = await this.documentClient.scan(params).promise();
    return result.Items as Quiz[];
  }

  async saveAnswers(command: SubmitAnswersCommand): Promise<void> {
    const { quizId, roundNumber, playerName, answers = [] } = command;
    const savedQuiz = await this.get(quizId);

    const playerAnswers = this.prepareAnswerSheet(
      roundNumber,
      savedQuiz.answers[playerName]
    );
    playerAnswers[roundNumber] = answers.map((answer) => ({ answer }));

    await this.documentClient
      .update({
        TableName: this.tableName,
        Key: { quizId },
        UpdateExpression: `SET answers.#playerName = :playerAnswers`,
        ExpressionAttributeNames: {
          '#playerName': playerName,
        },
        ExpressionAttributeValues: {
          ':playerAnswers': playerAnswers,
        },
      })
      .promise();
  }

  async saveMarks(command: SubmitMarksCommand): Promise<void> {
    const { quizId, roundNumber, playerName, marks = [] } = command;
    const savedQuiz = await this.get(quizId);

    const playerAnswers = this.prepareAnswerSheet(
      roundNumber,
      savedQuiz.answers[playerName]
    );

    playerAnswers[roundNumber] = playerAnswers[roundNumber].map(
      ({ answer }, index) => ({
        answer,
        mark: marks[index],
      })
    );

    await this.documentClient
      .update({
        TableName: this.tableName,
        Key: { quizId },
        UpdateExpression: `SET answers.#playerName = :playerAnswers`,
        ExpressionAttributeNames: {
          '#playerName': playerName,
        },
        ExpressionAttributeValues: {
          ':playerAnswers': playerAnswers,
        },
      })
      .promise();
  }

  private prepareAnswerSheet(
    roundNumber: number,
    savedAnswers: Answer[][]
  ): Answer[][] {
    const updatedAnswers: Answer[][] = Array(roundNumber + 1).fill([]);
    if (savedAnswers) {
      savedAnswers.forEach((round, index) => {
        updatedAnswers[index] = round;
      });
    }
    return updatedAnswers;
  }
}
