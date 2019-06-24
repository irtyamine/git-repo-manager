import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class GetPackagesService {
    private tableHeaders = new BehaviorSubject<any>([]);

    constructor(private http: HttpClient) {
        this.getPackages();
    }

    protected getPackages() {
      return this.http.get(`${environment.url}/repositories3/all-packages`)
        .pipe(
          catchError(err =>
            err.code === 404 ? throwError('Not Found') : throwError(err.message)
          )
        ).subscribe(data => {
              this.tableHeaders.next(data);
        });
    }

    public addNewPackage(data: { name: string, _package: { recommendVersion: string, addedBy: string, isImportant: boolean }}) {
      return this.http.post(`${environment.url}/repositories3/insert-package`, data)
        .pipe(
          catchError(err =>
            err.code === 404 ? throwError('Not Found') : throwError(err.message)
            )
          )
          .subscribe(data => {
            this.getPackages();
          });
    }

    public getRecommendVersions() {
        return this.http.get(`${environment.url}/repositories3/recommend-versions`)
            .pipe(
                catchError(err =>
                    err.code === 404 ? throwError('Not Found') : throwError(err.message)
                )
            );
    }

    get tableHeadersSubject() {
        return this.tableHeaders;
    }
}
