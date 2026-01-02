import { Skull, RotateCcw, Ghost, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GameOverScreenProps {
  secretNumber: number;
  onPlayAgain: () => void;
}

const savageMessages = [
  "You had 10 chances… and still lost. 💀",
  "Even a coin flip would've done better.",
  "The number was RIGHT THERE! 😈",
  "Maybe math just isn't your thing?",
  "Practice before challenging the game again! 🎮",
];

export const GameOverScreen = ({ secretNumber, onPlayAgain }: GameOverScreenProps) => {
  const randomMessage = savageMessages[Math.floor(Math.random() * savageMessages.length)];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/98 backdrop-blur-md">
      {/* Broken glass effect overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border-l-2 border-t-2 border-destructive/50 rotate-12" />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 border-r-2 border-b-2 border-destructive/50 -rotate-6" />
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 border-2 border-destructive/30 rotate-45" />
      </div>

      <div className="relative animate-heavy-shake" style={{ animationIterationCount: 1 }}>
        {/* Red glow background */}
        <div className="absolute inset-0 -z-10 blur-3xl opacity-50 bg-destructive rounded-full scale-150 animate-pulse" />
        
        <div className="glass-card p-8 md:p-12 rounded-3xl border-2 border-destructive max-w-lg mx-4 animate-pulse-danger"
          style={{ boxShadow: "0 0 80px hsl(0 85% 60% / 0.5)" }}
        >
          {/* Skull icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Skull className="w-28 h-28 text-destructive animate-heartbeat" />
              <Ghost className="absolute -top-4 -right-4 w-10 h-10 text-muted-foreground animate-float" />
              <XCircle className="absolute -bottom-2 -left-2 w-8 h-8 text-destructive animate-pulse" />
            </div>
          </div>

          {/* Game Over text */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-destructive tracking-wider animate-glitch"
              style={{ textShadow: "0 0 30px hsl(0 85% 60% / 0.7)" }}
            >
              💀 PATHETIC FAILURE 💀
            </h2>

            {/* Reveal */}
            <div className="glass-card p-6 rounded-2xl bg-destructive/20 border-2 border-destructive/50 space-y-2 mt-6">
              <p className="font-body text-lg text-foreground">
                The correct number was
              </p>
              <p className="font-display font-bold text-6xl text-destructive animate-pulse"
                style={{ textShadow: "0 0 30px hsl(0 85% 60% / 0.6)" }}
              >
                {secretNumber}
              </p>
            </div>

            <div className="py-4 space-y-3">
              <p className="text-xl font-display text-destructive font-bold">
                {randomMessage}
              </p>
              <p className="text-muted-foreground font-body text-sm">
                😈 The game remembers your failure...
              </p>
            </div>
          </div>

          {/* Play Again Button */}
          <div className="mt-6 flex justify-center">
            <Button
              onClick={onPlayAgain}
              className={cn(
                "px-10 py-6 text-lg font-display uppercase tracking-widest",
                "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70",
                "border-2 border-primary/50 rounded-2xl",
                "transition-all duration-300 hover:scale-105 animate-pulse",
                "shadow-[0_0_30px_hsl(180_100%_50%/0.4)]"
              )}
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Retry (If You Dare)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
