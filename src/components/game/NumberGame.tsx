import { useState, useCallback, useEffect } from "react";
import { GameHeader } from "./GameHeader";
import { DifficultySelector } from "./DifficultySelector";
import { GuessInput } from "./GuessInput";
import { FeedbackDisplay } from "./FeedbackDisplay";
import { EmotionalFeedback } from "./EmotionalFeedback";
import { AttemptsCounter } from "./AttemptsCounter";
import { GuessHistory } from "./GuessHistory";
import { VictoryScreen } from "./VictoryScreen";
import { GameOverScreen } from "./GameOverScreen";
import { SoundToggle } from "./SoundToggle";
import { useGameSounds } from "@/hooks/useGameSounds";

type Difficulty = "easy" | "medium" | "hard";
type GameState = "playing" | "won" | "lost";
type FeedbackType = "high" | "low" | "correct" | null;

const difficultyRanges = {
  easy: { min: 1, max: 50 },
  medium: { min: 1, max: 100 },
  hard: { min: 1, max: 500 },
};

const MAX_ATTEMPTS = 10;

export const NumberGame = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [secretNumber, setSecretNumber] = useState<number>(0);
  const [attempts, setAttempts] = useState(0);
  const [guesses, setGuesses] = useState<{ value: number; result: "high" | "low" | "correct" }[]>([]);
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [lastGuess, setLastGuess] = useState<number | null>(null);
  const [gameState, setGameState] = useState<GameState>("playing");
  
  const { isMuted, toggleMute, playSound, playSoundForChances, stopSiren } = useGameSounds();

  const generateNumber = useCallback((diff: Difficulty) => {
    const range = difficultyRanges[diff];
    return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
  }, []);

  const initGame = useCallback((diff: Difficulty = difficulty) => {
    setSecretNumber(generateNumber(diff));
    setAttempts(0);
    setGuesses([]);
    setFeedback(null);
    setLastGuess(null);
    setGameState("playing");
  }, [difficulty, generateNumber]);

  useEffect(() => {
    initGame();
  }, []);

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    initGame(newDifficulty);
  };

  const handleGuess = (guess: number) => {
    if (gameState !== "playing") return;

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    setLastGuess(guess);

    let result: "high" | "low" | "correct";

    if (guess === secretNumber) {
      result = "correct";
      setFeedback("correct");
      setGameState("won");
      stopSiren();
      playSound("win");
    } else if (guess > secretNumber) {
      result = "high";
      setFeedback("high");
      playSoundForChances(MAX_ATTEMPTS - newAttempts);
    } else {
      result = "low";
      setFeedback("low");
      playSoundForChances(MAX_ATTEMPTS - newAttempts);
    }

    setGuesses((prev) => [...prev, { value: guess, result }]);

    // Check for game over
    if (result !== "correct" && newAttempts >= MAX_ATTEMPTS) {
      setGameState("lost");
      stopSiren();
      playSound("lose");
    }
  };

  const handlePlayAgain = () => {
    stopSiren();
    initGame();
  };

  const range = difficultyRanges[difficulty];
  const isGameOver = gameState === "won" || gameState === "lost";
  const remainingAttempts = MAX_ATTEMPTS - attempts;

  // Determine emotion phase for overlay effects
  const getOverlayClass = () => {
    if (remainingAttempts <= 1) return "critical-overlay";
    if (remainingAttempts <= 3) return "danger-overlay";
    return "";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      {/* Sound Toggle - Fixed Position */}
      <div className="fixed top-4 right-4 z-50">
        <SoundToggle isMuted={isMuted} onToggle={toggleMute} />
      </div>

      {/* Danger overlays based on remaining attempts */}
      {gameState === "playing" && remainingAttempts <= 3 && (
        <div className={getOverlayClass()} />
      )}

      {gameState === "won" && (
        <VictoryScreen
          attempts={attempts}
          maxAttempts={MAX_ATTEMPTS}
          secretNumber={secretNumber}
          onPlayAgain={handlePlayAgain}
        />
      )}

      {gameState === "lost" && (
        <GameOverScreen
          secretNumber={secretNumber}
          onPlayAgain={handlePlayAgain}
        />
      )}

      <div className="w-full max-w-2xl">
        <GameHeader difficulty={difficulty} />
        
        <DifficultySelector
          difficulty={difficulty}
          onSelect={handleDifficultyChange}
          disabled={attempts > 0 && !isGameOver}
        />

        <div className="glass-card p-6 md:p-8 rounded-3xl neon-border">
          <AttemptsCounter attempts={attempts} maxAttempts={MAX_ATTEMPTS} />
          
          <EmotionalFeedback 
            feedback={feedback} 
            lastGuess={lastGuess} 
            remainingAttempts={remainingAttempts}
          />
          
          <FeedbackDisplay feedback={feedback} lastGuess={lastGuess} />
          
          <GuessInput
            onGuess={handleGuess}
            disabled={isGameOver}
            maxValue={range.max}
          />
          
          <GuessHistory guesses={guesses} />
        </div>
      </div>
    </div>
  );
};
