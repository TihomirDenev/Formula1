import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { ImageOptimizationService } from '../../services/image-optimization.service';

@Component({
  selector: 'app-photos',
  imports: [InfiniteScrollModule, CommonModule, TranslateModule],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss',
})
export class PhotosComponent implements OnInit, OnDestroy {
  readonly ALL_PHOTOS_COUNT: number = 132;
  readonly PHOTOS_PER_PAGE: number = 20;

  photos: string[] = [];
  allPhotos: string[] = [];

  private destroy$ = new Subject<void>();

  constructor(private imageService: ImageOptimizationService) {}

  ngOnInit(): void {
    for (let i = 1; i <= this.ALL_PHOTOS_COUNT; i++) {
      this.allPhotos.push(`assets/images/gallery/${i}.webp`);
    }

    this.loadMorePhotos();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadMorePhotos(): void {
    const nextPhotos = this.allPhotos.slice(
      this.photos.length,
      this.photos.length + this.PHOTOS_PER_PAGE
    );

    this.photos.push(...nextPhotos);
    
    // Preload images for newly loaded photos
    this.preloadPhotos(nextPhotos);
  }

  preloadPhotos(photoUrls: string[]): void {
    photoUrls.forEach(photoUrl => {
      this.imageService.preloadImage(photoUrl).catch(console.error);
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

  trackByPhoto(index: number, photo: string): string {
    return photo;
  }
}
