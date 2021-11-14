# Pub quiz backend

The serverless backend was built using AWS AppSync, Lambda, DynamoDB and Cognito.

This package contains the CDK code to provision the infrastructure and also the source
code for the lambdas used by the GraphQL API.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
