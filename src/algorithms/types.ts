export type Direction = 'left' | 'right';

export interface SimulationInput {
  requests: number[];
  head: number;
  diskSize: number;
  direction: Direction;
}

export interface SimulationResult {
  algorithm: string;
  sequence: number[]; // includes the initial head as the first element
  totalSeek: number;
  averageSeek: number;
  completedRequests: number;
  movements: number[];
}

export type AlgorithmFn = (input: SimulationInput) => SimulationResult;
