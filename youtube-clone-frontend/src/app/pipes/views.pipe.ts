import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'views',
})
export class ViewsPipe implements PipeTransform {
  transform(value: number): string {
    if (value >= 1000000) {
      return (
        (value / 1000000).toLocaleString('en-US', {
          maximumFractionDigits: 1,
        }) + 'M'
      );
    } else if (value >= 1000) {
      return (
        (value / 1000).toLocaleString('en-US', { maximumFractionDigits: 1 }) +
        'K'
      );
    }
    return value.toString();
  }
}
