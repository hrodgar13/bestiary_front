import {ChangeDetectorRef, Component, HostListener, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FilteredCreatureList} from "../../interfaces/filters/creatures.list";
import {DestroySubscription} from "../../helpers/destroy-subscribtion";
import {CreatureListService} from "./creature-list.service";
import {TranslocoService} from "@ngneat/transloco";
import {takeUntil} from "rxjs";
import {OutputCreatureItem} from "../../interfaces/filters/output-creature-item";

@Component({
  selector: 'app-creatures-list',
  templateUrl: './creatures-list.component.html',
  styleUrls: ['./creatures-list.component.scss']
})
export class CreaturesListComponent extends DestroySubscription implements OnInit, OnChanges{
  @Input() finished = 'TRUE'
  @Input() perPage = 30
  @Input() creatureFilter: OutputCreatureItem[] = [];
  @Input() searchInput: string = '';

  creaturesList: FilteredCreatureList[] = [];
  currentLanguage: 'en' | 'ua'  = 'en';
  isAdminAuthenticated = false;

  total: number = 0
  private loading: boolean = false;



  constructor(
      private readonly listService: CreatureListService,
      private transloco: TranslocoService,
      private cdRef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.detectCurrentLang()
    this.isAdminAuthenticated = this.listService.isAdmin();
    this.getCreatures()
  }

  ngOnChanges(changes: SimpleChanges) {
    this.cdRef.detectChanges()

    const search = changes['searchInput']
    const filter = changes['creatureFilter']

    if(search && !search.firstChange && search.currentValue !== search.previousValue) {
      this.getCreatures()
    }

    if(filter && !filter.firstChange && filter.currentValue !== filter.previousValue) {
      this.getCreatures()
    }
  }

  private detectCurrentLang() {
    const initLang = this.transloco.getActiveLang()

    if(initLang === 'en' || initLang === 'ua') {
      this.currentLanguage = initLang
    }

    this.transloco.langChanges$.pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      if(data === 'en' || data === 'ua') {
        this.currentLanguage = data
      }
    })
  }

  getCreatures() {
    this.loading = true
    this.listService.getCreatures(this.creatureFilter, this.searchInput, this.perPage, this.finished).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.creaturesList = data.creatures
      this.total = data.total
      this.loading = false
    })
  }

  @HostListener('window:scroll', ['$event'])
  onScroll($event: any) {
    const scrollY = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollY + windowHeight === documentHeight && !this.loading && this.perPage < this.total) {
      this.perPage += 30
      this.getCreatures()
    }
  }
}
