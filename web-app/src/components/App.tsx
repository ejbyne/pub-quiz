import React from 'react';
import { PlayersList } from './PlayersList';
import { useLoadQuizSummary } from '../hooks/useLoadQuizSummary';
import { useSubscribeToQuizUpdates } from '../hooks/useSubscribeToQuizUpdates';

import BeerDarkImage from '../assets/images/beer-dark.svg';
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
