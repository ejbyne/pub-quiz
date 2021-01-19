import React, { useContext } from "react";
import { QuizContext } from "@pub-quiz/shared/src/context/quizContext";

import DogWithDrinkImage from "../assets/images/dog-with-drink.svg";

export const WaitingToStart: React.FC<{}> = () => {
  const [quiz] = useContext(QuizContext);

  return (
    <section className="w-full lg:w-1/2 px-4 py-8 flex flex-col justify-center items-stretch bg-indigo-900 lg:shadow-2xl lg:rounded-lg relative">
      <h1 className="text-gray-200 text-2xl font-medium text-center mb-4">
        Waiting in lobby
      </h1>
      <h2 className="text-lg text-center mb-4">
        Quiz: {quiz.quizName}
      </h2>
      <p className="text-center mb-4">
        Please wait for your host to start the quiz
      </p>
      <img
        src={DogWithDrinkImage}
        alt="Dog with drink"
        className="w-20 mb-2 self-center animate-pulse"
      />
    </section>
  );
};
