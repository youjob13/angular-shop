import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  private _isOpen = false;

  set isOpen(value: boolean) {
    this._isOpen = value;
  }

  get isOpen(): boolean {
    return this._isOpen;
  }
}
