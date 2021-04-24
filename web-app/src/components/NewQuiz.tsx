import React from 'react';
import { Layout } from './Layout';

export const NewQuiz = () => {
  return (
    <Layout>
      <section className="w-full px-6 py-6 flex flex-col bg-indigo-900 lg:shadow-2xl lg:rounded-lg flex-grow text-gray-200 overflow-y-auto">
        <h1>New quiz</h1>
        <form>
          <input
            className="text-input mb-4"
            // value={quizId}
            placeholder="Quiz name"
            // onChange={(e) => setQuizId(e.currentTarget.value)}
          />
        </form>
      </section>
    </Layout>
  );
};
