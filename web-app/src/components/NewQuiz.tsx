import React, { useReducer, Reducer, useState } from 'react';
import { Layout } from './Layout';
import { NewQuizAction } from '@pub-quiz/shared/src/domain/newQuizTypes';
import { SaveQuizInput } from '@pub-quiz/shared/src/graphql/types';
import {
  emptyQuiz,
  newQuizReducer,
} from '@pub-quiz/shared/src/domain/newQuizReducer';

export const NewQuiz = () => {
  const [newQuiz, updateNewQuiz] = useReducer<
    Reducer<SaveQuizInput, NewQuizAction>
  >(newQuizReducer, emptyQuiz);

  const [selectedRound, setSelectedRound] = useState<number>(0);
  const round = newQuiz.rounds[selectedRound];
  const isLastRound = newQuiz.rounds.length === selectedRound + 1;

  return (
    <Layout>
      <section className="w-full px-6 py-6 flex flex-col bg-indigo-900 lg:shadow-2xl lg:rounded-lg flex-grow text-gray-200 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-4">Create your quiz</h1>
        <form className="w-full flex flex-col">
          <label className="w-full flex items-baseline mb-4">
            <span className="w-1/4 text-right pr-4">Quiz name</span>
            <input
              className="w-1/2 text-input mb-4"
              placeholder="Choose a quiz name"
              value={newQuiz.quizName}
              onChange={(e) =>
                updateNewQuiz({
                  type: 'QuizNameAmended',
                  payload: {
                    quizName: e.currentTarget.value,
                  },
                })
              }
            />
          </label>
          <div className="flex flex-col w-full items-center">
            <div className="flex justify-center mb-2 items-baseline">
              <button
                className="button"
                type="button"
                disabled={selectedRound === 0}
                onClick={() =>
                  setSelectedRound((selectedRound) => selectedRound - 1)
                }
              >
                Previous round
              </button>
              <h2 className="text-xl font-medium mb-4 mx-4">
                Round {selectedRound + 1} of {newQuiz.rounds.length}
              </h2>
              <button
                className="button"
                type="button"
                onClick={() => {
                  if (isLastRound) {
                    updateNewQuiz({
                      type: 'RoundAdded',
                    });
                  }
                  setSelectedRound((selectedRound) => selectedRound + 1);
                }}
              >
                {isLastRound ? 'Add round' : 'Next round'}
              </button>
            </div>
            <div className="w-full flex items-baseline">
              <label className="flex w-3/4 items-baseline mb-4">
                <span className="w-1/3 text-right pr-4">Round name</span>
                <input
                  className="w-2/3 text-input mb-4"
                  placeholder="Choose a round name"
                  value={round.roundName}
                  onChange={(e) =>
                    updateNewQuiz({
                      type: 'RoundNameAmended',
                      payload: {
                        roundNumber: selectedRound,
                        roundName: e.currentTarget.value,
                      },
                    })
                  }
                />
              </label>
              <button
                className="button ml-4"
                type="button"
                onClick={() =>
                  updateNewQuiz({
                    type: 'RoundRemoved',
                    payload: {
                      roundNumber: selectedRound,
                    },
                  })
                }
              >
                Remove round
              </button>
            </div>

            {round.questions.map((question, questionIndex) => (
              <div
                key={`question-${questionIndex}`}
                className="flex flex-col w-full items-center mb-4"
              >
                <div className="w-full flex justify-center items-baseline">
                  <label className="flex-grow flex items-baseline pr-4">
                    Question {questionIndex + 1}
                    <input
                      className="text-input ml-4 flex-grow pr-4"
                      value={question.text}
                      onChange={(e) =>
                        updateNewQuiz({
                          type: 'QuestionAmended',
                          payload: {
                            roundNumber: selectedRound,
                            questionNumber: questionIndex,
                            text: e.currentTarget.value,
                            answer: question.answer,
                          },
                        })
                      }
                    />
                  </label>
                  <label className="flex-grow flex items-baseline">
                    Answer
                    <input
                      className="text-input ml-4 flex-grow"
                      value={question.answer}
                      onChange={(e) =>
                        updateNewQuiz({
                          type: 'QuestionAmended',
                          payload: {
                            roundNumber: selectedRound,
                            questionNumber: questionIndex,
                            text: question.text,
                            answer: e.currentTarget.value,
                          },
                        })
                      }
                    />
                  </label>
                  <button
                    className="button ml-4"
                    type="button"
                    onClick={() =>
                      updateNewQuiz({
                        type: 'QuestionRemoved',
                        payload: {
                          roundNumber: selectedRound,
                          questionNumber: questionIndex,
                        },
                      })
                    }
                  >
                    Remove question
                  </button>
                </div>
              </div>
            ))}
            <button
              className="button self-end"
              type="button"
              onClick={() =>
                updateNewQuiz({
                  type: 'QuestionAdded',
                  payload: {
                    roundNumber: selectedRound,
                  },
                })
              }
            >
              Add question
            </button>
          </div>
        </form>
      </section>
    </Layout>
  );
};
