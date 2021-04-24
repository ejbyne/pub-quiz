import { Route, Switch } from 'react-router-dom';
import { Admin } from './Admin';
import { App } from './App';
import React from 'react';
import { withAuth } from './withAuth';
import { NewQuiz } from './NewQuiz';

const AdminWithAuth = withAuth(Admin);
const NewQuizWithAuth = withAuth(NewQuiz);

export const Routes = () => (
  <Switch>
    <Route path="/my-quizzes">
      <AdminWithAuth />
    </Route>
    <Route path="/new-quiz">
      <NewQuizWithAuth />
    </Route>
    <Route path="/">
      <App />
    </Route>
  </Switch>
);
