
import { GoogleGenAI, Type } from "@google/genai";
import { SquareValue } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    move: {
      type: Type.INTEGER,
      description: "The index of the square to play on (0-8).",
    },
  },
  required: ["move"],
};

export const getComputerMove = async (board: SquareValue[]): Promise<number> => {
  const boardString = board.map(val => val === null ? ' ' : val).join(', ');

  const prompt = `
    You are an expert Tic Tac Toe player. Your turn is to play as 'O'.
    The current board is represented by a 9-element array. The indices are 0-8, from top-left to bottom-right.
    Current board state: [${boardString}]
    
    Based on the board, determine the best possible move. The move should be a single integer representing the index of the square you want to play.
    Return only the JSON object with your move.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        thinkingConfig: { thinkingBudget: 0 } // For low latency
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    
    if (typeof result.move === 'number' && result.move >= 0 && result.move <= 8) {
      return result.move;
    } else {
      throw new Error("Invalid move received from API");
    }

  } catch (error) {
    console.error("Error getting computer move from Gemini API:", error);
    // Fallback strategy: pick the first available spot
    const availableMoves = board.map((val, index) => val === null ? index : null).filter(val => val !== null);
    if (availableMoves.length > 0 && availableMoves[0] !== null) {
      return availableMoves[0];
    }
    // This should ideally not be reached if the function is called correctly
    return -1;
  }
};
