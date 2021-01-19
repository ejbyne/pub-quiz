import React, { useContext } from 'react';
import { QuizContext } from '@pub-quiz/shared/src/context/quizContext';

import BeerImage from "../assets/images/beer.svg";
import DogWithDrinkImage from "../assets/images/dog-with-drink.svg";

export const WaitingToStart: React.FC<{}> = () => {
  const [quiz] = useContext(QuizContext);

  return (
    <section className="w-full lg:w-1/3 px-4 py-8 flex flex-col justify-center items-stretch bg-indigo-900 lg:shadow-2xl lg:rounded-lg relative">
      <h1 className="text-white uppercase text-2xl text-center font-serif select-none">
        The Online Pub Quiz
      </h1>
      <img src={BeerImage} alt="Two pints of beer" className="w-20 mb-2 self-center" />
      <h2 className="text-white text-xl font-medium text-center mb-2">Waiting in lobby</h2>
      <h3 className="text-white text-lg text-center mb-4">Quiz: {quiz.quizName}</h3>
      <p className="text-white text-center mb-4">Please wait for your host to start the quiz</p>
      <img src={DogWithDrinkImage} alt="Dog with drink" className="w-20 mb-2 self-center animate-pulse" />
    </section>
  );
};
