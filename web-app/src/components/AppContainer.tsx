import React, { useReducer, Reducer } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { App } from './App';
import { Quiz, QuizAction } from '../shared/domain/types';
import { quizReducer } from '../shared/domain/quizReducer';
import { QuizContext } from '../shared/context/quizContext';
import { client } from '../shared/graphql/apolloClient';

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
