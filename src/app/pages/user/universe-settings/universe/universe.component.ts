import {Component, OnInit} from '@angular/core';
import {DestroySubscription} from "../../../../../shared/helpers/destroy-subscribtion";
import {ActivatedRoute} from "@angular/router";
import {takeUntil} from "rxjs";
import {UserService} from "../../user.service";
import {
  UniverseInterface, UniverseStructureParagraphInterface
} from "../../../../../shared/interfaces/universes/universe.interface";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-universe',
  templateUrl: './universe.component.html',
  styleUrls: ['./universe.component.scss']
})
export class UniverseComponent {

}
