import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FirstComponent } from './components/first/first.component';
import { EnlargeFontSizeDirective } from './directives/englarge-font-size';
import { HighlightDirective } from './directives/highlight.directive';
import { OrderByPipe } from './pipes/order-by.pipe';

@NgModule({
  declarations: [
    FirstComponent,
    HighlightDirective,
    EnlargeFontSizeDirective,
    OrderByPipe,
  ],
  exports: [
    CommonModule,
    FormsModule,
    FirstComponent,
    HighlightDirective,
    EnlargeFontSizeDirective,
    OrderByPipe,
  ],
  imports: [CommonModule],
})
export class SharedModule {}
