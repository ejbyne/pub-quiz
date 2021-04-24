import React from 'react';
import { Layout } from './Layout';

export const NewQuiz = () => {
  return (
    <Layout>
      <section className="w-full px-6 py-6 flex flex-col bg-indigo-900 lg:shadow-2xl lg:rounded-lg flex-grow text-gray-200 overflow-y-auto">
        <h1>New quiz</h1>
        <form className="flex flex-col">
          <label>
            Quiz name
            <input
              className="text-input mb-4"
              // value={quizId}
              // onChange={(e) => setQuizId(e.currentTarget.value)}
            />
          </label>
          <label>
            Round 1
            <input
              className="text-input mb-4"
              // value={quizId}
              // onChange={(e) => setQuizId(e.currentTarget.value)}
            />
          </label>
          <div>
            <p>Question 1</p>
            <label>
              Question
              <input
                className="text-input mb-4"
                // value={quizId}
                // onChange={(e) => setQuizId(e.currentTarget.value)}
              />
            </label>
            <label>
              Answer
              <input
                className="text-input mb-4"
                // value={quizId}
                // onChange={(e) => setQuizId(e.currentTarget.value)}
              />
            </label>
          </div>
          <button>Add question</button>
        </form>
      </section>
    </Layout>
  );
};
