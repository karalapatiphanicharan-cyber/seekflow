import type { SimulationInput, SimulationResult } from './types';

export const scan = (input: SimulationInput): SimulationResult => {
  const { requests, head, diskSize, direction } = input;
  const sequence: number[] = [head];
  const movements: number[] = [];
  let totalSeek = 0;

  if (requests.length === 0) {
    return {
      algorithm: 'SCAN',
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
    // 53 -> (left requests) -> 0 -> (right requests)
    fullPath = [...left, 0, ...right];
  } else {
    // 53 -> (right requests) -> diskSize-1 -> (left requests)
    fullPath = [...right, diskSize - 1, ...left];
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
    algorithm: 'SCAN',
    sequence,
    totalSeek,
    averageSeek: requests.length > 0 ? totalSeek / requests.length : 0,
    completedRequests: requests.length,
    movements,
  };
};
