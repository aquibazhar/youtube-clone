import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(items: any[], field: string, reverse: boolean = false): any[] {
    if (!items) {
      return [];
    }
    if (!field) {
      return items;
    }

    const sorted = items.sort((a, b) => {
      let date1 = Date.parse(a[field]);
      let date2 = Date.parse(b[field]);
      if (reverse) {
        return date2 - date1;
      } else {
        return date1 - date2;
      }
    });
    return sorted;
  }
}
