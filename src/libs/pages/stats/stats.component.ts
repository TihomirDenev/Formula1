import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { STATS_CONSTANTS } from '@libs/constants/stats.constants';
import { HALL_OF_FAME } from '@libs/pages/hof/hof.data';
import { RACERS_INFO } from '@libs/pages/racer/racers.data';

interface CountryStat {
  country: string;
  flag: string;
  count: number;
}

interface WinnerStat {
  name: string;
  flag: string;
  wins: number;
}

interface DecadeStat {
  decade: string;
  count: number;
  ongoing: boolean;
}

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsComponent {
  readonly c = STATS_CONSTANTS;

  readonly byCountry: CountryStat[] = this.buildByCountry();
  readonly topWinners: WinnerStat[] = this.buildTopWinners();
  readonly byDecade: DecadeStat[] = this.buildByDecade();

  readonly maxCountryCount = Math.max(...this.byCountry.map((c) => c.count));
  readonly maxWins = this.topWinners[0]?.wins ?? 0;
  readonly maxDecadeCount = Math.max(...this.byDecade.map((d) => d.count));

  private buildByCountry(): CountryStat[] {
    const map = new Map<string, { flag: string; count: number }>();

    for (const racer of HALL_OF_FAME) {
      const titles = racer.winDate.split(',').length;
      const existing = map.get(racer.country);
      if (existing) {
        existing.count += titles;
      } else {
        map.set(racer.country, { flag: racer.flag, count: titles });
      }
    }

    return Array.from(map.entries())
      .map(([country, data]) => ({ country, flag: data.flag, count: data.count }))
      .sort((a, b) => b.count - a.count);
  }

  private buildTopWinners(): WinnerStat[] {
    return RACERS_INFO.map((r) => ({ name: r.name, flag: r.flag, wins: r.wins }))
      .sort((a, b) => b.wins - a.wins)
      .slice(0, 10);
  }

  private buildByDecade(): DecadeStat[] {
    const map = new Map<string, number>();
    const currentYear = new Date().getFullYear();

    for (const racer of HALL_OF_FAME) {
      for (const yearStr of racer.winDate.split(',')) {
        const year = parseInt(yearStr.trim(), 10);
        const decade = `${Math.floor(year / 10) * 10}s`;
        map.set(decade, (map.get(decade) ?? 0) + 1);
      }
    }

    return Array.from(map.entries())
      .map(([decade, count]) => {
        const decadeStart = parseInt(decade, 10);
        const ongoing = decadeStart + 9 >= currentYear;
        return { decade, count, ongoing };
      })
      .sort((a, b) => a.decade.localeCompare(b.decade));
  }

  pct(value: number, max: number): string {
    return `${Math.round((value / max) * 100)}%`;
  }
}
