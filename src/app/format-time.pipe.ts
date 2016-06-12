import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime'
})
export class FormatTime implements PipeTransform {

  transform(time): any {
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;

    if (seconds == 0) {
      return minutes + ":00";
    } else {
      return minutes + ":" + seconds;
    }
  }
}
