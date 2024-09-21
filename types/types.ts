export interface State {
  horses: Horse[];
  races: Race[];
  results: RaceResult[];
  isRacing: boolean;
  currentRaceId: number | null;
  isGenerated: boolean;
  programStarted: boolean;
  programFinished: boolean;
}

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

export interface Position {
  horseId: number
  position: number
}

export interface RaceResult {
  raceId: number
  positions: Position[]
}