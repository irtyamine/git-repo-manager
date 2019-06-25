import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class GetPackagesService {
    private tableHeaders = new BehaviorSubject<any>([]);
    private dependencies = new BehaviorSubject<any>(['The dependencies available to you will be displayed here']);
    private versions = new BehaviorSubject<any>([]);

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

    public addNewPackage(data: { name: string, recommendVersion: string, isImportant: boolean }) {
        console.log(data);
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

    public updateDependencyRecommendVersion(data: { dependencyName: string, newVersion: string }) {
        return this.http.put(`${environment.url}/repositories3/update-version`, data)
        .pipe(
          catchError(err =>
            err.code === 404 ? throwError('Not Found') : throwError(err.message)
            )
          )
          .subscribe(data => {
              this.getPackages();
            });
    }

    public deleteDependency(dependencyName: string) {
      const options = dependencyName ?
        { params: new HttpParams().set('dependency', dependencyName) } : {};
      return this.http.delete(`${environment.url}/repositories3/delete-dependency`, options)
        .pipe(
          catchError(err =>
                    err.code === 404 ? throwError('Not Found') : throwError(err.message)
          )
        )
        .subscribe(data => {
          this.getPackages();
        });
    }

    private getNewDependency(name: string): Observable<any> {
        const options = name ?
            { params: new HttpParams().set('newDependency', name) } : {};
        return this.http.get(`${environment.url}/repositories3/new-package`, options)
            .pipe(
                catchError(err =>
                    err.code === 404 ? throwError('Not Found') : throwError(err.message)
            ));
    }

    public getNewDependenciesBySearch(name: string) {
        return this.getNewDependency(name)
            .subscribe(res => {
                this.dependencies.next(res);
            });
    }

    public getVersionsBySearch(name: string) {
        return this.getVersionsForNewDependency(name)
            .subscribe(res => {
               this.versions.next(res);
            });
    }

    private getVersionsForNewDependency(name: string): Observable<any>  {
        const options = name ?
            { params: new HttpParams().set('dependencyName', name) } : {};
        return this.http.get(`${environment.url}/repositories3/new-recommend-version`, options)
            .pipe(
                catchError(err =>
                    err.code === 404 ? throwError('Not Found') : throwError(err.message)
                ));
    }

    get tableHeadersSubject() {
        return this.tableHeaders;
    }

    get newDependencies() {
        return this.dependencies;
    }

    get recommendVersions() {
        return this.versions;
    }
}
