import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartListService } from '../../services/cart-list.service';
import { AppSettingsOptions } from 'src/app/core/models/app-settings.model';
import { AppSettingsService } from 'src/app/core/services/app-settings.service';
import { FormControl } from '@angular/forms';
import { ChangedProductCount, IPurchasedProduct } from '../../cart.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
export class CartListComponent implements OnInit, OnDestroy {
  sortByControl = new FormControl('');
  isAscControl = new FormControl(false);

  private subscriptions = new Subscription();

  sortOptions: string[] = ['price', 'count', 'name'];

  get sortBy(): string {
    return this.sortByControl.value;
  }

  get isAsc(): string {
    return this.isAscControl.value;
  }

  constructor(
    public cartListService: CartListService,
    private appSettings: AppSettingsService
  ) {}

  ngOnInit(): void {
    this.appSettings.appSettings$.subscribe((settings) => {
      this.sortByControl.setValue(settings.sort.order);
      this.isAscControl.setValue(settings.sort.isAsc);
    });

    this.subscriptions.add(
      this.sortByControl.valueChanges.subscribe((value: string) =>
        this.appSettings.updateSettings<string>(
          AppSettingsOptions.SortOrder,
          value
        )
      )
    );

    this.subscriptions.add(
      this.isAscControl.valueChanges.subscribe((value: boolean) =>
        this.appSettings.updateSettings<boolean>(
          AppSettingsOptions.SortDirection,
          value
        )
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onChangeProductQuantity({
    productId,
    productCount,
  }: ChangedProductCount): void {
    this.cartListService.changeQuantity(productId, productCount);
  }

  clearCart(): void {
    this.cartListService.removeAllProducts();
  }

  onRemoveProductFromCart(productId: string): void {
    this.cartListService.removeProduct(productId);
  }

  trackByProductId(index: number, product: IPurchasedProduct): string {
    return product.id;
  }
}
