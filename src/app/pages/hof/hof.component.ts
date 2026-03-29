import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { Racer } from '../../interfaces';
import { HALL_OF_FAME } from './hof.data';

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

  readonly RACERS_PER_PAGE = 10;

  readonly hallOfFame: Racer[] = HALL_OF_FAME.map((racer) => ({
    ...racer,
    photo: `assets/images/hof/${racer.id}.jpg`,
  })).reverse();

  displayedRacers: Racer[] = [];

  ngOnInit(): void {
    this.loadMoreRacers();
  }

  loadMoreRacers(): void {
    const nextRacers = this.hallOfFame.slice(
      this.displayedRacers.length,
      this.displayedRacers.length + this.RACERS_PER_PAGE
    );
    this.displayedRacers = [...this.displayedRacers, ...nextRacers];
  }

  viewRacerDetails(racer: Racer): void {
    const formattedName = racer.name.split(' ').join('');
    this.router.navigate(['/hall-of-fame', formattedName]);
  }
}
