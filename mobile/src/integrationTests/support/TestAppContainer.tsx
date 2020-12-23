import { useReducer, Reducer, Dispatch } from 'react';
import React from 'react';
import { ApolloProvider, ApolloClient } from '@apollo/react-hooks';
import { QuizContext } from '../../../../shared/context/quizContext';
import { act } from '@testing-library/react-native';
import { quizReducer } from '../../../../shared/domain/quizReducer';
import {
  QuizAction,
  NextQuizState,
  Quiz,
} from '../../../../shared/domain/types';

let mockUpdateQuiz: Dispatch<QuizAction>;

export const receiveNextQuizState = (payload: NextQuizState) =>
  act(() => {
    mockUpdateQuiz({
      type: 'NextQuizStateReceived',
      payload,
    });
  });

export const TestAppContainer: React.FC<{
  client: ApolloClient<any>;
  initialState?: Quiz;
}> = ({ client, initialState = { rounds: [] }, children }) => {
  const [quiz, updateQuiz] = useReducer<Reducer<Quiz, QuizAction>>(
    quizReducer,
    initialState,
  );

  mockUpdateQuiz = updateQuiz;

  return (
    <ApolloProvider client={client as any}>
      <QuizContext.Provider value={[quiz, updateQuiz]}>
        {children}
      </QuizContext.Provider>
    </ApolloProvider>
  );
};
