import React, { useContext } from 'react';
import { QuizContext } from '@pub-quiz/shared/src/context/quizContext';
import { QuizStatus } from '@pub-quiz/shared/src/graphql/types';
import { WaitingToStart } from '../components/WaitingToStart';
import { AnswerSheet } from '../components/AnswerSheet';
import { MarkSheet } from '../components/MarkSheet';
import { Registration } from '../components/Registration';

export const useCurrentStep = () => {
  const [quiz] = useContext(QuizContext);
  return getComponentFromStatus(quiz?.state?.status);
};

const getComponentFromStatus = (status?: QuizStatus): React.FC => {
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
