import {Component, OnInit} from '@angular/core';
import {DestroySubscription} from "../../../../../shared/helpers/destroy-subscribtion";
import {UserService} from "../../user.service";
import {takeUntil} from "rxjs";

@Component({
  selector: 'app-universe',
  templateUrl: './universe.component.html',
  styleUrls: ['./universe.component.scss']
})
export class UniverseComponent extends DestroySubscription implements OnInit{
  editMode: boolean = false;

  constructor(
    private readonly userService: UserService
  ) {
    super();
  }

  ngOnInit() {
    this.userService.editMode$.pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.editMode = data
    })
  }

  setEditMode(status: boolean) {
    this.userService.editMode$.next(status)
    localStorage.setItem('editingMode', String(status))
  }
}
