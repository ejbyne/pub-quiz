import React from 'react';
import { Registration } from './Registration';
import { WaitingToStart } from './WaitingToStart';
import { AnswerSheet } from './AnswerSheet';
import { MarkSheet } from './MarkSheet';
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
    case QuizStatus.RoundMarked:
    case QuizStatus.QuizFinished:
      return MarkSheet;
    default:
      return Registration;
  }
};
