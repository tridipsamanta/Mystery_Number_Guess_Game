import { Volume2, VolumeX } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface SoundToggleProps {
  isMuted: boolean;
  onToggle: () => void;
}

export const SoundToggle = ({ isMuted, onToggle }: SoundToggleProps) => {
  return (
    <div className="flex items-center gap-3 glass-card px-4 py-2 rounded-full">
      {isMuted ? (
        <VolumeX className="w-5 h-5 text-muted-foreground" />
      ) : (
        <Volume2 className="w-5 h-5 text-primary animate-pulse" />
      )}
      <Switch
        checked={!isMuted}
        onCheckedChange={onToggle}
        className="data-[state=checked]:bg-primary"
      />
      <span className="text-sm font-medium text-muted-foreground">
        {isMuted ? "Sound Off" : "Sound On"}
      </span>
    </div>
  );
};
