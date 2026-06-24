import React from 'react';
import { MetricCard } from './MetricCard';
import { Ruler, MapPin, CheckCircle2, Calculator } from 'lucide-react';
import type { SimulationResult } from '../../algorithms/types';

interface Props {
  result: SimulationResult | null;
  playbackStep: number;
}

export const MetricsGrid: React.FC<Props> = ({ result, playbackStep }) => {
  // Calculate "so far" metrics
  const currentHead = result ? result.sequence[playbackStep] : 53;

  let totalSeekSoFar = 0;
  if (result) {
    for (let i = 0; i < playbackStep; i++) {
      totalSeekSoFar += result.movements[i];
    }
  }

  // Completed requests: number of service steps so far
  // result.sequence[0] is initial head.
  // We need to count how many elements in result.sequence[1...playbackStep] were originally in the request list.
  // Actually, result.completedRequests is just the length of original requests.
  // Every step in the sequence (except i=0) is a service step (or boundary move).
  // A better way: just use playbackStep as a proxy for progress.

  const averageSeekSoFar = playbackStep > 0 ? totalSeekSoFar / playbackStep : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        label="Total Seek Distance"
        value={totalSeekSoFar}
        unit="TRACKS"
        icon={Ruler}
      />
      <MetricCard
        label="Current Head"
        value={currentHead}
        icon={MapPin}
      />
      <MetricCard
        label="Completed Steps"
        value={playbackStep}
        unit={result ? `/ ${result.sequence.length - 1}` : '/ 0'}
        icon={CheckCircle2}
      />
      <MetricCard
        label="Average Seek"
        value={averageSeekSoFar.toFixed(2)}
        unit="TRACKS"
        icon={Calculator}
      />
    </div>
  );
};
