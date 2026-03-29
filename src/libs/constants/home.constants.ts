export interface HomeStat {
  value: string;
  labelKey: string;
}

export interface HomeInfoSection {
  titleKey: string;
  introKey: string | null;
  paragraphKeys: string[];
  image: string;
  imageAlt: string;
  reverse: boolean;
}

export interface HomeVideo {
  titleKey: string;
  src: string;
}

export const HOME_STATS: HomeStat[] = [
  { value: '75', labelKey: 'home.statYears' },
  { value: '24', labelKey: 'home.statRaces' },
  { value: '10', labelKey: 'home.statTeams' },
  { value: '20', labelKey: 'home.statDrivers' },
];

export const HOME_INFO_SECTIONS: HomeInfoSection[] = [
  {
    titleKey: 'home.welcomeTitle',
    introKey: null,
    paragraphKeys: ['home.f1Introduction', 'home.f1Championship', 'home.f1SprintRaces'],
    image: 'assets/images/logo.jpg',
    imageAlt: 'Formula 1 Racing',
    reverse: false,
  },
  {
    titleKey: 'home.tyreTitle',
    introKey: 'home.tyreIntro',
    paragraphKeys: ['home.supplier', 'home.compounds', 'home.technology'],
    image: 'assets/images/tyres.jpg',
    imageAlt: 'F1 Tyres',
    reverse: true,
  },
  {
    titleKey: 'home.circuitTitle',
    introKey: 'home.circuitIntro',
    paragraphKeys: [
      'home.circuitMonaco',
      'home.circuitSilverstone',
      'home.circuitSuzuka',
      'home.circuitSpa',
      'home.circuitMonza',
    ],
    image: 'assets/images/circuit.jpg',
    imageAlt: 'F1 Circuit',
    reverse: false,
  },
];

export const HOME_VIDEOS: HomeVideo[] = [
  { titleKey: 'home.formulaOneVid', src: 'assets/videos/This is Formula One.mp4' },
  { titleKey: 'home.grosjeanVid', src: "assets/videos/Grosjean's Insane Fireball Crash.mp4" },
  { titleKey: 'home.topFiveVid', src: 'assets/videos/Most Nail-Biting Moments.mp4' },
];

export const HOME_CONSTANTS = {
  heroBg: 'assets/images/logo.jpg',
  heroBgAlt: 'Formula 1',
  videoPoster: 'assets/images/play.png',
  hofRoute: '/hall-of-fame',
} as const;
