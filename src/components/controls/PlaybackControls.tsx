import React from 'react';
import { Play, Pause, RotateCcw, SkipBack, SkipForward } from 'lucide-react';
import { Button } from '../ui/Button';

interface PlaybackControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onReset: () => void;
  onNext: () => void;
  onPrev: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  disabled: boolean;
}

export const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  isPlaying,
  onTogglePlay,
  onReset,
  onNext,
  onPrev,
  speed,
  onSpeedChange,
  disabled
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-surface/30 rounded-sm border border-border/50">
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={onPrev}
          disabled={disabled}
          title="Previous Step"
        >
          <SkipBack size={16} />
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={onTogglePlay}
          disabled={disabled}
          className="w-24"
        >
          {isPlaying ? (
            <span className="flex items-center gap-2"><Pause size={16} /> Pause</span>
          ) : (
            <span className="flex items-center gap-2"><Play size={16} /> Play</span>
          )}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={onNext}
          disabled={disabled}
          title="Next Step"
        >
          <SkipForward size={16} />
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={onReset}
          disabled={disabled}
          title="Reset Playback"
        >
          <RotateCcw size={16} />
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-[10px] font-mono uppercase text-text-secondary tracking-widest">Speed</span>
        <div className="flex bg-background p-1 rounded-sm border border-border">
          {[0.5, 1, 2, 4].map((s) => (
            <button
              key={s}
              onClick={() => onSpeedChange(s)}
              disabled={disabled}
              className={`px-3 py-1 text-[10px] font-mono transition-colors rounded-sm ${
                speed === s
                  ? 'bg-primary text-white font-bold'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
