import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { TEAMS_INFO } from './teams.data';
import { TeamInfo } from '@libs/models/team-info.model';
import { TEAM_CONSTANTS, TEAM_CAR_IDENTIFIERS } from '@libs/constants/team.constants';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  readonly c = TEAM_CONSTANTS;

  team: TeamInfo | undefined;

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const selectedTeam = params.get(TEAM_CONSTANTS.routeParam);
        if (!selectedTeam) return;
        this.team = TEAMS_INFO.find((t) => t.identifier === selectedTeam);
      });
  }

  getLogoSrc(name: string): string {
    const ext = this.c.logoSvgTeams.includes(name) ? '.svg' : this.c.logoExtension;
    return `${this.c.logoBasePath}${name}${ext}`;
  }

  hasCar(identifier: string): boolean {
    return TEAM_CAR_IDENTIFIERS.includes(identifier);
  }
}
