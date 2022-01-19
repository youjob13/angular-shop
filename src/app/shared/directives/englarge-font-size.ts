import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[fontSize]',
})
export class EnlargeFontSizeDirective {
  @Input() fontSize!: string;

  private isEnlarged!: boolean;

  private previousFontSize!: string;

  constructor(private el: ElementRef, private render: Renderer2) {}

  @HostListener('click')
  onClick(): void {
    if (!this.isEnlarged) {
      this.isEnlarged = true;
      this.getCurrentFontSize();
      this.changeFontSize(this.fontSize || '1.13rem');
    } else {
      this.changeFontSize(this.previousFontSize);
      this.isEnlarged = false;
    }
  }

  private getCurrentFontSize(): void {
    this.previousFontSize = getComputedStyle(
      this.el.nativeElement
    ).getPropertyValue('font-size');
  }

  private changeFontSize(fontSize: string | null): void {
    this.render.setStyle(this.el.nativeElement, 'fontSize', fontSize);
  }
}
