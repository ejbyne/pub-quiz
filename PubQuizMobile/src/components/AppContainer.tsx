import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from '../apolloClient';
import { App } from './App';

export const AppContainer: React.FC = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
