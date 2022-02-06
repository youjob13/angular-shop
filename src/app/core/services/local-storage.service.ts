import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storage: Storage = localStorage;

  get length(): number {
    return this.storage.length;
  }

  setItem(key: string, value: string | any): void {
    if (typeof value === 'object') {
      this.storage.setItem(key, JSON.stringify(value));
    } else {
      this.storage.setItem(key, value);
    }
  }

  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  key(index: number): string | null {
    return this.storage.key(index);
  }

  clear(): void {
    this.storage.clear();
  }
}
