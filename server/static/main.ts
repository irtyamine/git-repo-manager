import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { FrontendModule } from './frontend.module';
import { environment } from '../../config/environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(FrontendModule)
  .catch(err => console.error(err));

