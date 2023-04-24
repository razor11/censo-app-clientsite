import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatar',
})
export class AvatarPipe implements PipeTransform {
  transform(genderCode: number): any {
    let svgIcon;

    if (genderCode === 1) {
      svgIcon = 'svg-1';
    }
    if (genderCode === 2) {
      svgIcon = 'svg-7';
    }

    return svgIcon;
  }
}
