import React, { useReducer, Reducer } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { App } from "./App";
import { Quiz, QuizAction } from "@pub-quiz/shared/src/domain/types";
import { quizReducer } from "@pub-quiz/shared/src/domain/quizReducer";
import { QuizContext } from "@pub-quiz/shared/src/context/quizContext";
import { client } from "@pub-quiz/shared/src/graphql/apolloClient";
import { Admin } from "./Admin";

import '../styles/base.css';

export const AppContainer: React.FC = () => {
  const [quiz, updateQuiz] = useReducer<Reducer<Quiz, QuizAction>>(
    quizReducer,
    { rounds: [] }
  );

  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <QuizContext.Provider value={[quiz, updateQuiz]}>
            <Switch>
              <Route path="/admin">
                <Admin />
              </Route>
              <Route path="/">
                <App />
              </Route>
            </Switch>
        </QuizContext.Provider>
      </ApolloProvider>
    </BrowserRouter>
  );
};
