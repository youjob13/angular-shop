import { UpperCasePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [UpperCasePipe],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('appTitle')
  title!: ElementRef<HTMLHeadingElement>;

  constructor(private upperCasePipe: UpperCasePipe) {}

  ngAfterViewInit(): void {
    this.title.nativeElement.textContent = this.upperCasePipe.transform('shop');
  }
}
