import {
  provideTransloco,
  TranslocoModule
} from '@ngneat/transloco';
import { NgModule } from '@angular/core';
import { TranslocoHttpLoader } from './transloco-loader';

@NgModule({
  exports: [ TranslocoModule ],
  providers: [
      provideTransloco({
        config: {
          availableLangs: ['en', 'uk'],
          defaultLang: 'en',
          reRenderOnLangChange: true,
        },
        loader: TranslocoHttpLoader
      }),
  ],
})
export class TranslocoRootModule {}
