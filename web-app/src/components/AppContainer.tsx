import React, { useReducer, Reducer } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { App } from "./App";
import { Quiz, QuizAction } from "@pub-quiz/shared/src/domain/quizTypes";
import { AnswerSheet, AnswerSheetAction } from '@pub-quiz/shared/src/domain/answerSheetTypes';
import { quizReducer } from "@pub-quiz/shared/src/domain/quizReducer";
import { QuizContext } from "@pub-quiz/shared/src/context/quizContext";
import { AnswerSheetContext } from "@pub-quiz/shared/src/context/answerSheetContext";
import { answerSheetReducer } from '@pub-quiz/shared/src/domain/answerSheetReducer';
import { client } from "@pub-quiz/shared/src/graphql/apolloClient";
import { Admin } from "./Admin";

import '../styles/base.css';

export const AppContainer: React.FC = () => {
  const [quiz, updateQuiz] = useReducer<Reducer<Quiz, QuizAction>>(
    quizReducer,
    { rounds: [] }
  );

  const [answerSheet, updateAnswerSheet] = useReducer<Reducer<AnswerSheet, AnswerSheetAction>>(
    answerSheetReducer,
    { rounds: [] }
  );

  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <QuizContext.Provider value={[quiz, updateQuiz]}>
          <AnswerSheetContext.Provider value={[answerSheet, updateAnswerSheet]}>
            <Switch>
              <Route path="/admin">
                <Admin />
              </Route>
              <Route path="/">
                <App />
              </Route>
            </Switch>
          </AnswerSheetContext.Provider>
        </QuizContext.Provider>
      </ApolloProvider>
    </BrowserRouter>
  );
};
