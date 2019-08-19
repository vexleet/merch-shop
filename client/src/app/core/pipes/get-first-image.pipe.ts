import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getFirstImage'
})
export class GetFirstImagePipe implements PipeTransform {

  transform(value: object): any {
    const keys = Object.keys(value);

    return value[keys[0]];
  }

}
