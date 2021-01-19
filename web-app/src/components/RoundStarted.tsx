import React, { useContext } from "react";
import { QuizContext } from "@pub-quiz/shared/src/context/quizContext";
import { RoundStarted as RoundStartedState } from "@pub-quiz/shared/src/graphql/types";

import BeerDarkImage from "../assets/images/beer-dark.svg";

export const RoundStarted: React.FC<{}> = () => {
  const [quiz] = useContext(QuizContext);
  const state = quiz.state as RoundStartedState;
  const round = quiz.rounds[state.roundSummary.roundNumber];

  return (
    <section className="w-full lg:w-1/2 px-4 py-8 flex flex-col justify-center items-stretch bg-indigo-900 lg:shadow-2xl lg:rounded-lg relative">
      <h1 className="text-2xl text-center mb-4">
        Round {round.roundNumber + 1} started
      </h1>
      <h2 className="text-lg font-light text-center mb-4">{round.roundName}</h2>
      <p className="text-lg font-light text-center">
        {round.numberOfQuestions} questions
      </p>
    </section>
  );
};
