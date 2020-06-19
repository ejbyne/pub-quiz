import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Quiz } from '../domain/types';

export class QuizRepository {
  private documentClient: DocumentClient;

  private tableName: string;

  constructor(tableName: string) {
    this.documentClient = new DocumentClient({
      apiVersion: '2012-10-08',
    });
    this.tableName = tableName;
  }

  async save(quiz: Quiz): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: {
        ...quiz,
        playerNames: quiz.playerNames.length
          ? this.documentClient.createSet(quiz.playerNames)
          : undefined,
      },
    };

    await this.documentClient.put(params).promise();
  }

  async addPlayerName(quizId: string, newPlayerName: string): Promise<void> {
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

  async getAll(): Promise<Quiz[]> {
    const params: DocumentClient.ScanInput = {
      TableName: this.tableName,
    };

    const result = await this.documentClient.scan(params).promise();
    return result.Items as Quiz[];
  }
}
