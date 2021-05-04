import React, { useReducer, Reducer, useState } from 'react';
import { Layout } from './Layout';
import { NewQuizAction } from '@pub-quiz/shared/src/domain/newQuizTypes';
import { SaveQuizInput } from '@pub-quiz/shared/src/graphql/types';
import {
  emptyQuiz,
  newQuizReducer,
} from '@pub-quiz/shared/src/domain/newQuizReducer';
import { ReactComponent as FastForward } from '../assets/icons/fast-forward.svg';
import { ReactComponent as Rewind } from '../assets/icons/rewind.svg';
import { ReactComponent as Delete } from '../assets/icons/delete.svg';
import { ReactComponent as PlusCircle } from '../assets/icons/plus-circle.svg';

export const NewQuiz = () => {
  const [newQuiz, updateNewQuiz] = useReducer<
    Reducer<SaveQuizInput, NewQuizAction>
  >(newQuizReducer, emptyQuiz);

  const [selectedRound, setSelectedRound] = useState<number>(0);
  const round = newQuiz.rounds[selectedRound];
  const isFirstRound = selectedRound === 0;
  const isLastRound = newQuiz.rounds.length === selectedRound + 1;

  return (
    <Layout>
      <section className="w-full px-6 py-6 flex flex-col bg-indigo-900 lg:shadow-2xl lg:rounded-lg flex-grow text-gray-200 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-4">Create your quiz</h1>
        <form className="w-full flex flex-col">
          <label className="w-full flex items-baseline mb-8">
            <span className="w-1/4 text-right pr-4">Quiz name</span>
            <input
              className="w-1/2 text-input"
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
            <div className="flex justify-center mb-4 items-center">
              <button
                type="button"
                disabled={isFirstRound}
                onClick={() =>
                  setSelectedRound((selectedRound) => selectedRound - 1)
                }
              >
                <Rewind className="w-6" title="Previous round" />
              </button>
              <h2 className="text-xl font-medium mx-4">
                Round {selectedRound + 1} of {newQuiz.rounds.length}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setSelectedRound((selectedRound) => selectedRound + 1);
                  if (isLastRound) {
                    updateNewQuiz({
                      type: 'RoundAdded',
                    });
                  }
                }}
              >
                {isLastRound ? (
                  <PlusCircle className="w-6" title="Add round" />
                ) : (
                  <FastForward className="w-6" title="Next round" />
                )}
              </button>
            </div>
            <div className="w-full flex items-center mb-10">
              <label className="flex w-3/4 items-baseline mr-4">
                <span className="w-1/3 text-right pr-4">Round name</span>
                <input
                  className="w-2/3 text-input"
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
                type="button"
                disabled={newQuiz.rounds.length === 1}
                onClick={() => {
                  if (isLastRound) {
                    setSelectedRound((selectedRound) => selectedRound - 1);
                  }
                  updateNewQuiz({
                    type: 'RoundRemoved',
                    payload: {
                      roundNumber: selectedRound,
                    },
                  });
                }}
              >
                <Delete className="w-6" title="Remove round" />
              </button>
            </div>

            {round.questions.map((question, questionIndex) => (
              <div
                key={`question-${questionIndex}`}
                className="flex flex-col w-full items-center mb-4"
              >
                <div className="w-full flex justify-center items-center">
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
                  <label className="flex-grow flex items-baseline mr-4">
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
                    type="button"
                    disabled={round.questions.length === 1}
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
                    <Delete className="w-6" title="Remove question" />
                  </button>
                </div>
              </div>
            ))}
            <div className="w-full flex justify-end">
              <button
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
                <PlusCircle className="h-6" title="Add question" />
              </button>
            </div>
          </div>
        </form>
      </section>
    </Layout>
  );
};
