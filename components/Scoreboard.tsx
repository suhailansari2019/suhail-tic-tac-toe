import React from 'react';

interface ScoreboardProps {
  scores: { X: number; O: number };
  playerNames: { X: string; O: string };
  round: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ scores, playerNames, round }) => {
  return (
    <div className="w-full max-w-md bg-black bg-opacity-20 rounded-xl shadow-lg p-4 mb-6">
      <div className="text-center text-xl font-bold text-gray-300 mb-3">
        Round {round} / 5
      </div>
      <div className="flex justify-between items-center">
        <div className="text-center">
          <p className="text-lg font-semibold text-teal-400">{playerNames.X}</p>
          <p className="text-3xl font-bold">{scores.X}</p>
        </div>
        <div className="text-2xl font-mono text-gray-500">vs</div>
        <div className="text-center">
          <p className="text-lg font-semibold text-amber-400">{playerNames.O}</p>
          <p className="text-3xl font-bold">{scores.O}</p>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
