import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';

@Injectable()
export class RepositoriesDataService {
  constructor(private readonly http: HttpClient) {  }

  public getPackages() {
    return this.http.get(`${environment.url}/github/repositories/packages`)
      .pipe();
  }

  public getRepositories() {
    return this.http.get(`${environment.url}/github/repositories/all-repositories`)
      .pipe();
  }
}
