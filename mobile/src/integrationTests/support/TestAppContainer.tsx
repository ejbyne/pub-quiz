import { Quiz, quizReducer, QuizAction } from '../../domain/quizReducer';
import { useReducer, Reducer } from 'react';
import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { QuizContext } from '../../quizContext';
import ApolloClient from 'apollo-client';

export const TestAppContainer: React.FC<{
  client: ApolloClient<any>;
  initialState?: Quiz;
}> = ({ client, initialState = { rounds: [] }, children }) => {
  const [quiz, updateQuiz] = useReducer<Reducer<Quiz, QuizAction>>(
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
