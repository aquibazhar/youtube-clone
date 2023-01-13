import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'relativeTime',
})
export class RelativeTimePipe implements PipeTransform {
  transform(value: string): string {
    // because I'm using toISOString for date its storing date in UTC format therefore I can't use moment(value) because it gets time in IST
    // and compares with stored UTC time. Therefore moment.utc(value)
    return moment.utc(value).local().fromNow();
  }
}
