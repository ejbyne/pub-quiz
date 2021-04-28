import { Route, Switch } from 'react-router-dom';
import { Admin } from './Admin';
import { App } from './App';
import React from 'react';
import { NewQuiz } from './NewQuiz';
import { AuthenticatedRoute } from './AuthenticatedRoute';
import { Login } from './Login';

export const Routes = () => (
  <Switch>
    <AuthenticatedRoute path="/my-quizzes">
      <Admin />
    </AuthenticatedRoute>
    <AuthenticatedRoute path="/new-quiz">
      <NewQuiz />
    </AuthenticatedRoute>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/">
      <App />
    </Route>
  </Switch>
);
