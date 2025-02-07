import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { F1_TEAMS } from './teams.data';
import { F1_Team } from '../../interfaces';

@Component({
  selector: 'app-teams',
  imports: [TranslateModule, CommonModule],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss',
})
export class TeamsComponent implements OnInit {
  readonly TEAMS_PHOTO_COUNT = 14;

  F1_TEAMS = F1_TEAMS;

  teamsPhotos: string[] = [];
  logoPhotos: string[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadTeamsAndLogos();
  }

  loadTeamsAndLogos(): void {
    for (let i = 1; i <= this.TEAMS_PHOTO_COUNT; i++) {
      this.teamsPhotos.push(`assets/images/teams/${i}.jpg`);
      this.logoPhotos.push(`assets/images/logos/${i}.png`);
    }
  }

  viewTeamDetails(team: F1_Team): void {
    const formattedName = team.name.split(' ').join('');
    this.router.navigate(['/teams', formattedName]);
  }
}
