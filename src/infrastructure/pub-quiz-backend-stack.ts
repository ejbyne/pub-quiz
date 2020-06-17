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
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import { Runtime } from '@aws-cdk/aws-lambda';

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

    const quizDatabaseDataSource = api.addDynamoDbDataSource(
      'QuizTable',
      'Quiz Table DataSource',
      quizTable
    );

    quizDatabaseDataSource.createResolver({
      typeName: 'Mutation',
      fieldName: 'saveQuiz',
      requestMappingTemplate: MappingTemplate.dynamoDbPutItem(
        PrimaryKey.partition('id').auto(),
        Values.projecting('input')
      ),
      responseMappingTemplate: MappingTemplate.fromString('true'),
    });

    const joinQuizLambda = new NodejsFunction(this, 'JoinQuizLambda', {
      functionName: 'join-quiz-resolver',
      entry: Path.join(__dirname, '../lambdas/joinQuiz.ts'),
      handler: 'handler',
      minify: true,
      runtime: Runtime.NODEJS_12_X,
      environment: {
        QUIZ_TABLE_NAME: quizTable.tableName,
      },
    });

    quizTable.grantReadData(joinQuizLambda);

    const joinQuizLambdaDataSource = api.addLambdaDataSource(
      'JoinQuizLambda',
      'Join Quiz Lambda DataSource',
      joinQuizLambda
    );

    joinQuizLambdaDataSource.createResolver({
      typeName: 'Mutation',
      fieldName: 'joinQuiz',
      requestMappingTemplate: MappingTemplate.lambdaRequest(),
      responseMappingTemplate: MappingTemplate.lambdaResult(),
    });
  }
}
