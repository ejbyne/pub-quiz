import * as cdk from '@aws-cdk/core';
import { CfnOutput, Duration, Expiration } from '@aws-cdk/core';
import {
  AuthorizationType,
  FieldLogLevel,
  GraphqlApi,
  Schema,
} from '@aws-cdk/aws-appsync';
import { AttributeType, BillingMode, Table } from '@aws-cdk/aws-dynamodb';
import {
  App,
  GitHubSourceCodeProvider,
  RedirectStatus,
} from '@aws-cdk/aws-amplify';
import { createLambdaResolvers } from './createLambdaResolvers';
import {
  UserPool,
  UserPoolClient,
  VerificationEmailStyle,
} from '@aws-cdk/aws-cognito';

export class PubQuizBackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

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

    // API

    const api = new GraphqlApi(this, 'Api', {
      name: 'pub-quiz-api',
      logConfig: {
        fieldLogLevel: FieldLogLevel.ALL,
      },
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: AuthorizationType.API_KEY,
          apiKeyConfig: {
            name: 'pub-quiz-public-api-key',
            expires: Expiration.after(Duration.days(365)),
          },
        },
        additionalAuthorizationModes: [
          {
            authorizationType: AuthorizationType.USER_POOL,
            userPoolConfig: {
              userPool,
            },
          },
        ],
      },
      schema: Schema.fromAsset(
        require.resolve('../../../shared/src/graphql/schema.graphql')
      ),
      xrayEnabled: true,
    });

    const quizTable = new Table(this, 'QuizTable', {
      billingMode: BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: 'quizId',
        type: AttributeType.STRING,
      },
    });

    createLambdaResolvers(this, quizTable, api);

    // Web app

    const githubOauthToken = cdk.SecretValue.secretsManager(
      'pub-quiz-secrets',
      {
        jsonField: 'github-oauth-token',
      }
    );

    const amplifyApp = new App(this, 'PubQuizWebApp', {
      sourceCodeProvider: new GitHubSourceCodeProvider({
        repository: 'pub-quiz',
        owner: 'ejbyne',
        oauthToken: githubOauthToken,
      }),
      customRules: [
        {
          source: '/api/<*>',
          target: `${api.graphqlUrl}/<*>`,
          status: RedirectStatus.REWRITE,
        },
        // careful, the redirect rule documented at https://docs.aws.amazon.com/amplify/latest/userguide/redirects.html does not work with filenames with more than 1 dot (foo.hash.ext)
        {
          source:
            '</^((?!.(css|gif|ico|jpg|js|json|png|txt|svg|woff|ttf|map)$).)*$/>',
          target: '/',
          status: RedirectStatus.REWRITE,
        },
      ],
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

    new CfnOutput(this, 'AmplifyUrl', {
      value: amplifyApp.defaultDomain,
    });
  }
}
