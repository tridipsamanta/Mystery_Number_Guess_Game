import { cn } from "@/lib/utils";
import { Heart, HeartCrack, Skull, AlertTriangle, Zap } from "lucide-react";

type EmotionPhase = "normal" | "irritating" | "angry" | "critical";

interface AttemptsCounterProps {
  attempts: number;
  maxAttempts: number;
}

const getEmotionPhase = (remaining: number): EmotionPhase => {
  if (remaining >= 8) return "normal";
  if (remaining >= 4) return "irritating";
  if (remaining >= 2) return "angry";
  return "critical";
};

const phaseLabels = {
  normal: { text: "You're doing great!", emoji: "😊", color: "text-primary" },
  irritating: { text: "Getting tense...", emoji: "😬", color: "text-accent" },
  angry: { text: "DANGER ZONE!", emoji: "😰", color: "text-destructive" },
  critical: { text: "FINAL CHANCE!", emoji: "💀", color: "text-destructive" },
};

export const AttemptsCounter = ({ attempts, maxAttempts }: AttemptsCounterProps) => {
  const remaining = maxAttempts - attempts;
  const phase = getEmotionPhase(remaining);
  const isLow = remaining <= 3;
  const isCritical = remaining <= 1;
  const isAngry = remaining <= 3 && remaining > 1;
  const label = phaseLabels[phase];

  const PhaseIcon = () => {
    if (isCritical) return <Skull className="w-6 h-6 text-destructive animate-heartbeat" />;
    if (isAngry) return <Zap className="w-6 h-6 text-destructive animate-pulse" />;
    if (phase === "irritating") return <AlertTriangle className="w-6 h-6 text-accent animate-pulse" />;
    return <Heart className="w-6 h-6 text-primary" />;
  };

  return (
    <div className={cn(
      "flex flex-col items-center gap-3 mb-6 p-4 rounded-2xl transition-all duration-500",
      isCritical && "animate-pulse-danger bg-destructive/10",
      isAngry && !isCritical && "bg-destructive/5"
    )}>
      <div className="flex items-center gap-2">
        <PhaseIcon />
        <span className={cn("text-sm font-body uppercase tracking-wider", label.color)}>
          {label.emoji} {label.text}
        </span>
      </div>
      
      {/* Visual hearts/lives display */}
      <div className="flex items-center gap-1.5">
        {Array.from({ length: maxAttempts }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "transition-all duration-300",
              i < remaining ? "scale-100" : "scale-75 opacity-30"
            )}
          >
            {i < remaining ? (
              <Heart 
                className={cn(
                  "w-5 h-5 fill-current transition-all",
                  isCritical
                    ? "text-destructive animate-heartbeat"
                    : isLow
                    ? "text-destructive"
                    : phase === "irritating"
                    ? "text-accent"
                    : "text-primary"
                )} 
              />
            ) : (
              <HeartCrack className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
        ))}
      </div>
      
      {/* Numeric display */}
      <div className={cn(
        "glass-card px-6 py-2 rounded-xl border-2 transition-all",
        isCritical && "border-destructive animate-pulse-danger",
        isAngry && !isCritical && "border-destructive/50",
        phase === "irritating" && "border-accent/50",
        phase === "normal" && "border-primary/30"
      )}>
        <span
          className={cn(
            "text-3xl font-display font-bold transition-colors",
            isCritical && "text-destructive animate-glitch",
            isAngry && !isCritical && "text-destructive animate-pulse",
            phase === "irritating" && "text-accent",
            phase === "normal" && "text-primary"
          )}
        >
          {remaining}
        </span>
        <span className="text-muted-foreground font-body text-lg"> / {maxAttempts}</span>
      </div>

      {/* Warning message for critical */}
      {isCritical && (
        <div className="text-center animate-glitch">
          <span className="text-destructive font-display font-bold text-lg">
            ☠️ LAST CHANCE! DON'T BLOW IT! ☠️
          </span>
        </div>
      )}
    </div>
  );
};
