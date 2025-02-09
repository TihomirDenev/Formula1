export interface PointsSystem {
  position: number | string;
  pointsByEra1: string;
  pointsByEra2: string;
  pointsByEra3: string;
  pointsByEra4: string;
  pointsByEra5: string;
  pointsByEra6: string;
}

export interface Racer {
  id: number;
  name: string;
  country: string;
  winDate: string;
  photo: string;
  flag: string;
}

export interface F1_Team {
  id: number;
  name: string;
  originCountry: string;
  originCountryFlag: string;
  headquarters: string;
  headquartersFlag: string;
  foundedYear: number;
  grandPrixWins: number;
  constructorChampionships: number;
  photo?: string;
  logo?: string;
}

export interface RacerInfo {
  id: number;
  identifier: string;
  name: string;
  country: string;
  flag: string;
  wins: number;
  placeOfBirth: string;
  dateOfBirth: string;
  dateOfDeath: string;
  f1Teams: string[];
}

export interface TeamInfo {
  id: number;
  identifier: string;
  name: string;
  fullName: string;
  base: string;
  flag: string;
  teamChief: string;
  technicalChief: string;
  chassis: string;
  powerUnit: string;
  firstTeamEntry: number;
  worldChampionships: number;
  highestRaceFinish: string;
  polePositions: number;
  fastestLaps: number;
  photo?: string;
}
