import React, { createContext, Dispatch, useReducer, Reducer } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from '../graphql/apolloClient';
import { App } from './App';
import { quizReducer } from '../domain/quizReducer';
import { QuizContext } from '../quizContext';
import { Quiz, QuizAction } from '../domain/types';

export const AppContainer: React.FC = () => {
  const [quiz, updateQuiz] = useReducer<Reducer<Quiz, QuizAction>>(
    quizReducer,
    { rounds: [] },
  );
  
  return (
    <ApolloProvider client={client}>
      <QuizContext.Provider value={[quiz, updateQuiz]}>
        <App />
      </QuizContext.Provider>
    </ApolloProvider>
  );
};
