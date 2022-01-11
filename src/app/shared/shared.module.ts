import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstComponent } from './components/first/first.component';
import { HighlightDirective } from './directives/highlight.directive';

@NgModule({
  declarations: [FirstComponent, HighlightDirective],
  exports: [FirstComponent, HighlightDirective],
  imports: [CommonModule],
})
export class SharedModule {}
