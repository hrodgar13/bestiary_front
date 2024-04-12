import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textRedactorReader'
})
export class TextRedactorReaderPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/\{%\s*color=(\w+)\s*text="([^"]+)"\s*%\}/g, '<span style="color:$1">$2</span>');
  }

}
