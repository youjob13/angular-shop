## [0.0.7] - 2022-02-20

### Added

NgRx;

- add ProductState & AppState,
- add Products effects, products selectors, products actions, products reducers,
- add RouterState, router reducers, router actions, router effects,

## [0.0.6] - 2022-02-13

### Added

HttpClient;

- add json-server,
- add ProductsPromiseService & CartObservableService,
- add TimingInterceptor,
- store AppSettings in localStorage,

## [0.0.5] - 2022-02-06

### Added

Routing;

- add /products-list route (start page),
- add ProductViewComponent, /product/:ID route,
- add /cart route (with laze module),
- add ProcessOrderComponent with CanLoad & CanActivate guards (with laze module),
- add admin panel (with laze module),
  - /admin route + CanActivate Guard,
  - /admin/products route,
  - /admin/product/add route,
  - /admin/product/edit/:ID route + resolve & CanDeactivate guards,
  - /admin/orders route,
- store products and cartProducts to localStorage,

Additional functionality:

- secondary route-outlet "details"

## [0.0.4] - 2022-01-24

### Added

- add "uppercase" pipe to app.component,
- add "currency" pipe to cart-item.component,
- add "uppercase", "currency", "orderBy" pipes to cart-list.component,
- add "currency" pipe to product.component,
- add "uppercase", "async" pipes to product-list.component,
- create orderPipe

## [0.0.3] - 2022-01-11

### Added

- modify CartService,
- add ConfigOptionsService,
- add ConstantsService,
- add GeneratorService,
- add GeneratorFactory
- add genID
- add LocalStorageService
- inject all new services at First component
- add EnlargeFontSizeDirective

## [0.0.2] - 2022-01-11

### Added

- calculate products number,
- calculate amount of purchasedGoods,
- remove product from cart,
- change product count,
- highlight the product when hovering over the product in the cart
- add app title

## [0.0.1] - 2021-12-12

### Added

- product-list component, product component, products service,
- cart-list component, cart-list service
- a little layout
- first component

[0.0.7]: https://github.com/youjob13/angular-shop/compare/feat/task-6...feat/task-7
[0.0.6]: https://github.com/youjob13/angular-shop/compare/feat/task-5...feat/task-6
[0.0.5]: https://github.com/youjob13/angular-shop/compare/feat/task-4...feat/task-5
[0.0.4]: https://github.com/youjob13/angular-shop/compare/feat/task-3...feat/task-3
[0.0.3]: https://github.com/youjob13/angular-shop/compare/feat/task-2...feat/task-3
[0.0.2]: https://github.com/youjob13/angular-shop/compare/feat/task-1...feat/task-2
[0.0.1]: https://github.com/youjob13/angular-shop/compare/feat/task-1...master
