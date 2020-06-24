import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { QuizState } from '../domain/types';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';
import { Quiz } from '../domain/Quiz';

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

    return Item as Quiz;
  }

  async save(quiz: Quiz): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: {
        ...quiz,
        playerNames: quiz.playerNames?.length
          ? this.documentClient.createSet(quiz.playerNames)
          : undefined,
      },
    };

    await this.documentClient.put(params).promise();
  }

  async addPlayerName(quizId: string, newPlayerName: string): Promise<void> {
    const savedQuiz = await this.get(quizId);

    const playerNames = savedQuiz.playerNames?.values as string[] | undefined;

    if (playerNames?.includes(newPlayerName)) {
      throw new Error('Player name already exists');
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
          ':state': state,
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
}
