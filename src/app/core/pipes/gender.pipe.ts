import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender',
})
export class GenderPipe implements PipeTransform {
  transform(gender: number): any {
    let genderDesc: string = '';
    if (gender === 1) {
      genderDesc = 'Masculino';
    }

    if (gender === 2) {
      genderDesc = 'Femenino';
    }

    return genderDesc;
  }
}
