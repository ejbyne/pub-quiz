import * as cdk from '@aws-cdk/core';
import {
  FieldLogLevel,
  GraphQLApi,
  MappingTemplate,
  PrimaryKey,
  Values,
} from '@aws-cdk/aws-appsync';
import * as Path from 'path';
import { BillingMode, Table, AttributeType } from '@aws-cdk/aws-dynamodb';

export class PubQuizBackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new GraphQLApi(this, 'Api', {
      name: 'pub-quiz-api',
      logConfig: {
        fieldLogLevel: FieldLogLevel.ALL,
      },
      schemaDefinitionFile: Path.join(__dirname, './schema.graphql'),
    });

    const quizTable = new Table(this, 'QuizTable', {
      billingMode: BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: 'id',
        type: AttributeType.STRING,
      },
    });

    const customerDS = api.addDynamoDbDataSource(
      'Quiz',
      'The quiz data source',
      quizTable
    );

    customerDS.createResolver({
      typeName: 'Mutation',
      fieldName: 'saveQuiz',
      requestMappingTemplate: MappingTemplate.dynamoDbPutItem(
        PrimaryKey.partition('id').auto(),
        Values.projecting('input')
      ),
      responseMappingTemplate: MappingTemplate.fromString('true'),
    });
  }
}
