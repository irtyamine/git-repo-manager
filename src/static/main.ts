import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { FrontendModule } from './frontend.module';
import { environment } from './environments/environment';

if(environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(FrontendModule)
  .catch(err => console.error(err));

