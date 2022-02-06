import { Injectable } from '@angular/core';
import { LocalStorageService } from '.';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private localStorageService: LocalStorageService) {}

  checkRole(): boolean {
    const currentUserRole = this.localStorageService.getItem('role');
    return currentUserRole === 'admin';
  }
}
