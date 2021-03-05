import React from 'react';
import { Registration } from './Registration';
import { WaitingToStart } from './WaitingToStart';
import { AnswerSheet } from './AnswerSheet';
import { QuizFinished } from './QuizFinished';
import { QuizStatus } from '@pub-quiz/shared/src/graphql/types';

export const getComponentFromStatus = (status?: QuizStatus): React.FC => {
  switch (status) {
    case QuizStatus.QuizNotYetStarted:
      return WaitingToStart;
    case QuizStatus.RoundStarted:
    case QuizStatus.QuestionAsked:
    case QuizStatus.RoundFinished:
    case QuizStatus.QuestionAnswered:
      return AnswerSheet;
    case QuizStatus.QuizFinished:
      return QuizFinished;
    default:
      return Registration;
  }
};
