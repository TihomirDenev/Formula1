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
