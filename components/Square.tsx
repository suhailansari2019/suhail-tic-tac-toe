
import React from 'react';
import { SquareValue } from '../types';

interface SquareProps {
  value: SquareValue;
  onClick: () => void;
  isWinning: boolean;
  disabled: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, isWinning, disabled }) => {
  const valueColor = value === 'X' ? 'text-teal-400' : 'text-amber-400';
  const winningBg = isWinning ? 'bg-green-500/30' : 'bg-gray-800';
  const hoverClass = !value && !disabled ? 'hover:bg-gray-700' : 'cursor-not-allowed';

  return (
    <button
      className={`w-24 h-24 md:w-32 md:h-32 m-1 flex items-center justify-center rounded-lg shadow-lg transition-all duration-200 ${winningBg} ${hoverClass}`}
      onClick={onClick}
      disabled={disabled || !!value}
    >
      <span className={`text-6xl md:text-7xl font-bold transform transition-transform duration-300 ease-in-out ${value ? 'scale-100' : 'scale-0'} ${valueColor}`}>
        {value}
      </span>
    </button>
  );
};

export default Square;
