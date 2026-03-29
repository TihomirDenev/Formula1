import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ImageLoadState {
  [key: string]: {
    loaded: boolean;
    loading: boolean;
    error: boolean;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ImageOptimizationService {
  private readonly imageStates = new BehaviorSubject<ImageLoadState>({});
  private readonly imageCache = new Map<string, string>();

  isImageLoaded(imageUrl: string): boolean {
    return this.imageStates.value[imageUrl]?.loaded || false;
  }

  isImageLoading(imageUrl: string): boolean {
    return this.imageStates.value[imageUrl]?.loading || false;
  }

  hasImageError(imageUrl: string): boolean {
    return this.imageStates.value[imageUrl]?.error || false;
  }

  preloadImage(imageUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.imageCache.has(imageUrl)) {
        this.updateImageState(imageUrl, { loaded: true, loading: false, error: false });
        resolve(this.imageCache.get(imageUrl)!);
        return;
      }
      this.updateImageState(imageUrl, { loaded: false, loading: true, error: false });
      const img = new Image();
      img.onload = () => {
        this.imageCache.set(imageUrl, imageUrl);
        this.updateImageState(imageUrl, { loaded: true, loading: false, error: false });
        resolve(imageUrl);
      };
      img.onerror = () => {
        this.updateImageState(imageUrl, { loaded: false, loading: false, error: true });
        reject(new Error(`Failed to load image: ${imageUrl}`));
      };
      img.crossOrigin = 'anonymous';
      img.src = imageUrl;
    });
  }

  clearCache(): void {
    this.imageCache.clear();
    this.imageStates.next({});
  }

  private updateImageState(
    imageUrl: string,
    state: { loaded: boolean; loading: boolean; error: boolean }
  ): void {
    this.imageStates.next({
      ...this.imageStates.value,
      [imageUrl]: state,
    });
  }
}
