import {Component, Input} from '@angular/core';
import {UniverseListItem} from "../../../../../shared/interfaces/universes/universe.interface";

@Component({
  selector: 'app-universe-list',
  templateUrl: './universe-list.component.html',
  styleUrls: ['./universe-list.component.scss']
})
export class UniverseListComponent{

  @Input() universes: UniverseListItem[] = []
}
