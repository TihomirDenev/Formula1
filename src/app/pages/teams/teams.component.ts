import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { F1_TEAMS } from './teams.data';
import { F1_Team } from '../../interfaces';

@Component({
  selector: 'app-teams',
  imports: [TranslateModule, CommonModule, InfiniteScrollModule],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss',
})
export class TeamsComponent implements OnInit {
  readonly TEAMS_PER_PAGE: number = 2;

  allTeams: F1_Team[] = [];
  displayedTeams: F1_Team[] = [];

  teamsPhotos: string[] = [];
  logoPhotos: string[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadTeams();
    this.loadMoreTeams();
  }

  loadTeams(): void {
    this.allTeams = F1_TEAMS.map((team, index) => ({
      ...team,
      photo: `assets/images/teams/${index + 1}.webp`,
      logo: `assets/images/logos/${index + 1}.png`,
    }));
  }

  loadMoreTeams(): void {
    const nextTeams = this.allTeams.slice(
      this.displayedTeams.length,
      this.displayedTeams.length + this.TEAMS_PER_PAGE
    );
    this.displayedTeams.push(...nextTeams);
  }

  viewTeamDetails(team: F1_Team): void {
    const formattedName = team.name.split(' ').join('');
    this.router.navigate(['/teams', formattedName]);
  }
}
