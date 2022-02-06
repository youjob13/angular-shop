import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { CanDeactivate, UrlTree } from '@angular/router';

import { CanComponentDeactivate } from '../interfaces/can-component-deactivate.interface';

@Injectable({
  providedIn: 'any',
})
export class CanDeactivateGuard
  implements CanDeactivate<CanComponentDeactivate>
{
  canDeactivate(
    component: CanComponentDeactivate
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
