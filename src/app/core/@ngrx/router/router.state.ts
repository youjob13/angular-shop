import { Params } from '@angular/router';
import { RouterReducerState } from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  params: Params;
}

export interface RouterState {
  router: RouterReducerState<RouterStateUrl>;
}
