import React, { useState } from 'react';
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
import { StepCalculations } from '../components/metrics/StepCalculations';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { SimulationState } from '../hooks/useSimulation';

interface HomeProps {
  sim: SimulationState;
}

const Home: React.FC<HomeProps> = ({ sim }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row flex-1 overflow-hidden relative">
      {/* Configuration Sidebar */}
      <Sidebar isCollapsed={isSidebarCollapsed}>
        <div className="space-y-5">
          <SectionTitle subtitle="Simulation Parameters">Config</SectionTitle>
          <AlgorithmSelector
            value={sim.algorithm}
            onChange={sim.setAlgorithm}
          />
          <HeadPositionInput
            value={sim.head}
            onChange={sim.setHead}
          />
          <DiskSizeInput
            value={sim.diskSize}
            onChange={sim.setDiskSize}
          />
          <DirectionSelector
            value={sim.direction}
            onChange={sim.setDirection}
          />
          <RequestInput
            value={sim.requestString}
            onChange={sim.setRequestString}
          />

          {sim.error && (
            <div className="text-error text-xs font-mono bg-error/10 border border-error/20 p-2 rounded-sm">
              {sim.error}
            </div>
          )}

          <ActionButtons
            onRun={sim.runSimulation}
            onRandom={sim.generateRandom}
            onExample={sim.loadExample}
            onReset={sim.reset}
          />
        </div>
      </Sidebar>

      {/* Persistent Toggle Button */}
      <button
        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        className="absolute top-1/2 z-40 w-6 h-12 bg-surface border border-border border-l-0 rounded-r-md flex items-center justify-center text-text-secondary hover:text-text-primary transition-all duration-300 shadow-md group"
        style={{
          left: isSidebarCollapsed ? '0' : '340px',
          transform: 'translateY(-50%)'
        }}
        aria-label={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        <div className="transition-transform duration-300 group-hover:scale-110">
          {isSidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </div>
      </button>

      <main className="flex-1 overflow-y-auto p-5 space-y-6">
        <section className="space-y-4">
          <SectionTitle subtitle="Real-time track visualization">Visualization</SectionTitle>
          <Card className="min-h-[450px] flex flex-col justify-center px-10 relative overflow-hidden">
              <DiskCanvas
                head={sim.head}
                requests={sim.parsedRequests}
                diskSize={sim.diskSize}
                result={sim.result}
                direction={sim.direction}
                playbackStep={sim.playbackStep}
              />
          </Card>
        </section>

        <section>
          <SectionTitle subtitle="Step-by-step execution log">Execution</SectionTitle>
          <Card>
            <TimelinePlaceholder
                result={sim.result}
                playbackStep={sim.playbackStep}
            />
          </Card>

          {/* New Educational Calculations Section */}
          <StepCalculations
            result={sim.result}
            playbackStep={sim.playbackStep}
          />
        </section>

        <section>
          <SectionTitle subtitle="System performance indicators">Metrics</SectionTitle>
          <MetricsGrid
            result={sim.result}
            playbackStep={sim.playbackStep}
          />
        </section>
      </main>
    </div>
  );
};

export default Home;
