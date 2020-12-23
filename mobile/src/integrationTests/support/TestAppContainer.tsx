import { useReducer, Reducer, Dispatch } from 'react';
import React from 'react';
import { ApolloProvider, ApolloClient } from '@apollo/react-hooks';
import { act } from '@testing-library/react-native';
import {
  NextQuizState,
  Quiz,
  QuizAction,
} from '../../../../web-app/src/shared/domain/types';
import { quizReducer } from '../../../../web-app/src/shared/domain/quizReducer';
import { QuizContext } from '../../../../web-app/src/shared/context/quizContext';

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
