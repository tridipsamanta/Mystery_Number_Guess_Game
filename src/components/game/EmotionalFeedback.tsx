import { cn } from "@/lib/utils";
import { Flame, Snowflake, AlertTriangle, Skull, Zap } from "lucide-react";

type FeedbackType = "high" | "low" | "correct" | null;
type EmotionPhase = "normal" | "irritating" | "angry" | "critical";

interface EmotionalFeedbackProps {
  feedback: FeedbackType;
  lastGuess: number | null;
  remainingAttempts: number;
}

const getEmotionPhase = (remaining: number): EmotionPhase => {
  if (remaining >= 8) return "normal";
  if (remaining >= 4) return "irritating";
  if (remaining >= 2) return "angry";
  return "critical";
};

const normalMessages = {
  high: [
    "😊 Keep going, you're doing fine!",
    "😄 Nice try! Go a bit lower.",
    "👍 Don't worry, you've got this!",
    "🙂 A little too high, but close!",
  ],
  low: [
    "😊 Good guess! Try going higher.",
    "😄 You're on the right track!",
    "👍 Just need to go up a bit!",
    "🙂 Almost there, aim higher!",
  ],
};

const irritatingMessages = {
  high: [
    "😒 Still guessing randomly?",
    "🙄 Come on… THINK!",
    "😤 That was not even close!",
    "🤦 Are you guessing or just pressing numbers?",
    "😑 Really? Go LOWER already!",
  ],
  low: [
    "😒 Is this your strategy? Random clicks?",
    "🙄 HIGHER. It's not rocket science!",
    "😤 Use some logic, will you?",
    "🤦 Come on, even my grandma would do better!",
    "😑 Are you even trying?",
  ],
};

const angryMessages = {
  high: [
    "😡 BROOOO… ONLY A FEW CHANCES LEFT!",
    "🚨 Focus or you're DONE!",
    "😠 This is getting painful to watch…",
    "💢 LOWER! How hard is that?!",
    "🔥 You're running out of time!",
  ],
  low: [
    "😡 WAKE UP! GO HIGHER!",
    "🚨 Are you TRYING to lose?!",
    "😠 My patience is running thin…",
    "💢 HIGHER! COME ON!",
    "🔥 Time is almost up!",
  ],
};

const criticalMessages = {
  high: [
    "☠️ THIS IS YOUR LAST CHANCE!",
    "💀 One move… and it's GAME OVER!",
    "😈 Miss this and you officially LOSE!",
    "🔥 Do you even WANT to win??",
    "🧠 USE YOUR BRAIN — FINAL GUESS!",
  ],
  low: [
    "☠️ LAST CHANCE! DON'T MESS IT UP!",
    "💀 This is it… make it count!",
    "😈 One shot left. No pressure... 😈",
    "🔥 WIN NOW OR LOSE FOREVER!",
    "🧠 THINK HARD — IT'S ALL OR NOTHING!",
  ],
};

const getRandomMessage = (messages: string[]) => {
  return messages[Math.floor(Math.random() * messages.length)];
};

const getMessage = (feedback: "high" | "low", phase: EmotionPhase) => {
  switch (phase) {
    case "normal":
      return getRandomMessage(normalMessages[feedback]);
    case "irritating":
      return getRandomMessage(irritatingMessages[feedback]);
    case "angry":
      return getRandomMessage(angryMessages[feedback]);
    case "critical":
      return getRandomMessage(criticalMessages[feedback]);
  }
};

const phaseConfig = {
  normal: {
    bgClass: "bg-muted/30 border-muted",
    textClass: "text-foreground",
    animation: "animate-shake",
    Icon: null,
  },
  irritating: {
    bgClass: "bg-destructive/20 border-destructive/50",
    textClass: "text-destructive",
    animation: "animate-shake",
    Icon: AlertTriangle,
  },
  angry: {
    bgClass: "bg-destructive/30 border-destructive",
    textClass: "text-destructive",
    animation: "animate-heavy-shake",
    Icon: Zap,
  },
  critical: {
    bgClass: "bg-destructive/40 border-destructive",
    textClass: "text-destructive",
    animation: "animate-glitch",
    Icon: Skull,
  },
};

export const EmotionalFeedback = ({ feedback, lastGuess, remainingAttempts }: EmotionalFeedbackProps) => {
  if (!feedback || lastGuess === null || feedback === "correct") {
    return null;
  }

  const phase = getEmotionPhase(remainingAttempts);
  const config = phaseConfig[phase];
  const message = getMessage(feedback, phase);
  const DirectionIcon = feedback === "high" ? Flame : Snowflake;

  return (
    <div className="mb-4">
      <div
        key={`${lastGuess}-${remainingAttempts}`}
        className={cn(
          "glass-card px-6 py-4 border-2 rounded-2xl",
          config.bgClass,
          config.animation,
          phase === "critical" && "animate-pulse-danger"
        )}
      >
        <div className="flex items-center gap-3 mb-2">
          <DirectionIcon 
            className={cn(
              "w-6 h-6",
              feedback === "high" ? "text-destructive" : "text-ice"
            )} 
          />
          <span className={cn("text-lg font-display font-bold", feedback === "high" ? "text-destructive" : "text-ice")}>
            {feedback === "high" ? "🔥 Too High!" : "❄️ Too Low!"}
          </span>
          <span className="text-sm text-muted-foreground ml-auto">
            Guessed: {lastGuess}
          </span>
        </div>
        
        <div className={cn(
          "text-center py-2 font-body text-lg",
          config.textClass,
          phase === "critical" && "text-xl font-bold animate-heartbeat"
        )}>
          {config.Icon && (
            <config.Icon className={cn(
              "inline-block w-5 h-5 mr-2",
              phase === "critical" && "animate-pulse text-destructive"
            )} />
          )}
          {message}
        </div>
      </div>
    </div>
  );
};
