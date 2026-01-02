import { useEffect } from "react";
import confetti from "canvas-confetti";
import { Trophy, Star, Sparkles, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VictoryScreenProps {
  attempts: number;
  maxAttempts: number;
  secretNumber: number;
  onPlayAgain: () => void;
}

export const VictoryScreen = ({ attempts, maxAttempts, secretNumber, onPlayAgain }: VictoryScreenProps) => {
  useEffect(() => {
    // Initial burst
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 1000,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ["#00ffff", "#ff00ff", "#ffff00"],
    });

    fire(0.2, {
      spread: 60,
      colors: ["#00ffff", "#ff00ff"],
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ["#ffff00", "#ff8800", "#00ff88"],
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: ["#ff00ff", "#00ffff"],
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      colors: ["#ffff00", "#00ff88"],
    });

    // Continuous fireworks
    const interval = setInterval(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#00ffff", "#ff00ff", "#ffff00"],
        zIndex: 1000,
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#00ffff", "#ff00ff", "#ffff00"],
        zIndex: 1000,
      });
    }, 1500);

    return () => {
      clearInterval(interval);
      confetti.reset();
    };
  }, []);

  const getRank = (attempts: number, maxAttempts: number) => {
    const remaining = maxAttempts - attempts;
    
    // Clutch wins (1-3 remaining)
    if (remaining <= 3 && remaining >= 1) {
      return { 
        title: "CLUTCH MASTER!", 
        emoji: "😱", 
        subtitle: "HOLY SH*T! YOU ACTUALLY DID IT!",
        message: "Against all odds, you pulled through!"
      };
    }
    
    // Mid-game wins (4-7 remaining)
    if (remaining <= 7 && remaining >= 4) {
      return { 
        title: "SURVIVOR!", 
        emoji: "😎", 
        subtitle: "Not bad… you survived.",
        message: "You kept your cool under pressure!"
      };
    }
    
    // Early wins (8-10 remaining)
    if (attempts === 1) {
      return { 
        title: "LEGENDARY!", 
        emoji: "👑", 
        subtitle: "IMPOSSIBLE! First try?!",
        message: "Are you cheating or just a genius?"
      };
    }
    
    return { 
      title: "NUMBER MASTER!", 
      emoji: "🔥", 
      subtitle: "LEGENDARY SKILL! You crushed it!",
      message: "Speed and precision combined!"
    };
  };

  const rank = getRank(attempts, maxAttempts);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md">
      <div className="relative animate-bounce-in">
        {/* Glow background */}
        <div className="absolute inset-0 -z-10 blur-3xl opacity-50 bg-gradient-to-r from-accent via-secondary to-primary rounded-full scale-150" />
        
        <div className="glass-card p-8 md:p-12 rounded-3xl border-2 border-accent/50 victory-glow max-w-lg mx-4">
          {/* Trophy */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Trophy className="w-24 h-24 text-accent animate-float" />
              <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-accent animate-pulse" />
              <Star className="absolute -bottom-1 -left-2 w-6 h-6 text-secondary animate-pulse" style={{ animationDelay: "0.3s" }} />
            </div>
          </div>

          {/* Celebration text */}
          <div className="text-center space-y-4">
            <p className="text-4xl">{rank.emoji}</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-accent neon-text-secondary tracking-wider">
              {rank.title}
            </h2>
            <p className="text-muted-foreground font-body text-lg">
              {rank.subtitle}
            </p>

            {/* Stats */}
            <div className="glass-card p-6 rounded-2xl bg-card/50 space-y-2 mt-6">
              <p className="font-body text-lg text-foreground">
                The secret number was{" "}
                <span className="font-display font-bold text-2xl text-primary neon-text">
                  {secretNumber}
                </span>
              </p>
              <p className="font-body text-lg text-foreground">
                You guessed it in{" "}
                <span className="font-display font-bold text-2xl text-secondary neon-text-secondary">
                  {attempts}
                </span>{" "}
                {attempts === 1 ? "attempt" : "attempts"}!
              </p>
            </div>

            <p className="text-xl font-display text-foreground/80 pt-4">
              🎉 CONGRATULATIONS! 🎉
            </p>
            <p className="text-sm text-muted-foreground font-body">
              You are a Number Master 🧠🔥
            </p>
          </div>

          {/* Play Again Button */}
          <div className="mt-8 flex justify-center">
            <Button
              onClick={onPlayAgain}
              className={cn(
                "px-10 py-6 text-lg font-display uppercase tracking-widest",
                "bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70",
                "text-accent-foreground border-2 border-accent/50 rounded-2xl",
                "transition-all duration-300 hover:scale-105",
                "shadow-[0_0_30px_hsl(45_100%_50%/0.5)]"
              )}
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Play Again
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
