export const awsConfig = {
  region: 'eu-central-1',
  apiKey: process.env.REACT_APP_GRAPHQL_API_KEY!,
  graphQlUrl: process.env.REACT_APP_GRAPHQL_API_URL!,
  userPoolId: process.env.REACT_APP_USER_POOL_ID!,
  userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID!,
};
