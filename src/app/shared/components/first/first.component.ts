import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

enum Category {
  LAPTOP = 'laptop',
  SMARTPHONE = 'smartphone',
  OTHER = 'other',
}

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss', '../app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FirstComponent {
  @Input() name!: string;
  @Input() description!: string;
  @Input() price!: number;
  @Input() category!: Category;
  @Input() isAvailable!: boolean;

  constructor() {}

  getProductStatus(): string {
    return this.isAvailable ? 'Yes' : 'No';
  }
}
