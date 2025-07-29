import React, { useState } from 'react';
import { GameMode } from '../types';

interface GameSetupProps {
  onStart: (mode: GameMode, player1Name: string, player2Name: string) => void;
}

const GameSetup: React.FC<GameSetupProps> = ({ onStart }) => {
  const [mode, setMode] = useState<GameMode | null>(null);
  const [player1Name, setPlayer1Name] = useState('Player 1');
  const [player2Name, setPlayer2Name] = useState('Player 2');

  const handleStart = () => {
    if (mode) {
      onStart(mode, player1Name, mode === 'vsAI' ? 'AI' : player2Name);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 font-sans text-white">
      <div className="text-center mb-8">
        <h1 className="text-5xl md:text-6xl font-extrabold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-500">AI Based</span>
          <span className="text-white"> Tic Tac Toe</span>
        </h1>
        <p className="text-gray-400 mt-2">Select your game mode</p>
      </div>

      <div className="w-full max-w-md p-8 bg-black bg-opacity-20 rounded-2xl shadow-2xl space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setMode('vsPlayer')}
            className={`px-4 py-3 font-semibold rounded-lg shadow-md transition-all duration-200 ${mode === 'vsPlayer' ? 'bg-indigo-600 ring-2 ring-indigo-400' : 'bg-gray-700 hover:bg-gray-600'}`}
          >
            Player vs Player
          </button>
          <button
            onClick={() => setMode('vsAI')}
            className={`px-4 py-3 font-semibold rounded-lg shadow-md transition-all duration-200 ${mode === 'vsAI' ? 'bg-teal-500 ring-2 ring-teal-300' : 'bg-gray-700 hover:bg-gray-600'}`}
          >
            Player vs AI
          </button>
        </div>

        {mode && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <label htmlFor="player1" className="block text-sm font-medium text-gray-300 mb-1">Player 1 (X)</label>
              <input
                type="text"
                id="player1"
                value={player1Name}
                onChange={(e) => setPlayer1Name(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            {mode === 'vsPlayer' && (
              <div>
                <label htmlFor="player2" className="block text-sm font-medium text-gray-300 mb-1">Player 2 (O)</label>
                <input
                  type="text"
                  id="player2"
                  value={player2Name}
                  onChange={(e) => setPlayer2Name(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}
             {mode === 'vsAI' && (
              <div>
                <label htmlFor="player2" className="block text-sm font-medium text-gray-300 mb-1">Player 2 (O)</label>
                <input
                  type="text"
                  id="player2"
                  value="AI"
                  disabled
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md cursor-not-allowed"
                />
              </div>
            )}
            <button
              onClick={handleStart}
              className="w-full mt-4 px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-all duration-200"
            >
              Start Game
            </button>
          </div>
        )}
      </div>
       <footer className="absolute bottom-4 text-gray-500 text-sm">
          Powered by Suhail Developer
        </footer>
    </div>
  );
};

export default GameSetup;
