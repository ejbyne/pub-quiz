import React, { useReducer, Reducer } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { App } from "./App";
import { Quiz, QuizAction } from "../shared/domain/types";
import { quizReducer } from "../shared/domain/quizReducer";
import { QuizContext } from "../shared/context/quizContext";
import { client } from "../shared/graphql/apolloClient";
import { Admin } from "./Admin";

export const AppContainer: React.FC = () => {
  const [quiz, updateQuiz] = useReducer<Reducer<Quiz, QuizAction>>(
    quizReducer,
    { rounds: [] }
  );

  return (
    <ApolloProvider client={client}>
      <QuizContext.Provider value={[quiz, updateQuiz]}>
        <Router>
          <Switch>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/">
              <App />
            </Route>
          </Switch>
        </Router>
      </QuizContext.Provider>
    </ApolloProvider>
  );
};
