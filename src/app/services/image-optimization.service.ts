import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ImageLoadState {
  [key: string]: {
    loaded: boolean;
    loading: boolean;
    error: boolean;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ImageOptimizationService {
  private imageStates = new BehaviorSubject<ImageLoadState>({});
  private imageCache = new Map<string, string>();

  constructor() {}

  getImageState(imageUrl: string): Observable<ImageLoadState> {
    return this.imageStates.asObservable();
  }

  isImageLoaded(imageUrl: string): boolean {
    const states = this.imageStates.value;
    return states[imageUrl]?.loaded || false;
  }

  isImageLoading(imageUrl: string): boolean {
    const states = this.imageStates.value;
    return states[imageUrl]?.loading || false;
  }

  hasImageError(imageUrl: string): boolean {
    const states = this.imageStates.value;
    return states[imageUrl]?.error || false;
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

  getOptimizedImageUrl(originalUrl: string, width?: number, quality?: number): string {
    return originalUrl;
  }

  clearCache(): void {
    this.imageCache.clear();
    this.imageStates.next({});
  }

  private updateImageState(imageUrl: string, state: { loaded: boolean; loading: boolean; error: boolean }): void {
    const currentStates = this.imageStates.value;
    this.imageStates.next({
      ...currentStates,
      [imageUrl]: state
    });
  }
} 