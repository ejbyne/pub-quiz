import * as cdk from '@aws-cdk/core';
import {
  FieldLogLevel,
  GraphQLApi,
  MappingTemplate,
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
        name: 'quizId',
        type: AttributeType.STRING,
      },
    });

    const saveQuizLambda = new NodejsFunction(this, 'SaveQuizLambda', {
      functionName: 'save-quiz-resolver',
      entry: Path.join(__dirname, '../lambdas/saveQuiz.ts'),
      handler: 'saveQuiz',
      minify: true,
      runtime: Runtime.NODEJS_12_X,
      environment: {
        QUIZ_TABLE_NAME: quizTable.tableName,
      },
    });

    const joinQuizLambda = new NodejsFunction(this, 'JoinQuizLambda', {
      functionName: 'join-quiz-resolver',
      entry: Path.join(__dirname, '../lambdas/joinQuiz.ts'),
      handler: 'joinQuiz',
      minify: true,
      runtime: Runtime.NODEJS_12_X,
      environment: {
        QUIZ_TABLE_NAME: quizTable.tableName,
      },
    });

    const nextQuizStateLambda = new NodejsFunction(this, 'NextQuizStateLamba', {
      functionName: 'next-quiz-state-resolver',
      entry: Path.join(__dirname, '../lambdas/nextQuizState.ts'),
      handler: 'nextQuizState',
      minify: true,
      runtime: Runtime.NODEJS_12_X,
      environment: {
        QUIZ_TABLE_NAME: quizTable.tableName,
      },
    });

    const quizSummaryLambda = new NodejsFunction(this, 'QuizSummaryLambda', {
      functionName: 'quiz-summary-resolver',
      entry: Path.join(__dirname, '../lambdas/quizSummary.ts'),
      handler: 'quizSummary',
      minify: true,
      runtime: Runtime.NODEJS_12_X,
      environment: {
        QUIZ_TABLE_NAME: quizTable.tableName,
      },
    });

    quizTable.grantReadWriteData(saveQuizLambda);
    quizTable.grantReadWriteData(joinQuizLambda);
    quizTable.grantReadWriteData(nextQuizStateLambda);
    quizTable.grantReadWriteData(quizSummaryLambda);

    const saveQuizLambdaDataSource = api.addLambdaDataSource(
      'SaveQuizLambda',
      'Save Quiz Lambda DataSource',
      saveQuizLambda
    );

    const joinQuizLambdaDataSource = api.addLambdaDataSource(
      'JoinQuizLambda',
      'Join Quiz Lambda DataSource',
      joinQuizLambda
    );

    const nextQuizStateLambdaDataSource = api.addLambdaDataSource(
      'NextQuizStateLambda',
      'Next Quiz State Lambda DataSource',
      nextQuizStateLambda
    );

    const quizSummaryLambdaDataSource = api.addLambdaDataSource(
      'QuizSummaryLambda',
      'Quiz Summary Lambda DataSource',
      quizSummaryLambda
    );

    saveQuizLambdaDataSource.createResolver({
      typeName: 'Mutation',
      fieldName: 'saveQuiz',
      requestMappingTemplate: MappingTemplate.lambdaRequest(),
      responseMappingTemplate: MappingTemplate.lambdaResult(),
    });

    joinQuizLambdaDataSource.createResolver({
      typeName: 'Mutation',
      fieldName: 'joinQuiz',
      requestMappingTemplate: MappingTemplate.lambdaRequest(),
      responseMappingTemplate: MappingTemplate.lambdaResult(),
    });

    nextQuizStateLambdaDataSource.createResolver({
      typeName: 'Mutation',
      fieldName: 'nextQuizState',
      requestMappingTemplate: MappingTemplate.lambdaRequest(),
      responseMappingTemplate: MappingTemplate.lambdaResult(),
    });

    quizSummaryLambdaDataSource.createResolver({
      typeName: 'Query',
      fieldName: 'quizSummary',
      requestMappingTemplate: MappingTemplate.lambdaRequest(),
      responseMappingTemplate: MappingTemplate.lambdaResult(),
    });
  }
}
