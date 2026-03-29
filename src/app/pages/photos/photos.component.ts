import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [InfiniteScrollModule, TranslateModule],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotosComponent implements OnInit {
  private readonly ALL_PHOTOS_COUNT = 132;
  readonly PHOTOS_PER_PAGE = 20;

  readonly allPhotos: string[] = Array.from(
    { length: this.ALL_PHOTOS_COUNT },
    (_, i) => `assets/images/gallery/${i + 1}.webp`
  );

  photos: string[] = [];

  ngOnInit(): void {
    this.loadMorePhotos();
  }

  loadMorePhotos(): void {
    const nextPhotos = this.allPhotos.slice(
      this.photos.length,
      this.photos.length + this.PHOTOS_PER_PAGE
    );
    this.photos = [...this.photos, ...nextPhotos];
  }
}
