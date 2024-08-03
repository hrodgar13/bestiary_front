import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UniverseStructureParagraphInterface} from "../../../../../../shared/interfaces/universes/universe.interface";

@Component({
    selector: 'app-paragraph-constructor',
    templateUrl: './paragraph-constructor.component.html',
    styleUrls: ['./paragraph-constructor.component.scss']
})
export class ParagraphConstructorComponent implements OnInit {
    @Input() structuralParagraphs: UniverseStructureParagraphInterface[] = [];
    @Output() detectSPChange = new EventEmitter<UniverseStructureParagraphInterface[]>
    sortedParagraphs: UniverseStructureParagraphInterface[] = [];

    constructor(
        private readonly cdr: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
        this.sortedParagraphs = this.sortParagraphsByOrder()
    }

    addParagraph($event: UniverseStructureParagraphInterface) {
        const paragraph: UniverseStructureParagraphInterface = $event

        paragraph.order = this.sortedParagraphs.length

        this.sortedParagraphs.push(paragraph)

        this.detectSPChange.emit(this.sortedParagraphs)
    }

    sortParagraphsByOrder() {
        return this.structuralParagraphs.sort((a, b) => a.order - b.order);
    }

    removeParagraph(paragraph: UniverseStructureParagraphInterface) {
        const idx = this.sortedParagraphs.findIndex(item => item.order === paragraph.order)


        if (idx !== -1) {
            const deleted = this.sortedParagraphs.splice(idx, 1)

            this.sortedParagraphs = this.sortedParagraphs.map(item => {
                if (item.order > deleted[0].order) {
                    return {...item, order: item.order - 1}
                } else {
                    return item
                }
            })

            this.cdr.detectChanges()
            this.detectSPChange.emit(this.sortedParagraphs)
        }
    }
}
