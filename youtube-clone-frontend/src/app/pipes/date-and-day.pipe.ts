import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAndDay',
})
export class DateAndDayPipe implements PipeTransform {
  transform(value: string): string {
    const addedOnDate: Date = new Date(value);
    const currentDate = new Date();
    const differenceInTime =
      currentDate.getTime() - new Date(addedOnDate).getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    console.log();
    const weekDays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    if (differenceInDays === 0) {
      return 'Today';
    } else if (differenceInDays === 1) {
      return 'Yesterday';
    } else if (differenceInDays === 2) {
      return weekDays[addedOnDate.getDay()].toString();
    } else if (differenceInDays === 3) {
      return weekDays[addedOnDate.getDay()].toString();
    } else if (differenceInDays === 4) {
      return weekDays[addedOnDate.getDay()].toString();
    } else if (differenceInDays === 5) {
      return weekDays[addedOnDate.getDay()].toString();
    } else if (differenceInDays === 6) {
      return weekDays[addedOnDate.getDay()].toString();
    } else {
      return (
        months[addedOnDate.getMonth()] +
        ' ' +
        addedOnDate.getDate() +
        ', ' +
        addedOnDate.getFullYear()
      );
    }
  }
}
