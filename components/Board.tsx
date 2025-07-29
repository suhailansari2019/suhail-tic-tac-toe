
import React from 'react';
import { SquareValue } from '../types';
import Square from './Square';

interface BoardProps {
  squares: SquareValue[];
  onClick: (i: number) => void;
  winningLine: number[] | null;
  disabled: boolean;
}

const Board: React.FC<BoardProps> = ({ squares, onClick, winningLine, disabled }) => {
  return (
    <div className="grid grid-cols-3 gap-1 p-2 bg-gray-900 rounded-lg">
      {squares.map((square, i) => (
        <Square
          key={i}
          value={square}
          onClick={() => onClick(i)}
          isWinning={winningLine?.includes(i) ?? false}
          disabled={disabled}
        />
      ))}
    </div>
  );
};

export default Board;
