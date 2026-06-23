import type { SimulationInput, SimulationResult } from './types';

export const look = (input: SimulationInput): SimulationResult => {
  const { requests, head, direction } = input;
  const sequence: number[] = [head];
  const movements: number[] = [];
  let totalSeek = 0;

  if (requests.length === 0) {
    return {
      algorithm: 'LOOK',
      sequence,
      totalSeek: 0,
      averageSeek: 0,
      completedRequests: 0,
      movements: [],
    };
  }

  const sortedRequests = [...requests].sort((a, b) => a - b);
  const left = sortedRequests.filter(r => r < head).reverse();
  const right = sortedRequests.filter(r => r >= head);

  let fullPath: number[] = [];

  if (direction === 'left') {
    // 53 -> (left requests) -> (right requests)
    fullPath = [...left, ...right];
  } else {
    // 53 -> (right requests) -> (left requests)
    fullPath = [...right, ...left];
  }

  let currentHead = head;
  for (const track of fullPath) {
    const movement = Math.abs(track - currentHead);
    sequence.push(track);
    movements.push(movement);
    totalSeek += movement;
    currentHead = track;
  }

  return {
    algorithm: 'LOOK',
    sequence,
    totalSeek,
    averageSeek: requests.length > 0 ? totalSeek / requests.length : 0,
    completedRequests: requests.length,
    movements,
  };
};
