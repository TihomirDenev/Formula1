import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { Racer } from '@libs/models/racer.model';
import { HOF_CONSTANTS } from '@libs/constants/hof.constants';
import { HALL_OF_FAME } from './hof.data';

interface HofRacer extends Racer {
  championshipCount: number;
}

@Component({
  selector: 'app-hof',
  standalone: true,
  imports: [InfiniteScrollModule, TranslateModule],
  templateUrl: './hof.component.html',
  styleUrl: './hof.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HofComponent implements OnInit {
  private readonly router = inject(Router);

  readonly c = HOF_CONSTANTS;

  readonly hallOfFame: HofRacer[] = HALL_OF_FAME.map((racer) => ({
    ...racer,
    photo: `${HOF_CONSTANTS.photoBasePath}${racer.id}${HOF_CONSTANTS.photoExtension}`,
    championshipCount: racer.winDate.split(',').length,
  })).reverse();

  readonly totalChampions = this.hallOfFame.length;

  displayedRacers: HofRacer[] = [];

  ngOnInit(): void {
    this.loadMoreRacers();
  }

  loadMoreRacers(): void {
    const nextRacers = this.hallOfFame.slice(
      this.displayedRacers.length,
      this.displayedRacers.length + this.c.racersPerPage
    );
    this.displayedRacers = [...this.displayedRacers, ...nextRacers];
  }

  viewRacerDetails(racer: Racer): void {
    const formattedName = racer.name.split(' ').join('');
    this.router.navigate([this.c.routeBase, formattedName]);
  }
}
