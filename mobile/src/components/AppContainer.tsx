import React, { createContext, Dispatch, useReducer, Reducer } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from '../graphql/apolloClient';
import { App } from './App';
import { Quiz, quizReducer } from '../domain/quizReducer';
import { QuizContext } from '../quizContext';

export const AppContainer: React.FC = () => {
  const [quiz, updateQuiz] = useReducer<Reducer<Partial<Quiz>, Partial<Quiz>>>(
    quizReducer,
    {},
  );
  
  return (
    <ApolloProvider client={client}>
      <QuizContext.Provider value={[quiz, updateQuiz]}>
        <App />
      </QuizContext.Provider>
    </ApolloProvider>
  );
};
