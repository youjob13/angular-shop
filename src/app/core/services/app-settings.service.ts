import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, retry, take, tap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { CONSTANTS } from '../';
import { AppSettings, AppSettingsOptions } from '../models/app-settings.model';
import { ConstantsServiceType, LocalStorageService } from './';

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  private appSettings$$ = new BehaviorSubject<AppSettings>({
    sort: { order: '', isAsc: false },
  });
  public appSettings$: Observable<AppSettings>;

  constructor(
    @Inject(CONSTANTS) private constants: ConstantsServiceType,
    private localStorageService: LocalStorageService,
    private httpClient: HttpClient
  ) {
    this.appSettings$ = this.appSettings$$.asObservable();
  }

  private loadSettingsFromLocalConfig(): void {
    this.httpClient
      .get<AppSettings>('./assets/app-settings.json')
      .pipe(
        take(1),
        retry(2),
        catchError((error) => {
          console.info(`The application settings could not be loaded.
        The standard settings will be used`);
          return throwError(error);
        })
      )
      .subscribe((settings) => {
        this.appSettings$$.next(settings);

        this.localStorageService.setItem(this.constants.AppSettings, settings);
      });
  }

  updateSettings<T>(option: AppSettingsOptions, valueToUpdate: T): void {
    const previousSettings = this.appSettings$$.getValue();

    const updatedSettings: AppSettings = {
      ...previousSettings,
      sort: {
        ...previousSettings.sort,
        [option]: valueToUpdate,
      },
    };

    this.localStorageService.setItem(
      this.constants.AppSettings,
      updatedSettings
    );
  }

  loadSettings(): void {
    of(
      this.localStorageService.getParsedItem<AppSettings | null>(
        this.constants.AppSettings
      )
    )
      .pipe(
        take(1),
        tap((settings) => {
          if (settings) {
            this.appSettings$$.next(settings);
          } else {
            this.loadSettingsFromLocalConfig();
          }
        }),
        catchError((err) => {
          console.error(err);
          return throwError(err);
        })
      )
      .subscribe();
  }
}
