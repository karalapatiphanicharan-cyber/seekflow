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

  let fullPath: number[] = [];

  if (direction === 'right') {
    const right = sortedRequests.filter(r => r >= head);
    const left = sortedRequests.filter(r => r < head);
    // 53 -> (right requests) -> diskSize-1 -> 0 -> (left requests)
    fullPath = [...right];
    if (fullPath[fullPath.length - 1] !== diskSize - 1) {
      fullPath.push(diskSize - 1);
    }
    fullPath.push(0);
    fullPath = [...fullPath, ...left];
  } else {
    const left = sortedRequests.filter(r => r <= head).reverse();
    const right = sortedRequests.filter(r => r > head).reverse();
    // 53 -> (left requests) -> 0 -> diskSize-1 -> (right requests)
    fullPath = [...left];
    if (fullPath[fullPath.length - 1] !== 0) {
      fullPath.push(0);
    }
    fullPath.push(diskSize - 1);
    fullPath = [...fullPath, ...right];
  }

  let currentHead = head;
  for (const track of fullPath) {
    // For C-SCAN, the jump from boundary to boundary IS often counted as seek distance
    // depending on the textbook, but the prompt says "Include the jump distance in total seek calculation."
    const movement = Math.abs(track - currentHead);
    if (movement === 0 && sequence.length > 1) continue; // Skip redundant points if they are already there

    // Only add to sequence if it's not the same as currentHead (unless it's the first move)
    if (track !== currentHead) {
      sequence.push(track);
      movements.push(movement);
      totalSeek += movement;
      currentHead = track;
    }
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
