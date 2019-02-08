import { Injectable } from '@angular/core';
import { frontedConfig } from './frontend-config';

@Injectable({
  providedIn: 'root'
})

export class FrontendConfigService {
  get frontendConfig() {
    return frontedConfig;
  }
}