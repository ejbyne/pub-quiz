import * as cdk from '@aws-cdk/core';
import * as Path from 'path';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import { Runtime } from '@aws-cdk/aws-lambda';
import { Table } from '@aws-cdk/aws-dynamodb';
import { MappingTemplate, GraphqlApi } from '@aws-cdk/aws-appsync';

export const createLambdaResolvers = (
  scope: cdk.Construct,
  quizTable: Table,
  api: GraphqlApi
): void => {
  // Lambdas
  const generateRandomQuizLambda = new NodejsFunction(
    scope,
    'GenerateRandomQuizLambda',
    {
      functionName: 'generate-random-quiz-resolver',
      entry: Path.join(__dirname, '../lambdas/generateRandomQuiz.ts'),
      handler: 'generateRandomQuiz',
      runtime: Runtime.NODEJS_12_X,
      environment: {
        QUIZ_TABLE_NAME: quizTable.tableName,
      },
    }
  );

  const saveQuizLambda = new NodejsFunction(scope, 'SaveQuizLambda', {
    functionName: 'save-quiz-resolver',
    entry: Path.join(__dirname, '../lambdas/saveQuiz.ts'),
    handler: 'saveQuiz',
    runtime: Runtime.NODEJS_12_X,
    environment: {
      QUIZ_TABLE_NAME: quizTable.tableName,
    },
  });

  const joinQuizLambda = new NodejsFunction(scope, 'JoinQuizLambda', {
    functionName: 'join-quiz-resolver',
    entry: Path.join(__dirname, '../lambdas/joinQuiz.ts'),
    handler: 'joinQuiz',
    runtime: Runtime.NODEJS_12_X,
    environment: {
      QUIZ_TABLE_NAME: quizTable.tableName,
    },
  });

  const nextQuizStateLambda = new NodejsFunction(scope, 'NextQuizStateLamba', {
    functionName: 'next-quiz-state-resolver',
    entry: Path.join(__dirname, '../lambdas/nextQuizState.ts'),
    handler: 'nextQuizState',
    runtime: Runtime.NODEJS_12_X,
    environment: {
      QUIZ_TABLE_NAME: quizTable.tableName,
    },
  });

  const quizSummaryLambda = new NodejsFunction(scope, 'QuizSummaryLambda', {
    functionName: 'quiz-summary-resolver',
    entry: Path.join(__dirname, '../lambdas/quizSummary.ts'),
    handler: 'quizSummary',
    runtime: Runtime.NODEJS_12_X,
    environment: {
      QUIZ_TABLE_NAME: quizTable.tableName,
    },
  });

  const submitAnswersLambda = new NodejsFunction(scope, 'SubmitAnswersLambda', {
    functionName: 'submit-answers-resolver',
    entry: Path.join(__dirname, '../lambdas/submitAnswers.ts'),
    handler: 'submitAnswers',
    runtime: Runtime.NODEJS_12_X,
    environment: {
      QUIZ_TABLE_NAME: quizTable.tableName,
    },
  });

  // Rights
  quizTable.grantReadWriteData(generateRandomQuizLambda);
  quizTable.grantReadWriteData(saveQuizLambda);
  quizTable.grantReadWriteData(joinQuizLambda);
  quizTable.grantReadWriteData(nextQuizStateLambda);
  quizTable.grantReadData(quizSummaryLambda);
  quizTable.grantReadWriteData(submitAnswersLambda);

  // Data sources
  const generateRandomQuizLambdaDataSource = api.addLambdaDataSource(
    'GenerateRandomQuizLambda',
    generateRandomQuizLambda
  );

  const saveQuizLambdaDataSource = api.addLambdaDataSource(
    'SaveQuizLambda',
    saveQuizLambda
  );

  const joinQuizLambdaDataSource = api.addLambdaDataSource(
    'JoinQuizLambda',
    joinQuizLambda
  );

  const nextQuizStateLambdaDataSource = api.addLambdaDataSource(
    'NextQuizStateLambda',
    nextQuizStateLambda
  );

  const quizSummaryLambdaDataSource = api.addLambdaDataSource(
    'QuizSummaryLambda',
    quizSummaryLambda
  );

  const submitAnswersLambdaDataSource = api.addLambdaDataSource(
    'SubmitAnswersLambda',
    submitAnswersLambda
  );

  // Resolvers
  generateRandomQuizLambdaDataSource.createResolver({
    typeName: 'Mutation',
    fieldName: 'generateRandomQuiz',
    requestMappingTemplate: MappingTemplate.lambdaRequest(),
    responseMappingTemplate: MappingTemplate.lambdaResult(),
  });

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

  submitAnswersLambdaDataSource.createResolver({
    typeName: 'Mutation',
    fieldName: 'submitAnswers',
    requestMappingTemplate: MappingTemplate.lambdaRequest(),
    responseMappingTemplate: MappingTemplate.lambdaResult(),
  });
};
