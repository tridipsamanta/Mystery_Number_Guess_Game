import { cn } from "@/lib/utils";
import { Flame, Snowflake, Skull } from "lucide-react";

type Difficulty = "easy" | "medium" | "hard";

interface DifficultySelectorProps {
  difficulty: Difficulty;
  onSelect: (difficulty: Difficulty) => void;
  disabled?: boolean;
}

const difficulties: { value: Difficulty; label: string; range: string; icon: React.ReactNode; color: string }[] = [
  { 
    value: "easy", 
    label: "Easy", 
    range: "1-50",
    icon: <Snowflake className="w-5 h-5" />,
    color: "text-ice"
  },
  { 
    value: "medium", 
    label: "Medium", 
    range: "1-100",
    icon: <Flame className="w-5 h-5" />,
    color: "text-accent"
  },
  { 
    value: "hard", 
    label: "Hard", 
    range: "1-500",
    icon: <Skull className="w-5 h-5" />,
    color: "text-destructive"
  },
];

export const DifficultySelector = ({ difficulty, onSelect, disabled }: DifficultySelectorProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {difficulties.map((diff) => (
        <button
          key={diff.value}
          onClick={() => onSelect(diff.value)}
          disabled={disabled}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl font-display text-sm uppercase tracking-wider transition-all duration-300",
            "border-2 disabled:opacity-50 disabled:cursor-not-allowed",
            difficulty === diff.value
              ? "glass-card border-primary bg-primary/20 neon-border"
              : "glass-card border-border/50 hover:border-primary/50 hover:bg-primary/10"
          )}
        >
          <span className={diff.color}>{diff.icon}</span>
          <span className="text-foreground">{diff.label}</span>
          <span className="text-muted-foreground text-xs">({diff.range})</span>
        </button>
      ))}
    </div>
  );
};
