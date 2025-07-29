import React from 'react';
import { Player } from '../types';

interface WinnerModalProps {
  winner: Player | 'Tie' | null;
  playerNames: { X: string; O: string };
  onNextRound: () => void;
  isLastRound: boolean;
}

const WinnerModal: React.FC<WinnerModalProps> = ({ winner, playerNames, onNextRound, isLastRound }) => {
  if (!winner) return null;

  const winnerName = winner === 'Tie' ? "It's a Tie!" : `${playerNames[winner]} Wins!`;
  const winnerColor = winner === 'X' ? 'text-teal-400' : winner === 'O' ? 'text-amber-400' : 'text-white';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 text-center transform scale-up-center">
        <h2 className={`text-4xl font-extrabold mb-4 ${winnerColor}`}>{winnerName}</h2>
        {winner !== 'Tie' && (
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-yellow-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  animation: `fall ${Math.random() * 2 + 3}s linear ${Math.random() * 3}s infinite`,
                  width: `${Math.random() * 8 + 4}px`,
                  height: `${Math.random() * 8 + 4}px`,
                  opacity: Math.random(),
                }}
              ></div>
            ))}
             {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-blue-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  animation: `fall ${Math.random() * 2 + 3}s linear ${Math.random() * 3}s infinite`,
                  width: `${Math.random() * 8 + 4}px`,
                  height: `${Math.random() * 8 + 4}px`,
                  opacity: Math.random(),
                }}
              ></div>
            ))}
          </div>
        )}
        <button
          onClick={onNextRound}
          className="mt-6 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transition-all duration-200"
        >
          {isLastRound ? 'See Final Results' : 'Next Round'}
        </button>
      </div>
    </div>
  );
};

export default WinnerModal;
