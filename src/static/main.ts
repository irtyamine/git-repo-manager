import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { FrontEndModule } from './front-end.module';
import { environment } from './environments/environment';

if(environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(FrontEndModule)
  .catch(err => console.error(err));

