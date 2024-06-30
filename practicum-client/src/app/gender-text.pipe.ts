import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderText',
  standalone: true
})
export class GenderTextPipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case 2:
        return 'Female';
      case 1:
        return 'Male';
      default:
        return '';
    }
  }

}
