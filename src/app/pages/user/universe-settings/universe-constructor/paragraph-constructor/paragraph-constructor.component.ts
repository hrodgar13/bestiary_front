import {Component, Input} from '@angular/core';
import {UniverseStructureParagraphInterface} from "../../../../../../shared/interfaces/universes/universe.interface";

@Component({
  selector: 'app-paragraph-constructor',
  templateUrl: './paragraph-constructor.component.html',
  styleUrls: ['./paragraph-constructor.component.scss']
})
export class ParagraphConstructorComponent {
  @Input() structuralParagraphs: UniverseStructureParagraphInterface[] = [];

}
