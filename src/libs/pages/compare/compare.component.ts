import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { RacerInfo } from '@libs/models/racer-info.model';
import { COMPARE_CONSTANTS } from '@libs/constants/compare.constants';
import { RACERS_INFO } from '@libs/pages/racer/racers.data';
import { HALL_OF_FAME } from '@libs/pages/hof/hof.data';

interface CompareRacer extends RacerInfo {
  championships: number;
  photo: string;
}

@Component({
  selector: 'app-compare',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './compare.component.html',
  styleUrl: './compare.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompareComponent {
  readonly c = COMPARE_CONSTANTS;

  readonly allRacers: CompareRacer[] = RACERS_INFO.map((info) => {
    const hofEntry = HALL_OF_FAME.find((h) => h.id === info.id);
    return {
      ...info,
      championships: hofEntry ? hofEntry.winDate.split(',').length : 0,
      photo: `${COMPARE_CONSTANTS.photoBasePath}${info.id}${COMPARE_CONSTANTS.photoExtension}`,
    };
  }).sort((a, b) => a.name.localeCompare(b.name));

  readonly driverAId = signal<number | null>(null);
  readonly driverBId = signal<number | null>(null);

  readonly driverA = computed(() => this.allRacers.find((r) => r.id === this.driverAId()) ?? null);
  readonly driverB = computed(() => this.allRacers.find((r) => r.id === this.driverBId()) ?? null);

  readonly comparison = computed(() => {
    const a = this.driverA();
    const b = this.driverB();
    if (!a || !b) return null;
    return { a, b };
  });

  onDriverAChange(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.driverAId.set(val ? Number(val) : null);
  }

  onDriverBChange(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.driverBId.set(val ? Number(val) : null);
  }

  getLogoSrc(team: string): string {
    const ext = this.c.logoSvgTeams.includes(team) ? '.svg' : this.c.logoExtension;
    return `${this.c.logoBasePath}${team}${ext}`;
  }
}
