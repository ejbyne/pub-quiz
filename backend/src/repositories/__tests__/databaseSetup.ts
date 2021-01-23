import { GenericContainer } from 'testcontainers';
import * as AWS from 'aws-sdk';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';

export const provisionDatabase = async (): Promise<{
  dynamoClientConfiguration: ServiceConfigurationOptions;
  tearDownDatabase: () => Promise<void>;
}> => {
  // See https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.UsageNotes.html
  const container = await new GenericContainer('amazon/dynamodb-local')
    .withCmd([
      '-Djava.library.path=./DynamoDBLocal_lib',
      '-jar',
      'DynamoDBLocal.jar',
      '-inMemory',
      '-sharedDb',
    ])
    .withExposedPorts(8000)
    .start();

  const endpoint = `http://${container.getContainerIpAddress()}:${container.getMappedPort(
    8000
  )}`;

  console.log('Started Dynamo DB test container', endpoint);

  const dynamoClientConfiguration: ServiceConfigurationOptions = {
    endpoint,
    region: 'localhost',
    accessKeyId: 'foo',
    secretAccessKey: 'bar',
  };

  const tearDownDatabase = async () => {
    await container.stop();
    console.log('Stopped Dynamo DB test container');
  };

  return {
    dynamoClientConfiguration,
    tearDownDatabase,
  };
};

export const createTable = async (
  name: string,
  pkName: string,
  dynamoClientConfiguration: ServiceConfigurationOptions
): Promise<void> => {
  const params = {
    TableName: name,
    KeySchema: [{ AttributeName: pkName, KeyType: 'HASH' }],
    AttributeDefinitions: [{ AttributeName: pkName, AttributeType: 'S' }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
  };

  const dynamoDbClient = new AWS.DynamoDB(dynamoClientConfiguration);
  await dynamoDbClient.createTable(params).promise();
};
