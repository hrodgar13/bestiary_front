import {Component, OnInit} from '@angular/core';
import {DestroySubscription} from "../../../../../shared/helpers/destroy-subscribtion";
import {AdminService} from "../../admin.service";
import {takeUntil} from "rxjs";
import {UniverseTagInterface} from "../../../../../shared/interfaces/user/universe-tag.interface";
import {MatDialog} from "@angular/material/dialog";
import {PropertyModalComponent} from "../../../../../shared/components/property-modal/property-modal.component";
import {AddTagModalComponent} from "./add-tag-modal/add-tag-modal.component";

@Component({
  selector: 'app-universe-tags-list',
  templateUrl: './universe-tags-list.component.html',
  styleUrls: ['./universe-tags-list.component.scss']
})
export class UniverseTagsListComponent extends DestroySubscription implements OnInit{
  universeTags: UniverseTagInterface[] = [];

  constructor(private readonly adminService: AdminService, private readonly dialog: MatDialog) {
    super();
  }

  ngOnInit() {
    this.getUniversesTags()
  }

  private getUniversesTags() {
    this.adminService.getUniverseTags().pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.universeTags = data
    })
  }

  openAddTagModal(data?: UniverseTagInterface) {
      const dialogRef = this.dialog.open(AddTagModalComponent, {data})

      dialogRef.afterClosed().pipe(takeUntil(this.destroyStream$)).subscribe(data => {
          if(data) {
             this.getUniversesTags()
          }
      })
  }

  editTag(tag: UniverseTagInterface) {
      this.openAddTagModal(tag)
  }

  removeTag(id: number | undefined) {
    if(id) {
        this.adminService.removeTag(id).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
            const idx = this.universeTags.findIndex(item => item.id === id)

            if(idx !== -1) {
                this.universeTags.splice(idx, 1)
            }
        })
    }
  }
}
