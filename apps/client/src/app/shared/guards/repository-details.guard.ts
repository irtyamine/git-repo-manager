import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({ providedIn: 'root' })
export class RepositoryDetailsGuard implements CanActivate {

  constructor(
    private readonly router: Router,
    private readonly lsService: LocalStorageService
  ) {  }

  canActivate() {
    if (!this.lsService.getItem('repository')) {
      return false;
    }
    else {
      return true;
    }
  }

}
