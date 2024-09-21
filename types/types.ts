export interface Horse {
  id: number;
  color: string;
  condition: number;
  name: string;
}

export interface Race {
  id: number;
  name: string;
  distance: number;
  participants: Horse[];
}

export interface RaceResult {
  raceId: number;
  positions: { horseId: number; position: number }[];
}