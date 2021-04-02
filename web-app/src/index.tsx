import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from './components/AppContainer';
import reportWebVitals from './reportWebVitals';
import { Amplify } from 'aws-amplify';

Amplify.configure({
  region: 'eu-central-1',
  userPoolId: 'eu-central-1_52ylSW8GG',
  userPoolWebClientId: '2a2u96csdqrfjkhvdl2jeu3isg',
});

ReactDOM.render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
