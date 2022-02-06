import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FirstComponent, LoaderComponent } from './components';
import { EnlargeFontSizeDirective, HighlightDirective } from './directives';
import { OrderByPipe } from './pipes';

@NgModule({
  declarations: [
    FirstComponent,
    HighlightDirective,
    EnlargeFontSizeDirective,
    OrderByPipe,
    LoaderComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    FirstComponent,
    HighlightDirective,
    EnlargeFontSizeDirective,
    OrderByPipe,
    LoaderComponent,
  ],
  imports: [CommonModule],
})
export class SharedModule {}
