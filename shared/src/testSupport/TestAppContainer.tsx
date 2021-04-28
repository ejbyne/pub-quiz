import React, { useReducer, Reducer, Dispatch } from 'react';
import { ApolloProvider, ApolloClient } from '@apollo/react-hooks';
import { NextQuizState, Quiz, QuizAction } from '../domain/quizTypes';
import { AnswerSheet, AnswerSheetAction } from '../domain/answerSheetTypes';
import { quizReducer } from '../domain/quizReducer';
import { QuizContext } from '../context/quizContext';
import { AnswerSheetContext } from '../context/answerSheetContext';
import { answerSheetReducer } from '../domain/answerSheetReducer';

jest.mock('../hooks/useIsAuthenticated', () => ({
  useIsAuthenticated: () => true,
}));

let mockUpdateQuiz: Dispatch<QuizAction>;

export const receiveNextQuizState = (payload: NextQuizState) =>
  mockUpdateQuiz({
    type: 'NextQuizStateReceived',
    payload,
  });

export const TestAppContainer: React.FC<{
  client: ApolloClient<any>;
  initialQuizState?: Quiz;
  initialAnswerSheetState?: AnswerSheet;
}> = ({
  client,
  initialQuizState = { rounds: [] },
  initialAnswerSheetState = { playerName: 'Ed', rounds: [] },
  children,
}) => {
  const [quiz, updateQuiz] = useReducer<Reducer<Quiz, QuizAction>>(
    quizReducer,
    initialQuizState,
  );
  mockUpdateQuiz = updateQuiz;

  const [answerSheet, updateAnswerSheet] = useReducer<
    Reducer<AnswerSheet, AnswerSheetAction>
  >(answerSheetReducer, initialAnswerSheetState);

  return (
    <ApolloProvider client={client as any}>
      <QuizContext.Provider value={[quiz, updateQuiz]}>
        <AnswerSheetContext.Provider value={[answerSheet, updateAnswerSheet]}>
          {children}
        </AnswerSheetContext.Provider>
      </QuizContext.Provider>
    </ApolloProvider>
  );
};
