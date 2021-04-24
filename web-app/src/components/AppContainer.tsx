import React, { useReducer, Reducer } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter } from 'react-router-dom';
import { Quiz, QuizAction } from '@pub-quiz/shared/src/domain/quizTypes';
import {
  AnswerSheet,
  AnswerSheetAction,
} from '@pub-quiz/shared/src/domain/answerSheetTypes';
import { quizReducer } from '@pub-quiz/shared/src/domain/quizReducer';
import { QuizContext } from '@pub-quiz/shared/src/context/quizContext';
import { AnswerSheetContext } from '@pub-quiz/shared/src/context/answerSheetContext';
import { answerSheetReducer } from '@pub-quiz/shared/src/domain/answerSheetReducer';
import { client } from '@pub-quiz/shared/src/graphql/apolloClient';

import '../styles/base.css';
import { Routes } from './Routes';

export const AppContainer: React.FC = () => {
  const [quiz, updateQuiz] = useReducer<Reducer<Quiz, QuizAction>>(
    quizReducer,
    { rounds: [] },
  );

  const [answerSheet, updateAnswerSheet] = useReducer<
    Reducer<AnswerSheet, AnswerSheetAction>
  >(answerSheetReducer, { rounds: [] });

  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <QuizContext.Provider value={[quiz, updateQuiz]}>
          <AnswerSheetContext.Provider value={[answerSheet, updateAnswerSheet]}>
            <Routes />
          </AnswerSheetContext.Provider>
        </QuizContext.Provider>
      </ApolloProvider>
    </BrowserRouter>
  );
};
