import { ChangeDetectionStrategy, Component, HostListener, OnInit, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { GALLERY_CONSTANTS } from '@libs/constants/gallery.constants';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [InfiniteScrollModule, TranslateModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent implements OnInit {
  readonly c = GALLERY_CONSTANTS;

  readonly allPhotos: string[] = Array.from(
    { length: this.c.totalPhotos },
    (_, i) => `${this.c.photoBasePath}${i + 1}${this.c.photoExtension}`
  );

  readonly allThumbs: string[] = Array.from(
    { length: this.c.totalPhotos },
    (_, i) => `${this.c.thumbBasePath}${i + 1}${this.c.photoExtension}`
  );

  photos: string[] = [];
  thumbs: string[] = [];

  readonly lightboxIndex = signal<number | null>(null);

  get lightboxSrc(): string | null {
    const i = this.lightboxIndex();
    return i !== null ? this.allPhotos[i] : null;
  }

  ngOnInit(): void {
    this.loadMorePhotos();
  }

  loadMorePhotos(): void {
    const start = this.photos.length;
    const end = start + this.c.photosPerPage;
    this.photos = [...this.photos, ...this.allPhotos.slice(start, end)];
    this.thumbs = [...this.thumbs, ...this.allThumbs.slice(start, end)];
  }

  openLightbox(index: number): void {
    this.lightboxIndex.set(index);
  }

  closeLightbox(): void {
    this.lightboxIndex.set(null);
  }

  prevPhoto(): void {
    const i = this.lightboxIndex();
    if (i !== null && i > 0) this.lightboxIndex.set(i - 1);
  }

  nextPhoto(): void {
    const i = this.lightboxIndex();
    if (i !== null && i < this.allPhotos.length - 1) this.lightboxIndex.set(i + 1);
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (this.lightboxIndex() === null) return;
    if (event.key === 'Escape') this.closeLightbox();
    if (event.key === 'ArrowLeft') this.prevPhoto();
    if (event.key === 'ArrowRight') this.nextPhoto();
  }
}
