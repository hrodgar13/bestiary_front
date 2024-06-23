import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'textRedactorReader'
})
export class TextRedactorReaderPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string | null): any {
    if (value === null) {
      return '';
    }

    const templateRegex = /{%\s*(roll_dice_amt="(\d+)"\s*roll_dice_side="(\d+)"\s*roll_bonus="(\d*)"|custom_font_style="([^"]*)"\s*custom_font_color="([^"]*)"\s*value="([^"]*)"\s*external_link="([^"]*)")\s*%}/g;

    console.log(value)

    return this.sanitizer.bypassSecurityTrustHtml(value.replace(templateRegex, (match, p1, amt, side, bonus, fontStyle, fontColor, textValue) => {
      if (amt) { // Dice roll formatting
        const diceText = `(${amt}d${side}${!bonus ? '' : bonus > 0 ? '+'+bonus : bonus})`;
        const diceStyle = 'color: #1DAEFF; cursor: pointer;';
        return `<span style="${diceStyle}" onclick="window.rollDiceGlobal(${amt}, ${side}, ${bonus})">${diceText}</span>`;
      } else { // Style formatting
        let styleString = this.buildStyleString(fontStyle, fontColor);
        if(match[4]) {
          return `<a target="_blank" href="${match[4]}" style="${styleString}">${textValue}</a>`;
        } else {
          return `<span style="${styleString}">${textValue}</span>`;
        }

      }
    }));
  }

  buildStyleString(fontStyles: string, color: string): string {
    let styleString = '';
    if (fontStyles?.includes('bold')) styleString += 'font-weight: bold; ';
    if (fontStyles?.includes('italic')) styleString += 'font-style: italic; ';
    if (fontStyles?.includes('underline')) styleString += 'text-decoration: underline; ';
    styleString += `color: ${color};`;
    return styleString;
  }
}
