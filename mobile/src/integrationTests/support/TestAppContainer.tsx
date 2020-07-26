import ApolloClient from 'apollo-client';
import { Quiz, quizReducer } from '../../domain/quizReducer';
import { useReducer, Reducer } from 'react';
import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { QuizContext } from '../../quizContext';

export const TestAppContainer: React.FC<{
  client: ApolloClient<any>;
  initialState?: Partial<Quiz>;
}> = ({ client, initialState = {}, children }) => {
  const [quiz, updateQuiz] = useReducer<Reducer<Partial<Quiz>, Partial<Quiz>>>(
    quizReducer,
    initialState,
  );

  return (
    <ApolloProvider client={client}>
      <QuizContext.Provider value={[quiz, updateQuiz]}>
        {children}
      </QuizContext.Provider>
    </ApolloProvider>
  );
};
