export interface World {
  time: number;
  timeOffset: number;
}

export function createWorld(): World {
  return { time: 0, timeOffset: Date.now() }
}

