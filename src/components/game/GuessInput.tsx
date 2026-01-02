import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Target, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface GuessInputProps {
  onGuess: (guess: number) => void;
  disabled?: boolean;
  maxValue: number;
}

export const GuessInput = ({ onGuess, disabled, maxValue }: GuessInputProps) => {
  const [value, setValue] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(value, 10);
    if (!isNaN(num) && num >= 1 && num <= maxValue) {
      onGuess(num);
      setValue("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Only allow numbers
    if (inputValue === "" || /^\d+$/.test(inputValue)) {
      setValue(inputValue);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 mb-8">
      <div className="relative">
        <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-primary animate-pulse-glow" />
        <Input
          type="text"
          inputMode="numeric"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          placeholder={`Enter 1-${maxValue}`}
          className={cn(
            "w-64 h-16 pl-14 pr-6 text-center text-2xl font-display tracking-wider",
            "bg-card/80 border-2 border-primary/30 rounded-2xl",
            "placeholder:text-muted-foreground/50 placeholder:text-lg",
            "focus:border-primary focus:ring-2 focus:ring-primary/30",
            "transition-all duration-300",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        />
      </div>
      
      <Button
        type="submit"
        disabled={disabled || !value}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "relative px-12 py-6 text-xl font-display uppercase tracking-widest",
          "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70",
          "border-2 border-primary/50 rounded-2xl",
          "transition-all duration-300 transform",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          isHovered && !disabled && "scale-105 shadow-[0_0_30px_hsl(180_100%_50%/0.5)]"
        )}
      >
        <span className="flex items-center gap-3">
          <Send className={cn("w-6 h-6 transition-transform", isHovered && "translate-x-1")} />
          GUESS
        </span>
      </Button>
    </form>
  );
};
