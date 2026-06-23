import React from 'react';
import { MetricCard } from './MetricCard';
import { Ruler, MapPin, CheckCircle2, Calculator } from 'lucide-react';
import type { SimulationResult } from '../../algorithms/types';

interface Props {
  result: SimulationResult | null;
}

export const MetricsGrid: React.FC<Props> = ({ result }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        label="Total Seek Distance"
        value={result ? result.totalSeek : 0}
        unit="TRACKS"
        icon={Ruler}
      />
      <MetricCard
        label="Current Head"
        value={result ? result.sequence[result.sequence.length - 1] : 53}
        icon={MapPin}
      />
      <MetricCard
        label="Completed Requests"
        value={result ? result.completedRequests : 0}
        unit={result ? `/ ${result.completedRequests}` : '/ 0'}
        icon={CheckCircle2}
      />
      <MetricCard
        label="Average Seek"
        value={result ? result.averageSeek.toFixed(2) : '0.00'}
        unit="TRACKS"
        icon={Calculator}
      />
    </div>
  );
};
