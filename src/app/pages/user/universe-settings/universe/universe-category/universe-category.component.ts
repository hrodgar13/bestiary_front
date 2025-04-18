import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {
  UniverseCategoryInterface, UniverseCategoryItem,
  UniverseStructureParagraphInterface
} from "../../../../../../shared/interfaces/universes/universe.interface";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {DestroySubscription} from "../../../../../../shared/helpers/destroy-subscribtion";
import {UserService} from "../../../user.service";
import {debounceTime, Subject, take, takeUntil} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../../../../shared/components/confirm-dialog/confirm-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";

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
        style({height: '0', opacity: 0, transform: 'scaleY(0)'}),
        animate('300ms ease-out', style({height: '*', opacity: 1, transform: 'scaleY(1)'}))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({height: '0', opacity: 0, transform: 'scaleY(0)'}))
      ])
    ])
  ]
})
export class UniverseCategoryComponent extends DestroySubscription implements OnInit {
  @Input() universeId: number = 0
  @Input() category!: UniverseCategoryInterface
  @Input() editingModeEnabled = false

  total: number = 0
  page: number = 1
  title = ''
  paginationLoading: boolean = false;
  @Output() categoryDelete = new EventEmitter<number>;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private matSnack: MatSnackBar
  ) {
    super()
  }

  private filterSubject = new Subject<string>();
  editingMode: boolean = false;

  ngOnInit() {
    this.category.items = []
    this.filterSubject.pipe(debounceTime(1000), takeUntil(this.destroyStream$)).subscribe((value) => {
      this.page = 1
      this.category.items = []
      this.total = 0
      this.getCategoryItems()
    })

    this.userService.editMode$.pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.editingMode = data
    })
  }

  setNameFilter() {
    this.filterSubject.next(this.title)
  }

  openCategory() {
    this.category.isOpened = !this.category.isOpened

    if (!this.category!.items?.length) {
      this.getCategoryItems()
    }
  }

  sortedByOrder(information: UniverseStructureParagraphInterface[]) {
    information.sort((a, b) => a.order - b.order)

    return information
  }

  private getCategoryItems() {
    if (this.category && this.category.id) {
      this.paginationLoading = true
      this.userService.getCategoryItems(this.universeId, this.category.id, this.page, this.title).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
        if (!this.category.items) {
          this.category.items = data.items
        } else {
          this.category.items = this.category.items.concat(data.items)
        }

        this.total = data.total
        this.paginationLoading = false
      }, err => {
        this.paginationLoading = false
      })
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1) {
      const reachedTotal = this.category!.items!.length >= this.total

      if (!this.paginationLoading && !reachedTotal && this.category.isOpened) {
        this.page++
        this.getCategoryItems()
      }
    }
  }

  deleteCategoryItem(itemId: number | undefined) {
    if (itemId) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          message: 'Are you sure? There is no way back'
        }
      })

      dialogRef.afterClosed().pipe(takeUntil(this.destroyStream$)).subscribe(data => {
        if (data) {
          this.processDeleteCategoryItem(itemId)
        }
      })
    }
  }

  private processDeleteCategoryItem(itemId: number) {
    this.userService.deleteCategoryItem(itemId).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.matSnack.open('Item Deleted!', 'ok', {
        verticalPosition: "top",
        duration: 3000,
      })

      const splitIdx = this.category.items?.findIndex(item => item.id === itemId)

      if (splitIdx && splitIdx !== -1) {
        this.category.items?.splice(splitIdx, 1)
      }

    }, err => {
      this.matSnack.open(err.error.message, 'ok', {
        verticalPosition: "top",
        duration: 3000,
      })
    })
  }

  deleteCategory(categoryId: number | undefined) {
    if (categoryId) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          message: 'Are you sure? If you delete entire category - every items will be deleted too!'
        }
      })

      dialogRef.afterClosed().pipe(takeUntil(this.destroyStream$)).subscribe(data => {
        if (data) {
          this.processDeleteCategory(categoryId)
        }
      })
    }
  }

  private processDeleteCategory(categoryId: number) {
    this.userService.deleteCategory(categoryId).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.matSnack.open('Category Deleted!', 'ok', {
        verticalPosition: "top",
        duration: 3000,
      })

      this.categoryDelete.emit(categoryId)
    }, err => {
      this.matSnack.open(err.error.message, 'ok', {
        verticalPosition: "top",
        duration: 3000,
      })
    })
  }

}
