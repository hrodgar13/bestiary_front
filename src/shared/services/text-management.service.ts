import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {TEXT_REDACTOR_REGEX} from "../static/constants";
import {DomSanitizer} from "@angular/platform-browser";


@Injectable({
    providedIn: 'root'
})
export class TextManagementService {

    constructor(
        private sanitizer: DomSanitizer,
    ) {
    }

    updateHTML(editable_text: string, regex_number: number) {
        const regex = TEXT_REDACTOR_REGEX;
        const match = editable_text.match(regex);
        if (match) {
            const styles = match[1].split(' ').reduce((styleString, style) => {
                if (style === 'bold') styleString += 'font-weight: bold; ';
                if (style === 'italic') styleString += 'font-style: italic; ';
                if (style === 'underline') styleString += 'text-decoration: underline; ';
                return styleString;
            }, '');
            let htmlString = ''

            if (match[4]) {
                htmlString = `<a href="${match[4]}" style="${styles} color: ${match[2]};">${match[3]}</a>`;
            } else {
                htmlString = `<span style="${styles} color: ${match[2]};">${match[3]}</span>`;
            }
            return this.sanitizer.bypassSecurityTrustHtml(htmlString);
        } else {
            return '';
        }
    }
}
