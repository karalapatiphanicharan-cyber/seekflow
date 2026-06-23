import React from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { SectionTitle } from '../components/ui/SectionTitle';
import { Card } from '../components/ui/Card';
import { AlgorithmSelector } from '../components/controls/AlgorithmSelector';
import { HeadPositionInput } from '../components/controls/HeadPositionInput';
import { DiskSizeInput } from '../components/controls/DiskSizeInput';
import { RequestInput } from '../components/controls/RequestInput';
import { DirectionSelector } from '../components/controls/DirectionSelector';
import { ActionButtons } from '../components/controls/ActionButtons';
import { DiskCanvas } from '../components/visualization/DiskCanvas';
import { MetricsGrid } from '../components/metrics/MetricsGrid';
import { TimelinePlaceholder } from '../components/visualization/TimelinePlaceholder';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
      <Sidebar>
        <div className="space-y-6">
          <SectionTitle subtitle="Simulation Parameters">Config</SectionTitle>
          <AlgorithmSelector />
          <HeadPositionInput />
          <DiskSizeInput />
          <DirectionSelector />
          <RequestInput />
          <ActionButtons />
        </div>
      </Sidebar>

      <main className="flex-1 overflow-y-auto p-6 space-y-8">
        <section>
          <SectionTitle subtitle="Real-time track visualization">Visualization</SectionTitle>
          <Card className="min-h-[300px] flex flex-col justify-center px-8">
            <DiskCanvas />
          </Card>
        </section>

        <section>
          <SectionTitle subtitle="System performance indicators">Metrics</SectionTitle>
          <MetricsGrid />
        </section>

        <section>
          <SectionTitle subtitle="Step-by-step execution log">Execution</SectionTitle>
          <Card>
            <TimelinePlaceholder />
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Home;
