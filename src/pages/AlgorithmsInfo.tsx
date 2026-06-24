import React from 'react';
import { SectionTitle } from '../components/ui/SectionTitle';
import { Card } from '../components/ui/Card';

const AlgorithmsInfo: React.FC = () => {
  const algorithms = [
    {
      name: 'FCFS (First-Come, First-Served)',
      definition: 'Processes I/O requests in the exact order they arrive in the disk queue.',
      howItWorks: 'The disk head moves sequentially from one request to the next without reordering, regardless of the distance between tracks.',
      advantages: [
        'Simple to implement and understand.',
        'Fair to all requests; no possibility of starvation.',
        'No overhead for reordering the queue.'
      ],
      disadvantages: [
        'Inefficient; results in high total seek distance.',
        'No optimization for head movement.',
        'Performance depends heavily on the arrival order.'
      ],
      useCase: 'Systems with low disk I/O load where simplicity is preferred over performance.'
    },
    {
      name: 'SSTF (Shortest Seek Time First)',
      definition: 'Selects the request that is closest to the current head position.',
      howItWorks: 'The algorithm evaluates all pending requests and moves the head to the one that requires the minimum seek distance from the current track.',
      advantages: [
        'Significantly reduces total seek distance compared to FCFS.',
        'Increases throughput by minimizing head travel time.'
      ],
      disadvantages: [
        'Can lead to starvation for requests far from the head.',
        'High overhead for recalculating distances after every move.',
        'May cause "local" head movement, ignoring distant tracks.'
      ],
      useCase: 'Interactive systems where minimizing average response time is critical.'
    },
    {
      name: 'SCAN (Elevator Algorithm)',
      definition: 'The head moves in one direction to the end of the disk, then reverses direction.',
      howItWorks: 'Similar to an elevator, the head services all requests in its path until it reaches the disk boundary, then it turns back and services requests in the opposite direction.',
      advantages: [
        'Low variance in response time.',
        'Eliminates starvation; eventually reaches every track.',
        'Efficient for heavy workloads.'
      ],
      disadvantages: [
        'Requires movement to the very end of the disk even if no requests are there.',
        'Requests just behind the head wait the longest.'
      ],
      useCase: 'Multi-user systems with high-density disk I/O requests.'
    },
    {
      name: 'C-SCAN (Circular SCAN)',
      definition: 'A variant of SCAN that only services requests in one direction.',
      howItWorks: 'The head moves to one end of the disk servicing requests, then immediately returns to the beginning of the disk without servicing requests on the return trip.',
      advantages: [
        'Provides a more uniform waiting time for all tracks.',
        'Predictable performance across the entire disk surface.'
      ],
      disadvantages: [
        'Higher overhead due to the full return jump.',
        'Moves to the disk boundary even if unnecessary.'
      ],
      useCase: 'Systems requiring consistent and fair response times for all I/O blocks.'
    },
    {
      name: 'LOOK',
      definition: 'An optimized version of SCAN that only goes as far as the last request.',
      howItWorks: 'The head moves in one direction servicing requests, but instead of going to the disk boundary, it reverses as soon as there are no more requests in that direction.',
      advantages: [
        'More efficient than SCAN; avoids unnecessary travel to disk edges.',
        'Reduces overall seek time by cutting off empty track travel.'
      ],
      disadvantages: [
        'Still has slightly higher response time variance than C-LOOK.'
      ],
      useCase: 'Standard desktop and server operating systems.'
    },
    {
      name: 'C-LOOK (Circular LOOK)',
      definition: 'The circular version of the LOOK algorithm.',
      howItWorks: 'Services requests in one direction and returns to the first pending request at the opposite end as soon as the last request in the current direction is finished.',
      advantages: [
        'Most efficient circular algorithm.',
        'Combines the uniform waiting time of C-SCAN with the efficiency of LOOK.'
      ],
      disadvantages: [
        'Slightly more complex logic to determine "last" and "first" requests.'
      ],
      useCase: 'High-performance database servers and real-time processing systems.'
    }
  ];

  return (
    <main className="flex-1 overflow-y-auto p-6 md:p-10 max-w-5xl mx-auto w-full">
      <SectionTitle subtitle="Educational Reference">Scheduling Algorithms</SectionTitle>

      <div className="space-y-12 animate-in fade-in duration-500">
        {algorithms.map((algo, index) => (
          <section key={index} className="space-y-4">
            <h3 className="text-xl font-bold text-text-primary uppercase tracking-tight flex items-center gap-3">
              <span className="text-primary font-mono text-lg">{String(index + 1).padStart(2, '0')}</span>
              {algo.name}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-primary/80">Definition</span>
                  <p className="text-sm text-text-secondary leading-relaxed">{algo.definition}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-primary/80">How it Works</span>
                  <p className="text-sm text-text-secondary leading-relaxed">{algo.howItWorks}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-primary/80">Best Use Case</span>
                  <p className="text-sm text-text-secondary leading-relaxed italic">{algo.useCase}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <Card className="p-4 border-success/20 bg-success/5">
                  <h4 className="text-xs font-bold text-success uppercase mb-2 tracking-wider">Advantages</h4>
                  <ul className="text-xs text-text-secondary space-y-1.5 list-disc pl-4">
                    {algo.advantages.map((adv, i) => <li key={i}>{adv}</li>)}
                  </ul>
                </Card>
                <Card className="p-4 border-error/20 bg-error/5">
                  <h4 className="text-xs font-bold text-error uppercase mb-2 tracking-wider">Disadvantages</h4>
                  <ul className="text-xs text-text-secondary space-y-1.5 list-disc pl-4">
                    {algo.disadvantages.map((dis, i) => <li key={i}>{dis}</li>)}
                  </ul>
                </Card>
              </div>
            </div>
            {index < algorithms.length - 1 && <div className="pt-8 border-b border-border/40" />}
          </section>
        ))}
      </div>
    </main>
  );
};

export default AlgorithmsInfo;
