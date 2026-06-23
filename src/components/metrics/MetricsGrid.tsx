import React from 'react';
import { Ruler, MapPin, CheckCircle, Calculator } from 'lucide-react';
import { MetricCard } from './MetricCard';

export const MetricsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        label="Total Seek Distance"
        value="640"
        unit="Tracks"
        icon={Ruler}
      />
      <MetricCard
        label="Current Head"
        value="53"
        icon={MapPin}
      />
      <MetricCard
        label="Completed Requests"
        value="0"
        unit="/ 8"
        icon={CheckCircle}
      />
      <MetricCard
        label="Average Seek"
        value="80.0"
        unit="Tracks"
        icon={Calculator}
      />
    </div>
  );
};
