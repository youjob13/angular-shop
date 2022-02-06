import { UpperCasePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DetailsService } from './details/services/details.service';
import { appearance, swipe } from './shared/animations/route-animations';

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
    private detailsService: DetailsService
  ) {}

  ngOnInit(): void {
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
      this.router.navigate([{ outlets: { details: 'news' } }]);
    } else {
      this.router.navigate([{ outlets: { details: null } }]);
    }
    this.setDetailsAnimState();
  }

  private setDetailsAnimState(): void {
    this.detailsAnimState = this.detailsService.isOpen ? 'expanded' : 'initial';
  }
}
