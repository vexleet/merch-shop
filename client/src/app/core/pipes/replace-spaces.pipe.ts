import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'replaceSpaces' })
export class ReplaceSpaces implements PipeTransform {
    transform(value: string): string {
        return value.replace(/ /g, '-');
    }
}