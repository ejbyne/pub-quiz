import React, { useContext, useState } from "react";
import { QuizContext } from "@pub-quiz/shared/src/context/quizContext";
import { useJoinQuizMutation } from "@pub-quiz/shared/src/graphql/types";

import BeerImage from "../assets/images/beer.svg";

export const Registration: React.FC = () => {
  const [, updateQuiz] = useContext(QuizContext);
  const [playerName, setPlayerName] = useState<string>("");
  const [quizId, setQuizId] = useState<string>("");

  const [joinQuiz, { called, error }] = useJoinQuizMutation({
    variables: {
      input: {
        quizId,
        playerName,
      },
    },
  });
  const joinQuizError = error?.graphQLErrors?.[0];

  return (
    <section className="w-full lg:w-1/3 px-4 py-8 flex flex-col justify-center items-stretch bg-indigo-900 lg:shadow-2xl lg:rounded-lg relative">
      <h1 className="text-white uppercase text-2xl text-center font-serif select-none">
        The Online Pub Quiz
      </h1>
      <img src={BeerImage} alt="Two pints of beer" className="w-20 mb-2 self-center" />
      <input
        className="text-input"
        value={playerName}
        placeholder="Name"
        onChange={(e) => setPlayerName(e.currentTarget.value)}
      />
      <input
        className="text-input"
        value={quizId}
        placeholder="Quiz ID"
        onChange={(e) => setQuizId(e.currentTarget.value)}
      />
      <button
        className="button"
        disabled={!playerName || !quizId || (called && !error)}
        onClick={async () => {
          try {
            await joinQuiz();
            updateQuiz({ type: "JoinedQuiz", payload: { quizId } });
          } catch (error) {
            // Do nothing: we display error message below
          }
        }}
      >
        Join quiz
      </button>
      {joinQuizError ? <p className="text-red-500 text-sm text-center">{joinQuizError.message}</p> : null}
    </section>
  );
};
