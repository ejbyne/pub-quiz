import React, { useContext } from 'react';
import { QuizContext } from '@pub-quiz/shared/src/context/quizContext';
import {
  useQuizStateSubscription,
  useQuizSummaryQuery,
} from '@pub-quiz/shared/src/graphql/types';
import { getComponentFromStatus } from './getComponentFromStatus';

import BeerDarkImage from '../assets/images/beer-dark.svg';

export const App: React.FC = () => {
  const [quiz, updateQuiz] = useContext(QuizContext);

  const CurrentStep = getComponentFromStatus(quiz?.state?.status);

  useQuizSummaryQuery({
    variables: {
      quizId: quiz?.quizId as any,
    },
    onCompleted: (data) => {
      const quizSummary = data?.quizSummary;
      if (quizSummary) {
        updateQuiz({ type: 'QuizSummaryReceived', payload: quizSummary });
      }
    },
    skip: !quiz.quizId,
  });

  useQuizStateSubscription({
    variables: { quizId: quiz?.quizId as string },
    onSubscriptionData: (data: any) => {
      const nextQuizState = data?.subscriptionData?.data?.nextQuizState;
      if (nextQuizState) {
        updateQuiz({ type: 'NextQuizStateReceived', payload: nextQuizState });
      }
    },
    skip: !quiz.quizId,
  });

  return (
    <div className="w-screen h-screen p-2 flex flex-col bg-gray-800 pub-wallpaper text-gray-200">
      <header className="mb-2 w-full p-2 bg-white rounded flex items-center">
        <img src={BeerDarkImage} alt="Two pints of beer" className="w-16" />
        <h1 className="ml-2 uppercase text-2xl text-center font-serif select-none text-indigo-900">
          The Online Pub Quiz
        </h1>
      </header>
      <div className="w-full min-h-0 flex-grow flex flex-col justify-center items-center">
        <CurrentStep />
      </div>
    </div>
  );
};
