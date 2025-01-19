import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Racer } from '../../interfaces';
import { HALL_OF_FAME } from './hof.data';

@Component({
  selector: 'app-hof',
  imports: [InfiniteScrollModule, CommonModule],
  templateUrl: './hof.component.html',
  styleUrl: './hof.component.scss',
})
export class HofComponent implements OnInit {
  readonly RACERS_PER_PAGE: number = 10;

  hallOfFame: Racer[] = [];
  displayedRacers: Racer[] = [];

  ngOnInit(): void {
    this.loadRacers();
    this.loadMoreRacers();
  }

  loadRacers(): void {
    this.hallOfFame = HALL_OF_FAME.map((racer) => ({
      ...racer,
      photo: `assets/images/hof/${racer.id}.jpg`,
    })).reverse();
  }

  loadMoreRacers(): void {
    const nextRacers = this.hallOfFame.slice(
      this.displayedRacers.length,
      this.displayedRacers.length + this.RACERS_PER_PAGE
    );
    this.displayedRacers.push(...nextRacers);
  }
}
