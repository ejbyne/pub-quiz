import React, { useState } from "react";
import {
  useGenerateRandomQuizMutation,
  useNextQuizStateMutation,
} from "@pub-quiz/shared/src/graphql/types";

export const Admin: React.FC = () => {
  const [quizName, setQuizName] = useState<string>("");
  const [quizId, setQuizId] = useState<string>("");

  const [generateQuiz, { called, error }] = useGenerateRandomQuizMutation({
    variables: {
      input: {
        quizName,
      },
    },
    onCompleted: (data) => setQuizId(data.generateRandomQuiz.quizId),
  });

  const generateQuizError = error?.graphQLErrors?.[0];

  const [nextState] = useNextQuizStateMutation({
    variables: {
      input: {
        quizId,
      },
    },
  });

  return (
    <div>
      <h1>Admin</h1>
      <section>
        <form>
          <h2>Generate random quiz</h2>
          <input
            value={quizName}
            placeholder="Quiz name"
            onChange={(e) => setQuizName(e.currentTarget.value)}
          />
          <input
            value={quizId}
            placeholder="Quiz ID"
            onChange={(e) => setQuizId(e.currentTarget.value)}
          />
          <button disabled={called && !error} onClick={() => generateQuiz()}>
            Generate quiz
          </button>
          {generateQuizError ? <p>{generateQuizError.message}</p> : null}
        </form>
      </section>
      <section>
        <h2>Current quiz</h2>
        <h3>Name: {quizName}</h3>
        <h3>ID: {quizId}</h3>
        <button onClick={() => nextState()}>Next state</button>
      </section>
    </div>
  );
};
