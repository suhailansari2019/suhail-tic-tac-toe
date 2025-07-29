import React, { useState, useEffect, useCallback } from 'react';
import Board from './components/Board';
import GameStatus from './components/GameStatus';
import ResetButton from './components/ResetButton';
import GameSetup from './components/GameSetup';
import Scoreboard from './components/Scoreboard';
import WinnerModal from './components/WinnerModal';
import { SquareValue, Player, GameMode } from './types';
import { getComputerMove } from './services/geminiService';

const App: React.FC = () => {
  const initialBoard = Array(9).fill(null);

  // Game flow state
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [round, setRound] = useState(1);
  const [isRoundOver, setIsRoundOver] = useState(false);
  const [overallWinner, setOverallWinner] = useState<string | null>(null);

  // Player and score state
  const [playerNames, setPlayerNames] = useState({ X: 'Player 1', O: 'Player 2' });
  const [scores, setScores] = useState({ X: 0, O: 0 });

  // Board state
  const [board, setBoard] = useState<SquareValue[]>(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player | 'Tie' | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [isComputerTurn, setIsComputerTurn] = useState<boolean>(false);

  const calculateWinner = useCallback((squares: SquareValue[]): { winner: Player | null; line: number[] | null } => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a] as Player, line: lines[i] };
      }
    }
    return { winner: null, line: null };
  }, []);
  
  // Effect to check for round winner
  useEffect(() => {
    if (isRoundOver) return;

    const gameResult = calculateWinner(board);
    if (gameResult.winner) {
      setWinner(gameResult.winner);
      setWinningLine(gameResult.line);
      setScores(prev => ({ ...prev, [gameResult.winner!]: prev[gameResult.winner!] + 1 }));
      setIsRoundOver(true);
    } else if (!board.includes(null)) {
      setWinner('Tie');
      setIsRoundOver(true);
    }
  }, [board, calculateWinner, isRoundOver]);

  const handleComputerMove = useCallback(async (currentBoard: SquareValue[]) => {
    setIsComputerTurn(true);
    const move = await getComputerMove(currentBoard);

    if (move !== -1 && currentBoard[move] === null) {
      const newBoard = [...currentBoard];
      newBoard[move] = 'O';
      setBoard(newBoard);
      setCurrentPlayer('X');
    } else if (move !== -1) {
        const fallbackMove = currentBoard.findIndex(sq => sq === null);
        if (fallbackMove !== -1) {
            const newBoard = [...currentBoard];
            newBoard[fallbackMove] = 'O';
            setBoard(newBoard);
            setCurrentPlayer('X');
        }
    }
    setIsComputerTurn(false);
  }, []);

  // Effect to trigger AI move
  useEffect(() => {
    if (gameMode === 'vsAI' && currentPlayer === 'O' && !winner && !isRoundOver) {
      const timeoutId = setTimeout(() => handleComputerMove(board), 500);
      return () => clearTimeout(timeoutId);
    }
  }, [currentPlayer, winner, board, handleComputerMove, gameMode, isRoundOver]);


  const handleSquareClick = (i: number) => {
    if (winner || board[i] || isComputerTurn || isRoundOver) {
      return;
    }

    const newBoard = [...board];
    newBoard[i] = currentPlayer;
    setBoard(newBoard);

    if (gameMode === 'vsPlayer') {
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    } else {
        setCurrentPlayer('O');
    }
  };

  const handleNextRound = () => {
    if (round >= 5) {
      if (scores.X > scores.O) {
        setOverallWinner(playerNames.X);
      } else if (scores.O > scores.X) {
        setOverallWinner(playerNames.O);
      } else {
        setOverallWinner('Tie');
      }
    } else {
      setRound(r => r + 1);
      setBoard(initialBoard);
      setCurrentPlayer(round % 2 === 0 ? 'O' : 'X');
      setWinner(null);
      setWinningLine(null);
      setIsRoundOver(false);
    }
  };

  const handleResetGame = () => {
    setGameMode(null);
    setScores({ X: 0, O: 0 });
    setRound(1);
    setPlayerNames({ X: 'Player 1', O: 'Player 2' });
    setBoard(initialBoard);
    setCurrentPlayer('X');
    setWinner(null);
    setWinningLine(null);
    setIsComputerTurn(false);
    setIsRoundOver(false);
    setOverallWinner(null);
  };

  const handleStartGame = (mode: GameMode, p1Name: string, p2Name:string) => {
      setGameMode(mode);
      setPlayerNames({X: p1Name, O: p2Name});
  }

  if (!gameMode) {
    return <GameSetup onStart={handleStartGame} />;
  }

  if (overallWinner) {
     const message = overallWinner === 'Tie' ? "It's a tie game!" : `${overallWinner} is the ultimate winner!`;
     return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 font-sans text-white">
            <div className="text-center">
                 <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-4">{message}</h1>
                 <p className="text-2xl text-gray-300 mb-8">Final Score: {playerNames.X} {scores.X} - {scores.O} {playerNames.O}</p>
                 <ResetButton onReset={handleResetGame} disabled={false} />
            </div>
             <footer className="absolute bottom-4 text-gray-500 text-sm">
                Powered by Suhail Developer
            </footer>
        </div>
     )
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 font-sans">
        <header className="text-center mb-4">
            <h1 className="text-5xl md:text-6xl font-extrabold">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-500">Gemini</span>
                <span className="text-white"> Tic Tac Toe</span>
            </h1>
        </header>

        <main className="flex flex-col items-center p-6 bg-black bg-opacity-20 rounded-2xl shadow-2xl">
            <Scoreboard scores={scores} playerNames={playerNames} round={round} />
            <GameStatus winner={winner} currentPlayer={currentPlayer} isComputerTurn={isComputerTurn} playerNames={playerNames}/>
            <Board 
              squares={board} 
              onClick={handleSquareClick} 
              winningLine={winningLine}
              disabled={!!winner || isComputerTurn || isRoundOver} 
            />
            <ResetButton onReset={handleResetGame} disabled={isComputerTurn} />
        </main>
        
        {isRoundOver && (
            <WinnerModal 
                winner={winner}
                playerNames={playerNames}
                onNextRound={handleNextRound}
                isLastRound={round >= 5}
            />
        )}

        <footer className="absolute bottom-4 text-gray-500 text-sm">
            Powered by Suhail Developer
        </footer>
    </div>
  );
};

export default App;
