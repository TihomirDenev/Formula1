export const TEAMS_CONSTANTS = {
  teamsPerPage: 2,
  photoBasePath: 'assets/images/teams/',
  logoBasePath: 'assets/images/logos/',
  photoExtension: '.webp',
  logoExtension: '.png',
  photoCount: 21,
  routeBase: '/teams',
  heroIcon: 'fas fa-flag-checkered',
} as const;

export const TEAM_NAME_MAP: Record<string, string> = {
  'Red Bull Racing': 'RedBull',
  Mercedes: 'Mercedes',
  Ferrari: 'Ferrari',
  McLaren: 'McLaren',
  'Aston Martin': 'AstonMartin',
  Alpine: 'Alpine',
  Williams: 'Williams',
  Haas: 'Haas',
  'Visa Cash App RB': 'VisaCashAppRB',
  'Kick Sauber': 'KickSauber',
};
