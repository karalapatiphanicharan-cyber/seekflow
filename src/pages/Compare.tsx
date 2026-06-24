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
import { Trophy, ChevronDown, ChevronUp, Activity, ListChecks, RotateCcw, Dice5, Lightbulb, Loader2, FileDown } from 'lucide-react';
import { exportToPDF } from '../utils/pdfExport';

const DEFAULT_HEAD = 53;
const DEFAULT_DISK_SIZE = 200;
const DEFAULT_DIRECTION: Direction = 'right';
const EXAMPLE_REQUESTS = '98, 183, 37, 122, 14, 124, 65, 67';

const Compare: React.FC = () => {
  // Input State
  const [head, setHead] = useState<number>(DEFAULT_HEAD);
  const [diskSize, setDiskSize] = useState<number>(DEFAULT_DISK_SIZE);
  const [direction, setDirection] = useState<Direction>(DEFAULT_DIRECTION);
  const [requestString, setRequestString] = useState<string>(EXAMPLE_REQUESTS);

  // Results State
  const [results, setResults] = useState<SimulationResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    if (!requestString.trim()) {
        setError('Request sequence cannot be empty.');
        return;
    }

    if (isNaN(head) || head < 0 || head >= diskSize) {
      setError(`Initial head position must be between 0 and ${diskSize - 1}.`);
      return;
    }

    const parts = requestString.split(',').map(s => s.trim()).filter(s => s !== '');
    for (const part of parts) {
        const n = Number(part);
        if (isNaN(n)) {
            setError(`Invalid value detected: "${part}". Please use numeric values only.`);
            return;
        }
        if (n < 0 || n >= diskSize) {
            setError(`Request ${n} is outside disk boundaries (0-${diskSize - 1}).`);
            return;
        }
    }

    setError(null);
    setIsLoading(true);
    setResults(null);
    setExpandedRow(null);

    setTimeout(() => {
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
        setIsLoading(false);
    }, 400);
  }, [head, diskSize, direction, parsedRequests, requestString]);

  const handleRandom = useCallback(() => {
    const count = Math.floor(Math.random() * 5) + 8; // 8-12
    const randomSet = new Set<number>();
    while (randomSet.size < count) {
        randomSet.add(Math.floor(Math.random() * diskSize));
    }
    setRequestString(Array.from(randomSet).sort(() => Math.random() - 0.5).join(', '));
    setError(null);
  }, [diskSize]);

  const handleExample = useCallback(() => {
    setHead(53);
    setDiskSize(200);
    setDirection('right');
    setRequestString(EXAMPLE_REQUESTS);
    setError(null);
  }, []);

  const handleClear = useCallback(() => {
    setHead(DEFAULT_HEAD);
    setDiskSize(DEFAULT_DISK_SIZE);
    setDirection(DEFAULT_DIRECTION);
    setRequestString('');
    setResults(null);
    setError(null);
    setExpandedRow(null);
  }, []);

  const winners = useMemo(() => {
    if (!results) return [];
    const minSeek = Math.min(...results.map(r => r.totalSeek));
    return results.filter(r => r.totalSeek === minSeek);
  }, [results]);

  const isWinner = (algo: string) => winners.some(w => w.algorithm === algo);

  const handleExportPDF = useCallback(() => {
    if (!results) return;
    exportToPDF({
        head,
        diskSize,
        direction,
        requestString,
        results
    });
  }, [results, head, diskSize, direction, requestString]);

  return (
    <main className="flex-1 overflow-y-auto p-5 space-y-8 bg-background">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header Section */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <SectionTitle subtitle="Analyze and compare algorithm efficiency">Performance Comparison</SectionTitle>
            <div className="flex flex-wrap items-center gap-2">
                <Button variant="secondary" size="sm" onClick={handleExample} disabled={isLoading}>
                    <Lightbulb size={14} className="mr-1.5" /> Example
                </Button>
                <Button variant="secondary" size="sm" onClick={handleRandom} disabled={isLoading}>
                    <Dice5 size={14} className="mr-1.5" /> Random
                </Button>
                <Button variant="secondary" size="sm" onClick={handleClear} disabled={isLoading}>
                    <RotateCcw size={14} className="mr-1.5" /> Clear
                </Button>

                <div className="w-px h-6 bg-border mx-1 hidden sm:block" />

                <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleExportPDF}
                    disabled={isLoading || !results}
                    className={!results ? "opacity-50 cursor-not-allowed" : ""}
                >
                    <FileDown size={14} className="mr-1.5" /> Export PDF
                </Button>

                <Button variant="primary" size="lg" onClick={handleCompare} disabled={isLoading} className="md:w-48 shadow-lg shadow-primary/20">
                    {isLoading ? (
                        <>
                            <Loader2 size={18} className="mr-2 animate-spin" /> Comparing...
                        </>
                    ) : (
                        <>
                            <Activity size={18} className="mr-2" /> Compare All
                        </>
                    )}
                </Button>
            </div>
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

        {!results && !isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center text-text-secondary border-2 border-dashed border-border/50 rounded-sm bg-surface/5">
                 <ListChecks size={48} className="opacity-20 mb-4" />
                 <p className="font-mono text-sm uppercase tracking-widest opacity-50 text-center px-4">Run Compare All to analyze results.</p>
            </div>
        ) : isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center">
                 <Loader2 size={48} className="text-primary animate-spin mb-4" />
                 <p className="font-mono text-sm uppercase tracking-widest text-primary animate-pulse">Running Calculations</p>
            </div>
        ) : results && (
          <>
            {/* Summary Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className={`p-4 border rounded-sm flex flex-col justify-between transition-colors ${winners.length > 1 ? 'bg-secondary/5 border-secondary/30' : 'bg-primary/5 border-primary/30'}`}>
                    <span className="text-[10px] font-mono uppercase text-text-secondary tracking-widest">
                        {winners.length > 1 ? `${winners.length}-Way Tie` : 'Best Performer'}
                    </span>
                    <div className="flex items-center gap-2 mt-2">
                        <Trophy size={16} className={winners.length > 1 ? 'text-secondary' : 'text-primary'} />
                        <span className="text-sm font-bold text-text-primary break-all leading-tight">
                            {winners.map(w => w.algorithm).join(', ')}
                        </span>
                    </div>
                </div>
                <div className="p-4 bg-surface/50 border border-border rounded-sm flex flex-col justify-between border-l-4 border-l-primary">
                    <span className="text-[10px] font-mono uppercase text-text-secondary tracking-widest">Lowest Seek</span>
                    <span className="text-2xl font-bold text-text-primary mt-2">{winners[0]?.totalSeek} <span className="text-xs font-normal text-text-secondary uppercase">tracks</span></span>
                </div>
                <div className="p-4 bg-surface/50 border border-border rounded-sm flex flex-col justify-between">
                    <span className="text-[10px] font-mono uppercase text-text-secondary tracking-widest">Avg Seek (Best)</span>
                    <span className="text-lg font-bold text-text-primary mt-2">{winners[0]?.averageSeek.toFixed(2)}</span>
                </div>
                <div className="p-4 bg-surface/50 border border-border rounded-sm flex flex-col justify-between">
                    <span className="text-[10px] font-mono uppercase text-text-secondary tracking-widest">Algorithms</span>
                    <span className="text-lg font-bold text-text-primary mt-2">{results.length}</span>
                </div>
                <div className="p-4 bg-surface/50 border border-border rounded-sm flex flex-col justify-between">
                    <span className="text-[10px] font-mono uppercase text-text-secondary tracking-widest">Total Requests</span>
                    <span className="text-lg font-bold text-text-primary mt-2">{results[0]?.completedRequests}</span>
                </div>
            </section>

            {/* Table Section - Full Width */}
            <Card className="w-full p-0 overflow-hidden border-border/50">
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
                                const winning = isWinner(res.algorithm);
                                const isExpanded = expandedRow === res.algorithm;

                                return (
                                    <React.Fragment key={res.algorithm}>
                                        <tr className={`transition-colors hover:bg-surface/30 ${winning ? 'bg-primary/5' : ''}`}>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className={`font-bold ${winning ? 'text-primary' : 'text-text-primary'}`}>
                                                        {res.algorithm}
                                                    </span>
                                                    {winning && <Trophy size={12} className="text-primary" />}
                                                </div>
                                            </td>
                                            <td className={`px-6 py-4 font-bold ${winning ? 'text-primary' : 'text-text-primary'}`}>{res.totalSeek}</td>
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
          </>
        )}
      </div>
    </main>
  );
};

export default Compare;
