import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import type { SimulationInput, SimulationResult, Direction } from '../algorithms/types';
import { fcfs, sstf, scan, cscan, look, clook } from '../algorithms';

export const ALGORITHMS = ['FCFS', 'SSTF', 'SCAN', 'C-SCAN', 'LOOK', 'C-LOOK'] as const;
export type AlgorithmType = (typeof ALGORITHMS)[number];

const DEFAULT_HEAD = 53;
const DEFAULT_DISK_SIZE = 200;
const DEFAULT_DIRECTION: Direction = 'right';
const DEFAULT_REQUESTS = '98, 183, 37, 122, 14, 124, 65, 67';

export const useSimulation = () => {
  const [algorithm, setAlgorithm] = useState<AlgorithmType>('FCFS');
  const [head, setHead] = useState<number>(DEFAULT_HEAD);
  const [diskSize, setDiskSize] = useState<number>(DEFAULT_DISK_SIZE);
  const [direction, setDirection] = useState<Direction>(DEFAULT_DIRECTION);
  const [requestString, setRequestString] = useState<string>(DEFAULT_REQUESTS);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Playback State
  const [playbackStep, setPlaybackStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  const playbackStepRef = useRef(0);
  const isPlayingRef = useRef(false);
  const resultRef = useRef<SimulationResult | null>(null);
  const speedRef = useRef(1);

  useEffect(() => { playbackStepRef.current = playbackStep; }, [playbackStep]);
  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);
  useEffect(() => { resultRef.current = result; }, [result]);
  useEffect(() => { speedRef.current = playbackSpeed; }, [playbackSpeed]);

  const parsedRequests = useMemo(() => {
    if (!requestString.trim()) return [];
    return requestString
      .split(',')
      .map(s => s.trim())
      .filter(s => s !== '')
      .map(Number)
      .filter(n => !isNaN(n));
  }, [requestString]);

  const validate = useCallback((): string | null => {
    if (isNaN(head) || head < 0 || head >= diskSize) {
      return `Initial head position must be between 0 and ${diskSize - 1}.`;
    }
    if (isNaN(diskSize) || diskSize <= 0) {
      return 'Disk size must be a positive number.';
    }

    const parts = requestString.split(',').map(s => s.trim()).filter(s => s !== '');
    if (parts.length === 0 && requestString.trim() !== '') {
        return 'Invalid request sequence. Please use comma-separated numbers.';
    }

    for (const part of parts) {
        const n = Number(part);
        if (isNaN(n)) {
            return `Invalid value detected: "${part}". Please enter numbers only.`;
        }
        if (n < 0 || n >= diskSize) {
            return `Request ${n} is outside disk boundaries (0-${diskSize - 1}).`;
        }
    }

    return null;
  }, [head, diskSize, requestString]);

  const resetPlayback = useCallback(() => {
    setIsPlaying(false);
    setPlaybackStep(0);
  }, []);

  const runSimulation = useCallback(() => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      setResult(null);
      return;
    }

    setError(null);
    const input: SimulationInput = {
      requests: parsedRequests,
      head,
      diskSize,
      direction,
    };

    let simulationResult: SimulationResult;

    switch (algorithm) {
      case 'SSTF':
        simulationResult = sstf(input);
        break;
      case 'SCAN':
        simulationResult = scan(input);
        break;
      case 'C-SCAN':
        simulationResult = cscan(input);
        break;
      case 'LOOK':
        simulationResult = look(input);
        break;
      case 'C-LOOK':
        simulationResult = clook(input);
        break;
      case 'FCFS':
      default:
        simulationResult = fcfs(input);
        break;
    }

    setResult(simulationResult);
    setPlaybackStep(0);
    // Auto-start playback
    setTimeout(() => setIsPlaying(true), 100);
  }, [algorithm, head, diskSize, direction, parsedRequests, validate]);

  useEffect(() => {
    resetPlayback();
    setResult(null);
  }, [algorithm, head, diskSize, direction, requestString, resetPlayback]);

  const togglePlay = useCallback(() => {
    if (!result) return;
    setIsPlaying(prev => !prev);
  }, [result]);

  const nextStep = useCallback(() => {
    if (!result) return;
    setPlaybackStep(prev => Math.min(prev + 1, result.sequence.length - 1));
  }, [result]);

  const prevStep = useCallback(() => {
    if (!result) return;
    setPlaybackStep(prev => Math.max(prev - 1, 0));
  }, [result]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    const tick = () => {
      if (isPlayingRef.current && resultRef.current && playbackStepRef.current < resultRef.current.sequence.length - 1) {
        setPlaybackStep(prev => prev + 1);
        timer = setTimeout(tick, 1000 / speedRef.current);
      } else if (playbackStepRef.current >= (resultRef.current?.sequence.length || 0) - 1) {
        setIsPlaying(false);
      }
    };

    if (isPlaying) {
        timer = setTimeout(tick, 1000 / playbackSpeed);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, playbackSpeed]);

  const generateRandom = useCallback(() => {
    const count = Math.floor(Math.random() * 5) + 8; // 8-12
    const randomSet = new Set<number>();
    while (randomSet.size < count) {
        randomSet.add(Math.floor(Math.random() * diskSize));
    }
    setRequestString(Array.from(randomSet).join(', '));
    setError(null);
    setResult(null);
    resetPlayback();
  }, [diskSize, resetPlayback]);

  const loadExample = useCallback(() => {
    setAlgorithm('FCFS');
    setHead(53);
    setDiskSize(200);
    setDirection('left');
    setRequestString('98, 183, 37, 122, 14, 124, 65, 67');
    setError(null);
    setResult(null);
    resetPlayback();
  }, [resetPlayback]);

  const reset = useCallback(() => {
    setAlgorithm('FCFS');
    setHead(DEFAULT_HEAD);
    setDiskSize(DEFAULT_DISK_SIZE);
    setDirection(DEFAULT_DIRECTION);
    setRequestString('');
    setResult(null);
    setError(null);
    resetPlayback();
  }, [resetPlayback]);

  return {
    algorithm, setAlgorithm,
    head, setHead,
    diskSize, setDiskSize,
    direction, setDirection,
    requestString, setRequestString,
    parsedRequests,
    result,
    error,
    runSimulation,
    generateRandom,
    loadExample,
    reset,
    // Playback
    playbackStep,
    isPlaying,
    playbackSpeed,
    setPlaybackSpeed,
    togglePlay,
    resetPlayback,
    nextStep,
    prevStep,
  };
};

export type SimulationState = ReturnType<typeof useSimulation>;
