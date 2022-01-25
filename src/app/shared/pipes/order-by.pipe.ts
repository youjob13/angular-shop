import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(value: any[], ...args: any[]): any[] {
    const [key, isAsc] = args;

    if (key == null) {
      return value;
    }

    return value.sort((a, b) => {
      if (typeof a[key] !== 'string') {
        return isAsc ? a[key] - b[key] : b[key] - a[key];
      }

      const f = a[key].charCodeAt();
      const s = b[key].charCodeAt();

      return !isAsc ? f - s : s - f;
    });
  }
}
