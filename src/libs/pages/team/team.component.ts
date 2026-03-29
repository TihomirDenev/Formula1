import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { TEAMS_INFO } from './teams.data';
import { TeamInfo } from '@libs/models/team-info.model';

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

  private readonly TEAM = 'team';

  team: TeamInfo | undefined;

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const selectedTeam = params.get(this.TEAM);
        if (!selectedTeam) return;
        this.team = TEAMS_INFO.find((t) => t.identifier === selectedTeam);
      });
  }
}
