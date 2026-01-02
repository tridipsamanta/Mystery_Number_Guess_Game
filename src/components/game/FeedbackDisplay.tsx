import { cn } from "@/lib/utils";
import { Flame, Snowflake, Target, HelpCircle } from "lucide-react";

type FeedbackType = "high" | "low" | "correct" | null;

interface FeedbackDisplayProps {
  feedback: FeedbackType;
  lastGuess: number | null;
}

const feedbackConfig = {
  high: {
    icon: Flame,
    text: "Too High!",
    emoji: "🔥",
    colorClass: "text-destructive",
    bgClass: "bg-destructive/20 border-destructive/50",
    animation: "animate-shake",
    glowClass: "shadow-[0_0_30px_hsl(0_85%_60%/0.5)]",
  },
  low: {
    icon: Snowflake,
    text: "Too Low!",
    emoji: "❄️",
    colorClass: "text-ice",
    bgClass: "bg-ice/20 border-ice/50",
    animation: "animate-shake",
    glowClass: "shadow-[0_0_30px_hsl(200_100%_60%/0.5)]",
  },
  correct: {
    icon: Target,
    text: "Correct!",
    emoji: "🎯",
    colorClass: "text-success",
    bgClass: "bg-success/20 border-success/50",
    animation: "animate-bounce-in",
    glowClass: "shadow-[0_0_30px_hsl(145_80%_45%/0.5)]",
  },
};

export const FeedbackDisplay = ({ feedback, lastGuess }: FeedbackDisplayProps) => {
  if (!feedback || lastGuess === null) {
    return (
      <div className="h-24 flex items-center justify-center">
        <div className="flex items-center gap-3 glass-card px-8 py-4 border border-border/30">
          <HelpCircle className="w-6 h-6 text-muted-foreground" />
          <span className="text-muted-foreground font-body text-lg">
            Take your best shot!
          </span>
        </div>
      </div>
    );
  }

  const config = feedbackConfig[feedback];
  const Icon = config.icon;

  return (
    <div className="h-24 flex items-center justify-center">
      <div
        key={lastGuess} // Force re-render for animation
        className={cn(
          "flex items-center gap-4 glass-card px-8 py-4 border-2 rounded-2xl",
          config.bgClass,
          config.animation,
          config.glowClass
        )}
      >
        <span className="text-3xl">{config.emoji}</span>
        <Icon className={cn("w-8 h-8", config.colorClass)} />
        <div className="flex flex-col">
          <span className={cn("text-2xl font-display font-bold", config.colorClass)}>
            {config.text}
          </span>
          <span className="text-sm text-muted-foreground font-body">
            You guessed: {lastGuess}
          </span>
        </div>
      </div>
    </div>
  );
};
