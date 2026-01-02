import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown, Check } from "lucide-react";

interface GuessHistoryProps {
  guesses: { value: number; result: "high" | "low" | "correct" }[];
}

export const GuessHistory = ({ guesses }: GuessHistoryProps) => {
  if (guesses.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <h3 className="text-center text-sm font-body uppercase tracking-wider text-muted-foreground mb-3">
        Previous Guesses
      </h3>
      <div className="flex flex-wrap justify-center gap-2">
        {guesses.map((guess, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center gap-1 px-3 py-1.5 rounded-lg font-display text-sm animate-slide-up",
              guess.result === "high" && "bg-destructive/20 border border-destructive/40 text-destructive",
              guess.result === "low" && "bg-ice/20 border border-ice/40 text-ice",
              guess.result === "correct" && "bg-success/20 border border-success/40 text-success"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {guess.result === "high" && <ArrowUp className="w-3 h-3" />}
            {guess.result === "low" && <ArrowDown className="w-3 h-3" />}
            {guess.result === "correct" && <Check className="w-3 h-3" />}
            <span>{guess.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
