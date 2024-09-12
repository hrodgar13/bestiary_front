import {Component, Input, OnInit, Output} from '@angular/core';
import {
  UniverseCategoryItem,
  UniverseStructureParagraphInterface
} from "../../../../../../shared/interfaces/universes/universe.interface";
import {UserService} from "../../../user.service";
import {takeUntil} from "rxjs";
import {DestroySubscription} from "../../../../../../shared/helpers/destroy-subscribtion";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-category-item-constructor',
  templateUrl: './category-item-constructor.component.html',
  styleUrls: ['./category-item-constructor.component.scss']
})
export class CategoryItemConstructorComponent extends DestroySubscription implements OnInit{
  @Input() categoryItem: UniverseCategoryItem = {
    information: [],
    title: ""
  };
  private universeId: number = 0;
  private categoryId: number = 0;



  constructor(
    private readonly userService: UserService,
    private readonly matSnack: MatSnackBar,
    private readonly route: ActivatedRoute
  ) {
    super()
  }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      if(data['id'] && data['categoryId']) {
        this.universeId = data['id']
        this.categoryId = data['categoryId']
        const itemId = data['itemId']

        if(!!Number(itemId)) {
          this.getCategoryItemById(this.universeId, this.categoryId, itemId)
        }
      }
    })

  }

  setCategoryItemDescription($event: UniverseStructureParagraphInterface[]) {
    this.categoryItem.information = $event
  }


  saveItem() {
    this.userService.createCategoryItem(this.categoryItem, this.universeId, this.categoryId).pipe(takeUntil(this.destroyStream$)).subscribe(data => {

    }, err => {
      this.matSnack.open(err.error.message, 'ok', {
        verticalPosition: "top",
        duration: 3000
      })
    })
  }

  private getCategoryItemById(universeId: number, categoryId: number, itemId: number) {
    this.userService.getCategoryItemById(universeId, categoryId, itemId).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.categoryItem = data
      console.log(this.categoryItem)
    })
  }
}
