import React, { useState, useMemo, useCallback } from 'react';
import { SectionTitle } from '../components/ui/SectionTitle';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { HeadPositionInput } from '../components/controls/HeadPositionInput';
import { DiskSizeInput } from '../components/controls/DiskSizeInput';
import { RequestInput } from '../components/controls/RequestInput';
import { DirectionSelector } from '../components/controls/DirectionSelector';
import { fcfs, sstf, scan, cscan, look, clook } from '../algorithms';
import type { SimulationInput, SimulationResult, Direction } from '../algorithms/types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Trophy, ChevronDown, ChevronUp, Activity, BarChart3, ListChecks } from 'lucide-react';

const Compare: React.FC = () => {
  // Input State
  const [head, setHead] = useState<number>(53);
  const [diskSize, setDiskSize] = useState<number>(200);
  const [direction, setDirection] = useState<Direction>('right');
  const [requestString, setRequestString] = useState<string>('98, 183, 37, 122, 14, 124, 65, 67');

  // Results State
  const [results, setResults] = useState<SimulationResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const parsedRequests = useMemo(() => {
    if (!requestString.trim()) return [];
    return requestString
      .split(',')
      .map(s => s.trim())
      .filter(s => s !== '')
      .map(Number)
      .filter(n => !isNaN(n));
  }, [requestString]);

  const handleCompare = useCallback(() => {
    // Validation
    if (isNaN(head) || head < 0 || head >= diskSize) {
      setError(`Initial head position must be between 0 and ${diskSize - 1}.`);
      return;
    }
    const parts = requestString.split(',').map(s => s.trim()).filter(s => s !== '');
    for (const part of parts) {
        const n = Number(part);
        if (isNaN(n) || n < 0 || n >= diskSize) {
            setError(`Invalid request sequence. Ensure all tracks are between 0 and ${diskSize - 1}.`);
            return;
        }
    }

    setError(null);
    const input: SimulationInput = {
      requests: parsedRequests,
      head,
      diskSize,
      direction,
    };

    const allResults = [
        fcfs(input),
        sstf(input),
        scan(input),
        cscan(input),
        look(input),
        clook(input)
    ];

    setResults(allResults);
  }, [head, diskSize, direction, parsedRequests, requestString]);

  const bestResult = useMemo(() => {
    if (!results) return null;
    return results.reduce((prev, curr) =>
        curr.totalSeek < prev.totalSeek ? curr : prev
    );
  }, [results]);

  const chartData = useMemo(() => {
    if (!results) return [];
    return results.map(r => ({
      name: r.algorithm,
      seek: r.totalSeek
    }));
  }, [results]);

  return (
    <main className="flex-1 overflow-y-auto p-5 space-y-8 bg-background">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header Section */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <SectionTitle subtitle="Analyze and compare algorithm efficiency">Performance Comparison</SectionTitle>
            <Button variant="primary" size="lg" onClick={handleCompare} className="md:w-48 shadow-lg shadow-primary/20">
                <Activity size={18} className="mr-2" /> Compare All
            </Button>
        </section>

        {/* Inputs Section */}
        <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <HeadPositionInput value={head} onChange={setHead} />
                <DiskSizeInput value={diskSize} onChange={setDiskSize} />
                <DirectionSelector value={direction} onChange={setDirection} />
                <div className="lg:col-span-1">
                     <RequestInput value={requestString} onChange={setRequestString} />
                </div>
            </div>
            {error && (
                <div className="mt-4 p-3 bg-error/10 border border-error/20 text-error text-xs font-mono rounded-sm">
                    {error}
                </div>
            )}
        </Card>

        {results && (
          <>
            {/* Summary Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="p-4 bg-surface/50 border border-border rounded-sm flex flex-col justify-between">
                    <span className="text-[10px] font-mono uppercase text-text-secondary">Best Performer</span>
                    <div className="flex items-center gap-2 mt-2">
                        <Trophy size={16} className="text-primary" />
                        <span className="text-lg font-bold text-text-primary">{bestResult?.algorithm}</span>
                    </div>
                </div>
                <div className="p-4 bg-surface/50 border border-border rounded-sm flex flex-col justify-between border-l-4 border-l-primary">
                    <span className="text-[10px] font-mono uppercase text-text-secondary">Lowest Seek</span>
                    <span className="text-2xl font-bold text-text-primary mt-2">{bestResult?.totalSeek} <span className="text-xs font-normal text-text-secondary">tracks</span></span>
                </div>
                <div className="p-4 bg-surface/50 border border-border rounded-sm flex flex-col justify-between">
                    <span className="text-[10px] font-mono uppercase text-text-secondary">Avg Seek (Best)</span>
                    <span className="text-lg font-bold text-text-primary mt-2">{bestResult?.averageSeek.toFixed(2)}</span>
                </div>
                <div className="p-4 bg-surface/50 border border-border rounded-sm flex flex-col justify-between">
                    <span className="text-[10px] font-mono uppercase text-text-secondary">Algorithms</span>
                    <span className="text-lg font-bold text-text-primary mt-2">{results.length}</span>
                </div>
                <div className="p-4 bg-surface/50 border border-border rounded-sm flex flex-col justify-between">
                    <span className="text-[10px] font-mono uppercase text-text-secondary">Total Requests</span>
                    <span className="text-lg font-bold text-text-primary mt-2">{bestResult?.completedRequests}</span>
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart Section */}
                <Card className="lg:col-span-1 p-6 flex flex-col h-[400px]">
                    <div className="flex items-center gap-2 mb-6">
                        <BarChart3 size={16} className="text-primary" />
                        <h3 className="text-xs font-mono font-bold uppercase tracking-widest">Total Seek Comparison</h3>
                    </div>
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} layout="vertical" margin={{ left: -20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2F3B4C" horizontal={true} vertical={false} />
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    stroke="#9CA3AF"
                                    fontSize={10}
                                    fontFamily="JetBrains Mono"
                                    width={60}
                                />
                                <Tooltip
                                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                                    contentStyle={{
                                        backgroundColor: '#1B2430',
                                        border: '1px solid #2F3B4C',
                                        fontSize: '11px',
                                        fontFamily: 'JetBrains Mono'
                                    }}
                                />
                                <Bar dataKey="seek" radius={[0, 2, 2, 0]}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.name === bestResult?.algorithm ? '#D97706' : '#2F3B4C'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Table Section */}
                <Card className="lg:col-span-2 p-0 overflow-hidden border-border/50">
                    <div className="p-4 border-b border-border flex items-center gap-2 bg-surface/30">
                        <ListChecks size={16} className="text-primary" />
                        <h3 className="text-xs font-mono font-bold uppercase tracking-widest">Detailed Analysis</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left font-mono text-xs">
                            <thead>
                                <tr className="bg-surface/50 border-b border-border text-text-secondary uppercase tracking-widest">
                                    <th className="px-6 py-3 font-medium">Algorithm</th>
                                    <th className="px-6 py-3 font-medium">Total Seek</th>
                                    <th className="px-6 py-3 font-medium">Avg Seek</th>
                                    <th className="px-6 py-3 font-medium text-right">Sequence</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {results.map((res) => {
                                    const isBest = res.algorithm === bestResult?.algorithm;
                                    const isExpanded = expandedRow === res.algorithm;

                                    return (
                                        <React.Fragment key={res.algorithm}>
                                            <tr className={`transition-colors hover:bg-surface/30 ${isBest ? 'bg-primary/5' : ''}`}>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`font-bold ${isBest ? 'text-primary' : 'text-text-primary'}`}>
                                                            {res.algorithm}
                                                        </span>
                                                        {isBest && <Trophy size={12} className="text-primary" />}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-text-primary font-bold">{res.totalSeek}</td>
                                                <td className="px-6 py-4 text-text-secondary">{res.averageSeek.toFixed(2)}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => setExpandedRow(isExpanded ? null : res.algorithm)}
                                                        className="text-primary hover:text-primary-hover flex items-center gap-1 ml-auto transition-colors"
                                                    >
                                                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                                        <span>View Order</span>
                                                    </button>
                                                </td>
                                            </tr>
                                            {isExpanded && (
                                                <tr className="bg-background/50">
                                                    <td colSpan={4} className="px-6 py-4">
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            {res.sequence.map((track, idx) => (
                                                                <React.Fragment key={idx}>
                                                                    <span className={`px-1.5 py-0.5 rounded-sm border text-[10px] ${
                                                                        idx === 0
                                                                        ? 'bg-secondary/10 border-secondary/30 text-secondary'
                                                                        : 'bg-surface/50 border-border text-text-secondary'
                                                                    }`}>
                                                                        {track}
                                                                    </span>
                                                                    {idx < res.sequence.length - 1 && (
                                                                        <span className="text-border">→</span>
                                                                    )}
                                                                </React.Fragment>
                                                            ))}
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Compare;
