import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';

import { RACERS_INFO } from './racers.data';
import { RacerInfo } from '@libs/models/racer-info.model';
import { RACER_CONSTANTS } from '@libs/constants/racer.constants';

@Component({
  selector: 'app-racer',
  standalone: true,
  imports: [TranslateModule, RouterLink],
  templateUrl: './racer.component.html',
  styleUrl: './racer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RacerComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  readonly c = RACER_CONSTANTS;

  private readonly RACER = 'racer';

  racer: RacerInfo | undefined;

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const selectedRacer = params.get(this.RACER);
        if (!selectedRacer) return;
        this.racer = RACERS_INFO.find((r) => r.identifier === selectedRacer);
      });
  }
}
