import React from 'react';

interface ResetButtonProps {
  onReset: () => void;
  disabled: boolean;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onReset, disabled }) => {
  return (
    <button
      onClick={onReset}
      disabled={disabled}
      className="mt-6 px-8 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-all duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
    >
      End Game & Start Over
    </button>
  );
};

export default ResetButton;