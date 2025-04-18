import {Component, Input, OnInit} from '@angular/core';
import {UniverseListItem} from "../../../../../shared/interfaces/universes/universe.interface";
import {DestroySubscription} from "../../../../../shared/helpers/destroy-subscribtion";
import {UserService} from "../../user.service";
import {takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {environment} from "../../../../../environments/environment";
import {TranslocoService} from "@ngneat/transloco";

@Component({
  selector: 'app-universe-list',
  templateUrl: './universe-list.component.html',
  styleUrls: ['./universe-list.component.scss']
})
export class UniverseListComponent extends DestroySubscription implements OnInit{

  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly localeService: TranslocoService,
  ) {
    super();
  }

  @Input() universes: UniverseListItem[] = []

  isHovered = false;
  hoveredUniverse: number | null = null
  loading: boolean = false;
  baseUrl = environment.baseUrl;
  currentLanguage: 'en' | 'ua' = 'en';

  ngOnInit() {
    this.detectLanguageChange()
  }

  onMouseEvent(state: boolean, universeId: number | null) {
    this.isHovered = state;
    this.hoveredUniverse = universeId
  }

  private detectLanguageChange() {
    this.localeService.langChanges$.pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      const activeLang: 'en' | 'ua' | string = data


      if(activeLang === 'en' ||activeLang === 'ua') {
        this.currentLanguage = activeLang
      }
    })
  }

  createUniverse() {
    this.loading = true
    this.userService.createUniverse().pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.router.navigate(['../user/universe/' + data.id])
      this.loading = false
    }, err => {
      this.loading = false
    })
  }
}
