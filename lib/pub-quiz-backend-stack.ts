import * as cdk from '@aws-cdk/core';
import { FieldLogLevel, GraphQLApi } from '@aws-cdk/aws-appsync';
import * as Path from 'path';

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

    api.addNoneDataSource('None', 'Dummy data source');
  }
}
