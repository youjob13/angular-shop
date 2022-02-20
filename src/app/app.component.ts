import { UpperCasePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { AppState } from './core/@ngrx/app.state';
import { AppSettingsService } from './core/services/app-settings.service';
import { DetailsService } from './details/services/details.service';
import { appearance, swipe } from './shared/animations/route-animations';
import * as ProductsActions from './core/@ngrx/products/products.actions';
import * as RouterActions from './core/@ngrx/router/router.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [UpperCasePipe],
  animations: [appearance, swipe],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('appTitle') title!: ElementRef<HTMLHeadingElement>;

  detailsAnimState: string = 'initial';

  constructor(
    private router: Router,
    private upperCasePipe: UpperCasePipe,
    private detailsService: DetailsService,
    private appSettings: AppSettingsService,
    private store: Store<AppState>
  ) {
    this.appSettings.loadSettings();
  }

  ngOnInit(): void {
    this.store.dispatch(ProductsActions.getProducts());
    this.setDetailsOnRefresh();
  }

  ngAfterViewInit(): void {
    this.title.nativeElement.textContent = this.upperCasePipe.transform('shop');
  }

  setDetailsOnRefresh(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event) => {
        this.detailsService.isOpen = (event as NavigationStart).url.includes(
          'details:'
        );

        this.setDetailsAnimState();
      });
  }

  prepareRoute(outlet: RouterOutlet): string {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animationState']
    );
  }

  onToggleDetails(): void {
    if (!this.detailsService.isOpen) {
      this.store.dispatch(
        RouterActions.NavigateOutlet({ outlets: { details: 'news' } })
      );
    } else {
      this.store.dispatch(
        RouterActions.NavigateOutlet({ outlets: { details: null } })
      );
    }
    this.setDetailsAnimState();
  }

  private setDetailsAnimState(): void {
    this.detailsAnimState = this.detailsService.isOpen ? 'expanded' : 'initial';
  }
}
