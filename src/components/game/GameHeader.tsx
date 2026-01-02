import { Gamepad2, Zap } from "lucide-react";

interface GameHeaderProps {
  difficulty: "easy" | "medium" | "hard";
}

const difficultyRanges = {
  easy: { min: 1, max: 50 },
  medium: { min: 1, max: 100 },
  hard: { min: 1, max: 500 },
};

export const GameHeader = ({ difficulty }: GameHeaderProps) => {
  const range = difficultyRanges[difficulty];

  return (
    <div className="text-center mb-8 animate-slide-up">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Gamepad2 className="w-10 h-10 text-primary animate-pulse-glow" />
        <h1 className="text-4xl md:text-5xl font-display font-bold tracking-wider text-foreground neon-text">
          MYSTERY NUMBER
        </h1>
        <Zap className="w-10 h-10 text-secondary animate-pulse-glow" />
      </div>
      <p className="text-lg font-body text-muted-foreground mb-6">
        Can you guess the secret number?
      </p>
      
      {/* Animated Range Display */}
      <div className="inline-flex items-center gap-4 glass-card px-8 py-4 neon-border">
        <span className="text-3xl font-display font-bold text-primary animate-float">
          {range.min}
        </span>
        <div className="flex items-center gap-2">
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-full" />
          <span className="text-muted-foreground font-body text-sm uppercase tracking-widest">
            to
          </span>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-full" />
        </div>
        <span className="text-3xl font-display font-bold text-secondary animate-float" style={{ animationDelay: "0.5s" }}>
          {range.max}
        </span>
      </div>
    </div>
  );
};
