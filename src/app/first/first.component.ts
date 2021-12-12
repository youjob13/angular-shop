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
  @Input() name = '';
  @Input() description = '';
  @Input() price = 0;
  @Input() category = Category.OTHER;
  @Input() isAvailable = false;

  constructor() {}

  ngOnInit(): void {}

  getProductStatus() {
    return this.isAvailable ? 'Yes' : 'No';
  }
}
