import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstComponent } from './components/first/first.component';
import { HighlightDirective } from './directives/highlight.directive';
import { EnlargeFontSizeDirective } from './directives/englarge-font-size';

@NgModule({
  declarations: [FirstComponent, HighlightDirective, EnlargeFontSizeDirective],
  exports: [FirstComponent, HighlightDirective, EnlargeFontSizeDirective],
  imports: [CommonModule],
})
export class SharedModule {}
