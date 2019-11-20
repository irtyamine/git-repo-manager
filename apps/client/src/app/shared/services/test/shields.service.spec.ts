import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ShieldsService } from '../shields.service';
import { DataService } from '../data.service';
import { StoreService } from '../store.service';
import { StoreModule } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthReducer } from '../../store/reducers/auth.reducer';
import { WarningsReducer } from '../../store/reducers/warnings.reducer';
import { BehaviorSubject } from 'rxjs';

import {
  DefaultBranches,
  MockPackages
} from '../../mock/mock-data';

@Injectable({ providedIn: 'root' })
class MockShieldsService extends ShieldsService {
  public packages: BehaviorSubject<any>;
  public shieldsUrl: string;
}

describe('Service: ShieldsService', () => {
  let shieldsService: MockShieldsService;
  let shieldsUrl: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({
          'auth': AuthReducer,
          'warnings': WarningsReducer
        }),
      ],
      providers: [ ShieldsService, DataService, StoreService ]
    });

    shieldsService = TestBed.get(MockShieldsService);
    shieldsUrl = shieldsService.shieldsUrl;
    shieldsService.packages.next(MockPackages);
  });

  describe('setShieldsForDependencies(dependency: string)', () => {
    it('should return shield link for dependency without recommend version', () => {
      const result = shieldsService.setShieldsForDependencies('version');

      expect(result)
        .toBe(
          `${shieldsUrl}/-version-blue?style=flat-square`
        )
    });

    it('should return shield link for dependency with recommend version', () => {
      const result = shieldsService.setShieldsForDependencies('lodash');

      expect(result)
        .toBe(
          `${shieldsUrl}/lodash-14.17.10-blue?style=flat-square`
        )
    })
  });

  describe('setRepositoryDependencies(dependency: string)', () => {
    it('should return shield link for non-important dependency', () => {
      const result = shieldsService.setRepositoryDependencies('lodash');

      expect(result)
        .toBe(
          `${shieldsUrl}/-lodash-blue?style=flat-square`
        );
    });

    it('should return shield link for important dependency', () => {
      const result = shieldsService.setRepositoryDependencies('version');

      expect(result)
        .toBe(
          `${shieldsUrl}/-version-important?style=flat-square`
        )
    })
  });

  describe('setShieldsForRepositoryDefaultBranches(baseBranch: any, compareBranch: any)', () => {
    it('should return shield link for missed base branch', () => {
      const result = shieldsService.setShieldsForRepositoryDefaultBranches(undefined, DefaultBranches.compareBranch);

      expect(result)
        .toBe(
          `${shieldsUrl}/default%20branches-${DefaultBranches.compareBranch.branchName}-red?style=flat-square`
        )
    });

    it('should return shield link for missed compare branch', () => {
      const result = shieldsService.setShieldsForRepositoryDefaultBranches(DefaultBranches.baseBranch, undefined);

      expect(result)
        .toBe(
          `${shieldsUrl}/default%20branches-${DefaultBranches.baseBranch.branchName}-red?style=flat-square`
        )
    });

    it('should return shield link for both default branches', () => {
      const result = shieldsService.setShieldsForRepositoryDefaultBranches(DefaultBranches.baseBranch, DefaultBranches.compareBranch);

      expect(result)
        .toBe(
          `${shieldsUrl}/default%20branches-${DefaultBranches.baseBranch.branchName}%20\u27F5%20${DefaultBranches.compareBranch.branchName}-green?style=flat-square`
        )
    });
  })

});
