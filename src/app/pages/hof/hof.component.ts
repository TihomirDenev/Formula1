import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { Racer } from '../../interfaces';
import { HALL_OF_FAME } from './hof.data';
import { ImageOptimizationService } from '../../services/image-optimization.service';

@Component({
  selector: 'app-hof',
  imports: [InfiniteScrollModule, CommonModule, TranslateModule],
  templateUrl: './hof.component.html',
  styleUrl: './hof.component.scss',
})
export class HofComponent implements OnInit, OnDestroy {
  readonly RACERS_PER_PAGE: number = 10;

  hallOfFame: Racer[] = [];
  displayedRacers: Racer[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private imageService: ImageOptimizationService
  ) {}

  ngOnInit(): void {
    this.loadRacers();
    this.loadMoreRacers();
    this.preloadVisibleImages();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
    
    // Preload images for newly loaded racers
    this.preloadRacerImages(nextRacers);
  }

  preloadVisibleImages(): void {
    this.preloadRacerImages(this.displayedRacers);
  }

  preloadRacerImages(racers: Racer[]): void {
    racers.forEach(racer => {
      if (racer.photo) {
        this.imageService.preloadImage(racer.photo).catch(console.error);
      }
    });
  }

  isImageLoaded(imageUrl: string): boolean {
    return this.imageService.isImageLoaded(imageUrl);
  }

  isImageLoading(imageUrl: string): boolean {
    return this.imageService.isImageLoading(imageUrl);
  }

  hasImageError(imageUrl: string): boolean {
    return this.imageService.hasImageError(imageUrl);
  }

  trackByRacer(index: number, racer: Racer): string {
    return racer.name;
  }

  viewRacerDetails(racer: Racer): void {
    const formattedName = racer.name.split(' ').join('');
    this.router.navigate(['/hall-of-fame', formattedName]);
  }
}
