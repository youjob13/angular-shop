import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  @Input('appHighlight') color!: string;

  constructor(private el: ElementRef, private render: Renderer2) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.highlight(this.color || 'lightgreen');
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.highlight(null);
  }

  private highlight(color: string | null): void {
    this.render.setStyle(this.el.nativeElement, 'backgroundColor', color);
  }
}
