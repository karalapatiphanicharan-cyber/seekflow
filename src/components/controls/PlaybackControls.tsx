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
  compact?: boolean;
}

export const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  isPlaying,
  onTogglePlay,
  onReset,
  onNext,
  onPrev,
  speed,
  onSpeedChange,
  disabled,
  compact = false
}) => {
  return (
    <div className={`flex flex-wrap items-center justify-between gap-2 ${compact ? 'p-0 bg-transparent border-0' : 'p-4 bg-surface/30 rounded-sm border border-border/50'}`}>
      <div className="flex items-center gap-1.5">
        <Button
          variant="secondary"
          size="sm"
          onClick={onPrev}
          disabled={disabled}
          title="Previous Step"
          className="h-8 w-8 p-0"
        >
          <SkipBack size={14} />
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={onTogglePlay}
          disabled={disabled}
          className={`${compact ? 'w-20 h-8' : 'w-24'}`}
        >
          {isPlaying ? (
            <span className="flex items-center gap-1.5 text-[11px]"><Pause size={14} /> Pause</span>
          ) : (
            <span className="flex items-center gap-1.5 text-[11px]"><Play size={14} /> Play</span>
          )}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={onNext}
          disabled={disabled}
          title="Next Step"
          className="h-8 w-8 p-0"
        >
          <SkipForward size={14} />
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={onReset}
          disabled={disabled}
          title="Reset Playback"
          className="h-8 w-8 p-0"
        >
          <RotateCcw size={14} />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        {!compact && <span className="text-[10px] font-mono uppercase text-text-secondary tracking-widest">Speed</span>}
        <div className="flex bg-background/50 p-0.5 rounded-sm border border-border/50">
          {[0.5, 1, 2, 4].map((s) => (
            <button
              key={s}
              onClick={() => onSpeedChange(s)}
              disabled={disabled}
              className={`px-2 py-0.5 text-[9px] font-mono transition-colors rounded-sm ${
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
