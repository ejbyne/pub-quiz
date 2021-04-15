import React, { useState } from 'react';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import {
  useGenerateRandomQuizMutation,
  useNextQuizStateMutation,
} from '@pub-quiz/shared/src/graphql/types';
import { Layout } from './Layout';
import { Quizzes } from './Quizzes';

export const Admin: React.FC = () => {
  const [quizName, setQuizName] = useState<string>('');
  const [quizId, setQuizId] = useState<string>('');

  const [
    generateQuiz,
    { called: generateQuizCalled, error: generateQuizErrors },
  ] = useGenerateRandomQuizMutation({
    variables: {
      input: {
        quizName,
      },
    },
    onCompleted: (data) => setQuizId(data.generateRandomQuiz.quizId),
  });

  const generateQuizError = generateQuizErrors?.graphQLErrors?.[0];

  const [nextState] = useNextQuizStateMutation({
    variables: {
      input: {
        quizId,
      },
    },
  });

  return (
    <Layout>
      <section className="w-full px-6 py-6 flex flex-col bg-indigo-900 lg:shadow-2xl lg:rounded-lg flex-grow text-gray-200 overflow-y-auto">
        <div className="flex">
          <h1>Admin</h1>
          <AmplifySignOut />
        </div>
        <Quizzes />
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
          <button
            disabled={generateQuizCalled && !generateQuizError}
            onClick={() => generateQuiz()}
          >
            Generate quiz
          </button>
          {generateQuizError ? <p>{generateQuizError.message}</p> : null}
        </form>
        <h2>Current quiz</h2>
        <h3>Name: {quizName}</h3>
        <h3>ID: {quizId}</h3>
        <button onClick={() => nextState()}>Next state</button>
      </section>
    </Layout>
  );
};
