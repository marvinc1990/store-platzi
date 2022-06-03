import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutWords'
})
export class CutWordsPipe implements PipeTransform {

  transform(value: string): string {
    return value.substring(0, 80).concat("...");
  }

}
