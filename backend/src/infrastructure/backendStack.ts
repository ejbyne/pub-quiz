import * as cdk from '@aws-cdk/core';
import { FieldLogLevel, GraphqlApi, Schema } from '@aws-cdk/aws-appsync';
import { BillingMode, Table, AttributeType } from '@aws-cdk/aws-dynamodb';
import { createLambdaResolvers } from './createLambdaResolvers';
import { CfnOutput } from '@aws-cdk/core';
import {
  UserPool,
  UserPoolClient,
  VerificationEmailStyle,
} from '@aws-cdk/aws-cognito';

export class PubQuizBackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // API

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

    // Cognito

    const userPool = new UserPool(this, 'UserPool', {
      userPoolName: 'pub-quiz-users',
      selfSignUpEnabled: true,
      userVerification: {
        emailSubject: 'The Online Pub Quiz - email verification',
        emailBody:
          'Thanks for signing up to the Online Pub Quiz! Your verification code is {####}.',
        emailStyle: VerificationEmailStyle.CODE,
      },
      signInAliases: { email: true },
      autoVerify: { email: true },
    });

    const userPoolClient = new UserPoolClient(this, 'UserPoolClient', {
      userPool,
      authFlows: {
        userSrp: true,
      },
    });

    // Outputs

    new CfnOutput(this, 'GraphQlUrl', {
      value: api.graphqlUrl,
    });

    new CfnOutput(this, 'UserPoolId', {
      value: userPool.userPoolId,
    });

    new CfnOutput(this, 'UserPoolClientId', {
      value: userPoolClient.userPoolClientId,
    });
  }
}
