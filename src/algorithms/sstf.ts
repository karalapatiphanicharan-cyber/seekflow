import type { SimulationInput, SimulationResult } from './types';

export const sstf = (input: SimulationInput): SimulationResult => {
  const { requests, head } = input;
  const sequence: number[] = [head];
  const movements: number[] = [];
  let totalSeek = 0;

  let currentHead = head;
  const pendingRequests = [...requests];

  while (pendingRequests.length > 0) {
    let closestIndex = 0;
    let minDistance = Math.abs(pendingRequests[0] - currentHead);

    for (let i = 1; i < pendingRequests.length; i++) {
      const distance = Math.abs(pendingRequests[i] - currentHead);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }

    const nextTrack = pendingRequests.splice(closestIndex, 1)[0];
    sequence.push(nextTrack);
    movements.push(minDistance);
    totalSeek += minDistance;
    currentHead = nextTrack;
  }

  return {
    algorithm: 'SSTF',
    sequence,
    totalSeek,
    averageSeek: requests.length > 0 ? totalSeek / requests.length : 0,
    completedRequests: requests.length,
    movements,
  };
};
