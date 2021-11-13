import React, { useState } from 'react';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import { Link } from 'react-router-dom';
import { useNextQuizStateMutation } from '@pub-quiz/shared/src/graphql/types';
import { Layout } from '../Layout';
import { Quizzes } from './Quizzes';

export const Admin: React.FC = () => {
  const [quizId, setQuizId] = useState<string>('');

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
          <h1>Your quizzes</h1>
        </div>
        <div>
          <Link to="/new-quiz">
            <button>Create a quiz</button>
          </Link>
        </div>
        <Quizzes />
        <AmplifySignOut />
        <form>
          <input
            value={quizId}
            placeholder="Quiz ID"
            onChange={(e) => setQuizId(e.currentTarget.value)}
          />
        </form>
        <h2>Current quiz</h2>
        <h3>ID: {quizId}</h3>
        <button onClick={() => nextState()}>Next state</button>
      </section>
    </Layout>
  );
};
