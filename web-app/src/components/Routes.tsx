import { Route, Switch } from 'react-router-dom';
import { Admin } from './admin/Admin';
import { App } from './App';
import React from 'react';
import { NewQuiz } from './admin/NewQuiz';
import { AuthenticatedRoute } from './admin/AuthenticatedRoute';
import { Login } from './admin/Login';

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
