import React, { useReducer, Reducer } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from '../../../web-app/src/shared/graphql/apolloClient';
import { App } from './App';
import { quizReducer } from '../../../web-app/src/shared/domain/quizReducer';
import { QuizContext } from '../../../web-app/src/shared/context/quizContext';
import { Quiz, QuizAction } from '../../../web-app/src/shared/domain/types';

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
