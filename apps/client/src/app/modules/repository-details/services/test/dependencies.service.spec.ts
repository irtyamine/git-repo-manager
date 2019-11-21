import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DependenciesService } from '../dependencies.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { StoreService } from '../../../../../shared/services/store.service';
import { DataService } from '../../../../../shared/services/data.service';
import { AuthReducer } from '../../../../../shared/store/reducers/auth.reducer';
import { WarningsReducer } from '../../../../../shared/store/reducers/warnings.reducer';
import { MockPackages } from '../../../../../shared/mock/mock-data';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MockDependenciesService extends DependenciesService {
  public packages = new BehaviorSubject<any>([]);
}

describe('Service: DependenciesService', () => {
  let dependenciesService: MockDependenciesService;
  let dataService: DataService;
  let storeService: StoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({
          'auth': AuthReducer,
          'warnings': WarningsReducer
        }),
      ],
      providers: [
        DataService,
        StoreService,
        MockDependenciesService
      ]
    });


    dependenciesService = TestBed.get(MockDependenciesService);
    dataService = TestBed.get(DataService);
    storeService = TestBed.get(StoreService);

    dependenciesService.packages.next(MockPackages);
  });

  it('\'packages\' should be the array of packages', () => {
    dependenciesService.packages
      .subscribe(res => {
        expect(res).toEqual(MockPackages);
      });
  });

  describe('Function: compareVersions()', () => {
    it('should return \'success\' if no recommend version', () => {
      const dummyData =   {
        '@angular/common': '8.0.0-rc.3',
        branchName: 'feat-build-migrate-to-angular8-rc3',
        description: 'Native Angular Bootstrap Components',
        express: '4.16.4',
        lodash: '4.18.10',
        name: 'ngx-bootstrap-base',
        tslint: '5.10.0',
        version: '4.2.0',
      };

      const result = dependenciesService.compareVersions('version', dummyData);
      expect(result).toBe('success');
    });

    it('should return \'success\' if recommend version is OK', () => {
      const dummyData =   {
        '@angular/common': '8.0.0-rc.3',
        branchName: 'feat-build-migrate-to-angular8-rc3',
        description: 'Native Angular Bootstrap Components',
        express: '4.16.4',
        lodash: '5.18.10',
        name: 'ngx-bootstrap-base',
        tslint: '5.10.0',
        version: '4.2.0',
      };

      const result = dependenciesService.compareVersions('lodash', dummyData);
      expect(result).toBe('danger');
    });

    it('should return \'danger\' if dependency version has external symbols(^, ~, ect.)', () => {
      const dummyData =   {
        '@angular/common': '8.0.0-rc.3',
        branchName: 'feat-build-migrate-to-angular8-rc3',
        description: 'Native Angular Bootstrap Components',
        express: '4.16.4',
        lodash: '^5.18.10',
        name: 'ngx-bootstrap-base',
        tslint: '5.10.0',
        version: '4.2.0',
      };

      const result = dependenciesService.compareVersions('lodash', dummyData);
      expect(result).toBe('danger');
    });
  });

  describe('Function: checkForImportantDependencies()', () => {
    it('should call StoreService\'s setWarning function if there aren\'t any important dependencies', () => {
      const spy = spyOn(storeService, 'setWarnings').and.callThrough();

      dependenciesService.checkForImportantDependencies([MockPackages[1]]);
      expect(spy).toHaveBeenCalled();
    });
  });
});

