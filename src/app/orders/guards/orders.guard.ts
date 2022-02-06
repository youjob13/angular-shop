import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartListService } from 'src/app/cart/services/cart-list.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersGuard implements CanLoad, CanActivate {
  constructor(private cartService: CartListService) {}
  canActivate():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.checkCartState();
    // Использую оба предложенных гарда, т.к.
    // CanLoad срабатывает только лишь 1 раз,
    // при загрузки lazy модуля, но я хотел бы
    // чтобы страничка не загружалось если в этом нет необходимости
  }

  canLoad():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkCartState();
  }

  private checkCartState(): Observable<boolean> | boolean {
    return this.cartService.isEmptyCart().pipe(
      map((isNotEmptyCart) => {
        if (!isNotEmptyCart) {
          alert('Your cart is empty');
        }

        return isNotEmptyCart;
      })
    );
  }
}
