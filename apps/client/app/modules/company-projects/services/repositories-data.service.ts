import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';

@Injectable()
export class RepositoriesDataService {
  constructor(private readonly http: HttpClient) {  }

  public getUserData() {
    return this.http.get(`${environment.url}/api/github/user`);
  }

  public getPackages() {
    return this.http.get(`${environment.url}/api/github/repositories/packages`)
      .pipe();
  }

  public getRepositories() {
    return this.http.get(`${environment.url}/api/github/repositories/all-repositories`)
      .pipe();
  }
}
