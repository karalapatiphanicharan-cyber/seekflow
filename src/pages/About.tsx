import React from 'react';
import { SectionTitle } from '../components/ui/SectionTitle';
import { Card } from '../components/ui/Card';
import { Cpu, BarChart3, Play, ListOrdered, FileText } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: <Play className="text-primary" size={24} />,
      title: 'Interactive Visualization',
      description: 'See the disk head move in real-time with our chronological traversal graph.'
    },
    {
      icon: <Cpu className="text-primary" size={24} />,
      title: 'Multiple Algorithms',
      description: 'Support for FCFS, SSTF, SCAN, C-SCAN, LOOK, and C-LOOK scheduling strategies.'
    },
    {
      icon: <BarChart3 className="text-primary" size={24} />,
      title: 'Performance Comparison',
      description: 'Benchmark all algorithms simultaneously to find the most efficient one for your workload.'
    },
    {
      icon: <ListOrdered className="text-primary" size={24} />,
      title: 'Step-by-Step Logic',
      description: 'Detailed execution logs and mathematical calculations for every movement.'
    },
    {
      icon: <FileText className="text-primary" size={24} />,
      title: 'Professional Export',
      description: 'Generate high-quality PDF reports of your simulations and comparisons.'
    }
  ];

  return (
    <main className="flex-1 overflow-y-auto p-6 md:p-10 max-w-5xl mx-auto w-full">
      <SectionTitle subtitle="Mission Control Overview">About SeekFlow</SectionTitle>

      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <section className="space-y-4">
          <p className="text-lg text-text-secondary leading-relaxed">
            SeekFlow is a premium-quality educational platform designed to visualize and analyze
            <span className="text-text-primary font-medium"> Operating System Disk Scheduling Algorithms</span>.
            Built with a professional industrial aesthetic, it provides an engineering-focused dashboard for real-time
            simulation and performance benchmarking.
          </p>
          <p className="text-text-secondary leading-relaxed">
            In modern computing, disk scheduling is crucial for optimizing I/O operations and reducing
            the time the system waits for the disk head to reach a specific track. SeekFlow bridges the
            gap between theory and practice by offering a high-fidelity environment for students,
            educators, and developers to explore these concepts.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 flex gap-4 items-start border-border/40 hover:border-primary/30 transition-colors">
              <div className="p-3 bg-surface rounded-sm border border-border/50">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-bold text-text-primary mb-1">{feature.title}</h3>
                <p className="text-sm text-text-secondary">{feature.description}</p>
              </div>
            </Card>
          ))}
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-text-primary uppercase tracking-tight flex items-center gap-2">
            <span className="w-1 h-5 bg-secondary rounded-full"></span>
            Educational Purpose
          </h3>
          <p className="text-text-secondary leading-relaxed">
            Our goal is to provide a clear, intuitive way to understand how different scheduling strategies
            impact system performance. Whether you're learning about the Fairness of FCFS or the
            Efficiency of C-LOOK, SeekFlow gives you the tools to visualize the spatial and temporal
            aspects of these algorithms.
          </p>
        </section>
      </div>
    </main>
  );
};

export default About;
