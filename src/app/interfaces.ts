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
