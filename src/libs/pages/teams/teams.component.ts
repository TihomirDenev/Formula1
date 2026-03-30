import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { F1Team } from '@libs/models/f1-team.model';
import { TEAMS_CONSTANTS } from '@libs/constants/teams.constants';
import { F1_TEAMS } from './teams.data';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamsComponent {
  private readonly router = inject(Router);

  readonly c = TEAMS_CONSTANTS;

  readonly allTeams: F1Team[] = F1_TEAMS.map((team, index) => ({
    ...team,
    photo:
      team.photo ??
      (index + 1 <= TEAMS_CONSTANTS.photoCount
        ? `${TEAMS_CONSTANTS.photoBasePath}${index + 1}${TEAMS_CONSTANTS.photoExtension}`
        : undefined),
    logo: team.logo ?? `${TEAMS_CONSTANTS.logoBasePath}${index + 1}${TEAMS_CONSTANTS.logoExtension}`,
  }));

  getTeamInfoTranslation(teamName: string): string {
    return `teamInfo.${teamName}`;
  }

  viewTeamDetails(team: F1Team): void {
    const formattedName = team.name.split(' ').join('');
    this.router.navigate([TEAMS_CONSTANTS.routeBase, formattedName]);
  }
}
