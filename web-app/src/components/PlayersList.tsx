import { useContext } from 'react';
import { QuizContext } from '@pub-quiz/shared/src/context/quizContext';
import { PlayerStatus } from '@pub-quiz/shared/src/graphql/types';

export const PlayersList = () => {
  const [quiz] = useContext(QuizContext);
  return quiz.players ? (
    <div className="w-full overflow-x-auto flex justify-center">
      {quiz.players.map((player) => (
        <div
          className={`flex justify-center items-center w-16 h-16 mx-1 p-1 text-center text-sm text-white shadow rounded-full select-none ${
            player.status === PlayerStatus.AnswersSubmitted
              ? 'bg-orange-400'
              : player.status === PlayerStatus.MarksSubmitted
              ? 'bg-red-400'
              : 'bg-green-400'
          }`}
        >
          {player.name}
        </div>
      ))}
    </div>
  ) : null;
};
