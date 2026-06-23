import type { SimulationInput, SimulationResult } from './types';

export const fcfs = (input: SimulationInput): SimulationResult => {
  const { requests, head } = input;
  const sequence = [head, ...requests];
  const movements: number[] = [];
  let totalSeek = 0;

  for (let i = 1; i < sequence.length; i++) {
    const movement = Math.abs(sequence[i] - sequence[i - 1]);
    movements.push(movement);
    totalSeek += movement;
  }

  return {
    algorithm: 'FCFS',
    sequence,
    totalSeek,
    averageSeek: requests.length > 0 ? totalSeek / requests.length : 0,
    completedRequests: requests.length,
    movements,
  };
};
