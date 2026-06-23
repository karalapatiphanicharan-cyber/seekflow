import type { SimulationInput, SimulationResult } from './types';

export const cscan = (input: SimulationInput): SimulationResult => {
  const { requests, head, diskSize, direction } = input;
  const sequence: number[] = [head];
  const movements: number[] = [];
  let totalSeek = 0;

  if (requests.length === 0) {
    return {
      algorithm: 'C-SCAN',
      sequence,
      totalSeek: 0,
      averageSeek: 0,
      completedRequests: 0,
      movements: [],
    };
  }

  const sortedRequests = [...requests].sort((a, b) => a - b);
  const left = sortedRequests.filter(r => r < head);
  const right = sortedRequests.filter(r => r >= head);

  let fullPath: number[] = [];

  if (direction === 'right') {
    // 53 -> (right requests) -> diskSize-1 -> 0 -> (left requests)
    fullPath = [...right, diskSize - 1, 0, ...left];
  } else {
    // 53 -> (left requests) -> 0 -> diskSize-1 -> (right requests)
    // C-SCAN usually moves in one direction, if it goes left, it stays left?
    // "Move in one direction only. Upon reaching the boundary: jump to opposite boundary."
    fullPath = [...left.reverse(), 0, diskSize - 1, ...right.reverse()];
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
    algorithm: 'C-SCAN',
    sequence,
    totalSeek,
    averageSeek: requests.length > 0 ? totalSeek / requests.length : 0,
    completedRequests: requests.length,
    movements,
  };
};
