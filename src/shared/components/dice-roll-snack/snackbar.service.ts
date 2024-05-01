import {ApplicationRef, ComponentFactoryResolver, Injectable, Injector} from '@angular/core';
import {DiceRollSnackComponent} from "./dice-roll-snack.component";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private sanitizer: DomSanitizer
  ) { }

  show(message: string, duration: number = 5000) {
    const factory = this.resolver.resolveComponentFactory(DiceRollSnackComponent);
    const ref = factory.create(this.injector);


    // Manually trigger change detection
    ref.changeDetectorRef.detectChanges();



    ref.instance.message = this.sanitizer.bypassSecurityTrustHtml(message);;
    ref.instance.duration = duration;

    ref.changeDetectorRef.detectChanges();

    this.appRef.attachView(ref.hostView);
    document.body.appendChild((ref.hostView as any).rootNodes[0] as HTMLElement);

    setTimeout(() => {
      this.appRef.detachView(ref.hostView);
      ref.destroy();
    }, duration);
  }
}
