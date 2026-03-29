export interface F1Team {
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
