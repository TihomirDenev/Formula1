import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-photos',
  imports: [InfiniteScrollModule, CommonModule, TranslateModule],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss',
})
export class PhotosComponent implements OnInit {
  readonly ALL_PHOTOS_COUNT: number = 132;
  readonly PHOTOS_PER_PAGE: number = 20;

  photos: string[] = [];
  allPhotos: string[] = [];

  ngOnInit(): void {
    for (let i = 1; i <= this.ALL_PHOTOS_COUNT; i++) {
      this.allPhotos.push(`assets/images/gallery/${i}.jpg`);
    }

    this.loadMorePhotos();
  }

  loadMorePhotos(): void {
    const nextPhotos = this.allPhotos.slice(
      this.photos.length,
      this.photos.length + this.PHOTOS_PER_PAGE
    );

    this.photos.push(...nextPhotos);
  }
}
