import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { RACERS_INFO } from './racers.data';
import { RacerInfo } from '../../interfaces';

@Component({
  selector: 'app-racer',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './racer.component.html',
  styleUrl: './racer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RacerComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

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
