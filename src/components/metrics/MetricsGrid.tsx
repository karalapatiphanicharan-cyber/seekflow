import React from 'react';
import { MetricCard } from './MetricCard';
import { Ruler, MapPin, CheckCircle2, Calculator, List, PlayCircle, Activity } from 'lucide-react';
import type { SimulationResult } from '../../algorithms/types';

interface Props {
  result: SimulationResult | null;
  playbackStep: number;
}

export const MetricsGrid: React.FC<Props> = ({ result, playbackStep }) => {
  const currentHead = result ? result.sequence[playbackStep] : 53;

  let totalSeekSoFar = 0;
  if (result) {
    for (let i = 0; i < playbackStep; i++) {
      totalSeekSoFar += result.movements[i];
    }
  }

  const averageSeekSoFar = playbackStep > 0 ? totalSeekSoFar / playbackStep : 0;

  const totalSteps = result ? result.sequence.length - 1 : 0;
  const remainingSteps = result ? Math.max(0, totalSteps - playbackStep) : 0;
  const progressPercent = totalSteps > 0 ? Math.round((playbackStep / totalSteps) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        label="Current Head"
        value={currentHead}
        icon={MapPin}
      />
      <MetricCard
        label="Total Head Movement"
        value={totalSeekSoFar}
        unit="TRACKS"
        icon={Activity}
      />
      <MetricCard
        label="Total Requests"
        value={totalSteps}
        icon={List}
      />
      <MetricCard
        label="Remaining Requests"
        value={remainingSteps}
        icon={PlayCircle}
      />
      <MetricCard
        label="Playback Progress"
        value={`${playbackStep} / ${totalSteps}`}
        unit={`${progressPercent}%`}
        icon={CheckCircle2}
      />
      <MetricCard
        label="Current Seek Distance"
        value={totalSeekSoFar}
        unit="TOTAL"
        icon={Ruler}
      />
      <MetricCard
        label="Average Seek So Far"
        value={averageSeekSoFar.toFixed(2)}
        unit="TRACKS"
        icon={Calculator}
      />
    </div>
  );
};
