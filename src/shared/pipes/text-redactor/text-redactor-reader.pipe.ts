import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'textRedactorReader'
})
export class TextRedactorReaderPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): any {
    const styleRegex = /{%\s*custom_font_style="([^"]*)"\s*custom_font_color="([^"]*)"\s*value="([^"]*)"\s*%}/;
    const diceRegex = /{%\s*roll_dice_amt="(\d+)"\s*roll_dice_side="(\d+)"\s*roll_bonus="(\d+)"\s*%}/;

    // Match for style formatting
    const styleMatch = value.match(styleRegex);
    if (styleMatch) {
      const [_, customFontStyle, customFontColor, textValue] = styleMatch;
      let styleString = this.buildStyleString(customFontStyle, customFontColor);
      return this.sanitizer.bypassSecurityTrustHtml(`<span style="${styleString}">${textValue}</span>`);
    }

    // Match for dice roll formatting
    const diceMatch = value.match(diceRegex);
    if (diceMatch) {
      const [_, amt, side, bonus] = diceMatch;
      const diceText = `(${amt}d${side}+${bonus})`;
      const diceStyle = 'color: #1DAEFF; cursor: pointer; text-decoration: underline;';
      return this.sanitizer.bypassSecurityTrustHtml(`<span style="${diceStyle}" onclick="alert('Dice roll result: ${this.rollDice(+amt, +side, +bonus)}')">${diceText}</span>`);
    }

    return value;  // Return original value if no matches
  }

  buildStyleString(fontStyles: string, color: string): string {
    let styleString = '';
    if (fontStyles.includes('bold')) styleString += 'font-weight: bold; ';
    if (fontStyles.includes('italic')) styleString += 'font-style: italic; ';
    if (fontStyles.includes('underline')) styleString += 'text-decoration: underline; ';
    styleString += `color: ${color};`;
    return styleString;
  }

  rollDice(amount: number, sides: number, bonus: number): number {
    let total = 0;
    for (let i = 0; i < amount; i++) {
      total += Math.floor(Math.random() * sides) + 1;
    }
    return total + bonus;
  }
}
