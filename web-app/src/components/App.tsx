import React from 'react';
import { PlayersList } from './PlayersList';
import { useLoadQuizSummary } from '../hooks/useLoadQuizSummary';
import { useSubscribeToQuizUpdates } from '../hooks/useSubscribeToQuizUpdates';

import BeerDarkImage from '../assets/images/beer-dark.svg';
import { useCurrentStep } from '../hooks/useCurrentStep';

export const App: React.FC = () => {
  useLoadQuizSummary();
  useSubscribeToQuizUpdates();
  const CurrentStep = useCurrentStep();

  return (
    <div className="w-screen h-screen p-2 flex flex-col bg-gray-800 pub-wallpaper text-gray-200">
      <header className="mb-2 w-full px-4 py-2 bg-white rounded flex flex-col lg:flex-row lg:justify-between">
        <div className="flex items-center">
          <img src={BeerDarkImage} alt="Two pints of beer" className="w-14" />
          <h1 className="ml-2 uppercase text-2xl text-center font-serif select-none text-indigo-900">
            The Online Pub Quiz
          </h1>
        </div>
        <PlayersList />
      </header>
      <div className="w-full min-h-0 flex-grow flex flex-col justify-center items-center">
        <CurrentStep />
      </div>
    </div>
  );
};
