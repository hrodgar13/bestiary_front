import {Component, Input} from '@angular/core';
import {
  UniverseCategoryInterface,
  UniverseStructureParagraphInterface
} from "../../../../../../shared/interfaces/universes/universe.interface";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-universe-category',
  templateUrl: './universe-category.component.html',
  styleUrls: ['./universe-category.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        height: '*',
        opacity: 1,
        transform: 'scaleY(1)'
      })),
      transition(':enter', [
        style({ height: '0', opacity: 0, transform: 'scaleY(0)' }),
        animate('300ms ease-out', style({ height: '*', opacity: 1, transform: 'scaleY(1)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ height: '0', opacity: 0, transform: 'scaleY(0)' }))
      ])
    ])
  ]
})
export class UniverseCategoryComponent {
  @Input() category!: UniverseCategoryInterface
  @Input() editingModeEnabled = false

  openCategory() {
    this.category.isOpened = !this.category.isOpened
  }

  sortedByOrder(information: UniverseStructureParagraphInterface[]) {
    information.sort((a, b) => a.order - b.order)

    return information
  }
}
