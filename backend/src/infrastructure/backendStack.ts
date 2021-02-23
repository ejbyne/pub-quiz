import * as cdk from '@aws-cdk/core';
import { FieldLogLevel, GraphqlApi, Schema } from '@aws-cdk/aws-appsync';
import { BillingMode, Table, AttributeType } from '@aws-cdk/aws-dynamodb';
import { createLambdaResolvers } from './createLambdaResolvers';
import { CfnOutput } from '@aws-cdk/core';

export class PubQuizBackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new GraphqlApi(this, 'Api', {
      name: 'pub-quiz-api',
      logConfig: {
        fieldLogLevel: FieldLogLevel.ALL,
      },
      schema: Schema.fromAsset(
        require.resolve('../../../shared/src/graphql/schema.graphql')
      ),
    });

    const quizTable = new Table(this, 'QuizTable', {
      billingMode: BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: 'quizId',
        type: AttributeType.STRING,
      },
    });

    createLambdaResolvers(this, quizTable, api);

    new CfnOutput(this, 'graphQlUrl', {
      value: api.graphqlUrl,
    });
  }
}
