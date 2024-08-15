import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {
  ImageMetadataParagraphInterface,
  UniverseStructureParagraphInterface
} from "../../../../../../shared/interfaces/universes/universe.interface";
import {takeUntil} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {DestroySubscription} from "../../../../../../shared/helpers/destroy-subscribtion";
import {ParagraphActionsModalComponent} from "../modals/paragraph-actions-modal/paragraph-actions-modal.component";
import {environment} from "../../../../../../environments/environment";

@Component({
  selector: 'app-paragraph-constructor',
  templateUrl: './paragraph-constructor.component.html',
  styleUrls: ['./paragraph-constructor.component.scss']
})
export class ParagraphConstructorComponent extends DestroySubscription implements OnInit, OnChanges {
  @Input() structuralParagraphs: UniverseStructureParagraphInterface[] = [];
  @Input() showPlaceForImage = false
  @Input() position: 'left' | 'right' = 'right'

  @Output() detectSPChange = new EventEmitter<UniverseStructureParagraphInterface[]>
  sortedParagraphs: UniverseStructureParagraphInterface[] = [];
  paragraphForEdit: UniverseStructureParagraphInterface = {
    metadata: JSON.parse('{"description": ""}'),
    order: 0,
    title: "",
    type: "text"
  };
  @Input() presetImageOptions!: {
    width: number,
    height: number,
    position: 'left' | 'right'
  };

  baseUrl = environment.baseUrl

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly dialog: MatDialog
  ) {
    super()
  }

  ngOnInit() {
    this.sortedParagraphs = this.sortParagraphsByOrder()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['structuralParagraphs']) {
      this.sortedParagraphs = this.sortParagraphsByOrder()
    }
  }

  addParagraph($event: UniverseStructureParagraphInterface) {
    const paragraph: UniverseStructureParagraphInterface = $event
    const idx = this.sortedParagraphs.findIndex(item => paragraph.order === item.order)


    if (paragraph.order !== 0 && idx !== -1) {
      this.sortedParagraphs[idx] = paragraph
    } else {
      paragraph.order = this.sortedParagraphs.length + 1

      this.sortedParagraphs.push(paragraph)

      this.detectSPChange.emit(this.sortedParagraphs)
    }

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

  moveElement(move: 'up' | 'down', paragraph: UniverseStructureParagraphInterface, event: Event) {
    event.stopPropagation()

    const currentIndex = this.sortedParagraphs.findIndex(item => item.order === paragraph.order);

    if (currentIndex === -1) {
      return; // Element not found
    }

    if (move === 'up' && currentIndex > 0) {
      [this.sortedParagraphs[currentIndex].order, this.sortedParagraphs[currentIndex - 1].order] =
        [this.sortedParagraphs[currentIndex - 1].order, this.sortedParagraphs[currentIndex].order];
    } else if (move === 'down' && currentIndex < this.sortedParagraphs.length - 1) {
      [this.sortedParagraphs[currentIndex].order, this.sortedParagraphs[currentIndex + 1].order] =
        [this.sortedParagraphs[currentIndex + 1].order, this.sortedParagraphs[currentIndex].order];
    }

    this.sortedParagraphs.sort((a, b) => a.order - b.order);

    this.cdr.detectChanges();
  }

  getImageAlignment(metadata: JSON) {
    const meta: ImageMetadataParagraphInterface = JSON.parse(JSON.stringify(metadata))

    return meta.photoAlignment
  }

  callContextMenu(paragraph: UniverseStructureParagraphInterface) {
    const dialogRef = this.dialog.open(ParagraphActionsModalComponent)

    dialogRef.afterClosed().pipe(takeUntil(this.destroyStream$)).subscribe((action: 'delete' | 'edit' | null) => {
      if (action === "delete") {
        this.removeParagraph(paragraph)
      } else if (action === "edit") {
        this.paragraphForEdit = paragraph
      } else {
        return
      }
    })
  }
}
