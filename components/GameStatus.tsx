import React from 'react';
import { Player } from '../types';
import Spinner from './Spinner';

interface GameStatusProps {
  winner: Player | 'Tie' | null;
  currentPlayer: Player;
  isComputerTurn: boolean;
  playerNames: { X: string, O: string };
}

const GameStatus: React.FC<GameStatusProps> = ({ winner, currentPlayer, isComputerTurn, playerNames }) => {
  const getStatusMessage = () => {
    if (winner) {
      if (winner === 'Tie') return "Round is a Tie!";
      const winnerName = playerNames[winner];
      return `Winner: ${winnerName}`;
    }
    if (isComputerTurn) {
      return (
        <div className="flex items-center justify-center">
          <Spinner />
          <span>AI is thinking...</span>
        </div>
      );
    }
    const nextPlayerName = playerNames[currentPlayer];
    return `Next Player: ${nextPlayerName}`;
  };

  const getTextColor = () => {
    if (winner) {
      if (winner === 'X') return 'text-teal-400';
      if (winner === 'O') return 'text-amber-400';
      return 'text-gray-300';
    }
    return currentPlayer === 'X' ? 'text-teal-400' : 'text-amber-400';
  }

  return (
    <div className={`text-2xl md:text-3xl font-bold mb-6 h-10 flex items-center justify-center transition-colors duration-300 ${getTextColor()}`}>
      {getStatusMessage()}
    </div>
  );
};

export default GameStatus;