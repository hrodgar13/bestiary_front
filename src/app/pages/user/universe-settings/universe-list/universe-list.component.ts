import {Component, Input} from '@angular/core';
import {UniverseListItem} from "../../../../../shared/interfaces/universes/universe.interface";

@Component({
  selector: 'app-universe-list',
  templateUrl: './universe-list.component.html',
  styleUrls: ['./universe-list.component.scss']
})
export class UniverseListComponent{

  @Input() universes: UniverseListItem[] = []

  isHovered = false;
  hoveredUniverse: number | null = null

  onMouseEvent(state: boolean, universeId: number | null) {
    this.isHovered = state;
    this.hoveredUniverse = universeId
  }
}
