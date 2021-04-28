import React from 'react';
import { useLoadQuizSummary } from '@pub-quiz/shared/src/hooks/useLoadQuizSummary';
import { useSubscribeToQuizUpdates } from '@pub-quiz/shared/src/hooks/useSubscribeToQuizUpdates';

import { useCurrentStep } from '../hooks/useCurrentStep';
import { Layout } from './Layout';

export const App: React.FC = () => {
  useLoadQuizSummary();
  useSubscribeToQuizUpdates();
  const CurrentStep = useCurrentStep();

  return (
    <Layout>
      <CurrentStep />
    </Layout>
  );
};
