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

  let fullPath: number[] = [];

  if (direction === 'left') {
    const left = sortedRequests.filter(r => r < head).reverse();
    const right = sortedRequests.filter(r => r >= head);
    // 53 -> (left requests) -> 0 -> (right requests)
    fullPath = [...left];
    if (fullPath.length === 0 || fullPath[fullPath.length - 1] !== 0) {
        fullPath.push(0);
    }
    fullPath = [...fullPath, ...right];
  } else {
    const right = sortedRequests.filter(r => r > head);
    const left = sortedRequests.filter(r => r <= head).reverse();
    // 53 -> (right requests) -> diskSize-1 -> (left requests)
    fullPath = [...right];
    if (fullPath.length === 0 || fullPath[fullPath.length - 1] !== diskSize - 1) {
        fullPath.push(diskSize - 1);
    }
    fullPath = [...fullPath, ...left];
  }

  let currentHead = head;
  for (const track of fullPath) {
    const movement = Math.abs(track - currentHead);
    if (track !== currentHead) {
      sequence.push(track);
      movements.push(movement);
      totalSeek += movement;
      currentHead = track;
    }
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
