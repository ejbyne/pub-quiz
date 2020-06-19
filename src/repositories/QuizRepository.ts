import { DynamoDB } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Quiz } from '../domain/types';

export class QuizRepository {
  private documentClient: DynamoDB.DocumentClient;

  private tableName: string;

  constructor(tableName: string) {
    this.documentClient = new DynamoDB.DocumentClient({
      apiVersion: '2012-10-08',
    });
    this.tableName = tableName;
  }

  async save(quiz: Quiz): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: quiz,
    };

    await this.documentClient.put(params).promise();
  }

  async getAll(): Promise<Quiz[]> {
    const params: DocumentClient.ScanInput = {
      TableName: this.tableName,
    };

    const result = await this.documentClient.scan(params).promise();
    return result.Items as Quiz[];
  }
}
