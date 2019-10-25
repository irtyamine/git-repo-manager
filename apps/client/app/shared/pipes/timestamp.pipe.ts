import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestamp'
})

export class TimestampPipe implements PipeTransform {
  transform(value: number): string {
    const milliseconds = Date.now() - value;
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(milliseconds / (1000 * 60));
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    let result = '';

    seconds < 60 ? result += seconds + ' sec'
      : minutes < 60 ? result += minutes + ' min'
      : hours < 24 ? result += hours + ' hrs' : result += days + ' d';
    return result;
  }
}
