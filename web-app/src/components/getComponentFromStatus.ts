import React from 'react';
import { Registration } from './Registration';
import { WaitingToStart } from './WaitingToStart';
import { RoundStarted } from './RoundStarted';
import { QuestionAsked } from './QuestionAsked';
import { RoundFinished } from './RoundFinished';
import { QuizFinished } from './QuizFinished';
import { QuizStatus } from '../shared/graphql/types';

export const getComponentFromStatus = (status?: QuizStatus): React.FC => {
  switch (status) {
    case QuizStatus.QuizNotYetStarted:
      return WaitingToStart;
    case QuizStatus.RoundStarted:
      return RoundStarted;
    case QuizStatus.QuestionAsked:
      return QuestionAsked;
    case QuizStatus.RoundFinished:
      return RoundFinished;
    case QuizStatus.QuizFinished:
      return QuizFinished;
    default:
      return Registration;
  }
};
