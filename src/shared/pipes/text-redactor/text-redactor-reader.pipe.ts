import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textRedactorReader'
})
export class TextRedactorReaderPipe implements PipeTransform {

  transform(value: string): string {
    const styleRegex = /{%\s*custom_font_style="([^"]*)"\s*custom_font_color="([^"]*)"\s*value="([^"]*)"\s*%}/;
    const match = value.match(styleRegex);

    if (!match) {
      return value;  // Якщо не знайдено відповідностей, повертаємо оригінальне значення
    }


    const customFontStyle = match[1];
    const customFontColor = match[2];
    const textValue = match[3];

    let styleString = '';
    if (customFontStyle.includes('bold')) {
      styleString += 'font-weight: bold; ';
    }
    if (customFontStyle.includes('italic')) {
      styleString += 'font-style: italic; ';
    }
    if (customFontStyle.includes('underline')) {
      styleString += 'text-decoration: underline; ';
    }

    return `<span style="${styleString} color: ${customFontColor};">${textValue}</span>`;
  }

}
