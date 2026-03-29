import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { F1_TEAMS } from './teams.data';
import { F1_Team } from '../../interfaces';

const TEAM_NAME_MAP: Record<string, string> = {
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

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [TranslateModule, InfiniteScrollModule],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamsComponent implements OnInit {
  private readonly router = inject(Router);

  readonly TEAMS_PER_PAGE = 2;

  readonly allTeams: F1_Team[] = F1_TEAMS.map((team, index) => ({
    ...team,
    photo: `assets/images/teams/${index + 1}.webp`,
    logo: `assets/images/logos/${index + 1}.png`,
  }));

  displayedTeams: F1_Team[] = [];

  ngOnInit(): void {
    this.loadMoreTeams();
  }

  loadMoreTeams(): void {
    const nextTeams = this.allTeams.slice(
      this.displayedTeams.length,
      this.displayedTeams.length + this.TEAMS_PER_PAGE
    );
    this.displayedTeams = [...this.displayedTeams, ...nextTeams];
  }

  getTeamInfoTranslation(teamName: string): string {
    return `teamInfo.${TEAM_NAME_MAP[teamName] ?? teamName}`;
  }

  viewTeamDetails(team: F1_Team): void {
    const formattedName = team.name.split(' ').join('');
    this.router.navigate(['/teams', formattedName]);
  }
}
