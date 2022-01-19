import { Injectable, InjectionToken } from '@angular/core';

@Injectable()
export class LocalStorageService {
  private storage: Storage = localStorage;

  constructor() {}

  get length(): number {
    return this.storage.length;
  }

  setValue(key: string, value: string | any): void {
    if (typeof value === 'object') {
      this.storage.setItem(key, JSON.stringify(value));
    } else {
      this.storage.setItem(key, value);
    }
  }

  getValue(key: string): string | null {
    return this.storage.getItem(key);
  }

  getObjectValue(key: string): any {
    const data = this.storage.getItem(key);

    if (data == null) {
      return null;
    }

    return JSON.parse(data);
  }

  removeValue(key: string): void {
    this.storage.removeItem(key);
  }

  key(index: number): string | null {
    return this.storage.key(index);
  }

  clear(): void {
    this.storage.clear();
  }
}

export const localStorageService = new LocalStorageService();

export const LOCAL_STORAGE = new InjectionToken<LocalStorageService>(
  'localStorage'
);
