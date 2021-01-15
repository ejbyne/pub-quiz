import React, { useReducer, Reducer } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from '@pub-quiz/shared/src/graphql/apolloClient';
import { App } from './App';
import { quizReducer } from '@pub-quiz/shared/src/domain/quizReducer';
import { QuizContext } from '@pub-quiz/shared/src/context/quizContext';
import { Quiz, QuizAction } from '@pub-quiz/shared/src/domain/types';

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
