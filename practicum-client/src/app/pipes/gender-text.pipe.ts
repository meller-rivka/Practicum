import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderText',
  standalone: true
})
export class GenderTextPipe implements PipeTransform {

  transform(value: any): string {
    switch (value) {
      case 1:
        return 'Female';
      case 0:
        return 'Male';
      default:
        return '';
    }
  }

}
