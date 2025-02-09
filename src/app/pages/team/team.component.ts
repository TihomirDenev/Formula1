import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { TEAMS_INFO } from './teams.data';
import { TeamInfo } from '../../interfaces';

@Component({
  selector: 'app-team',
  imports: [TranslateModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
})
export class TeamComponent implements OnInit {
  TEAM = 'team';
  TEAMS_INFO = TEAMS_INFO;

  team: TeamInfo | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getTeamInfo();
  }

  private getTeamInfo(): void {
    this.route.paramMap.subscribe((params) => {
      const selectedTeam = params.get(this.TEAM);

      this.team = this.TEAMS_INFO.find(
        (team) => team.identifier === selectedTeam!
      );
    });

    console.log(this.team);
  }
}
