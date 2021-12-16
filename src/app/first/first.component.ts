import { Component, Input, OnInit } from '@angular/core';

enum Category {
  LAPTOP = 'laptop',
  SMARTPHONE = 'smartphone',
  OTHER = 'other',
}

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss', '../app.component.scss'],
})
export class FirstComponent implements OnInit {
  @Input() name!: string;
  @Input() description!: string;
  @Input() price!: number;
  @Input() category!: Category;
  @Input() isAvailable!: boolean;

  constructor() {}

  ngOnInit(): void {}

  getProductStatus(): string {
    return this.isAvailable ? 'Yes' : 'No';
  }
}
