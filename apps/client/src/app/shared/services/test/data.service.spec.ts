import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DataService } from '../data.service';
import { RepositoriesDataService } from '../repositories-data.service';
import { StoreModule } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthReducer } from '../../store/reducers/auth.reducer';
import { WarningsReducer } from '../../store/reducers/warnings.reducer';
import { BehaviorSubject } from 'rxjs';
import {
  MockPackages,
  MockRepositories,
  ListOfCustombranches
} from './mock/mock-data';

@Injectable({ providedIn: 'root' })
export class MockDataService extends DataService {
  public availablePackages: BehaviorSubject<any>;
  public companyRepositories: BehaviorSubject<any>;
  public customBranchesSubject: BehaviorSubject<any>;
}

describe('Service: DataService', () => {
  let dataService: MockDataService;
  let repositoriesDataService: RepositoriesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({
          'auth': AuthReducer,
          'warnings': WarningsReducer
        }),
      ],
      providers: [ RepositoriesDataService ]
    });

    dataService = TestBed.get(MockDataService);
    repositoriesDataService = TestBed.get(RepositoriesDataService);
  });

  describe('getPackagesData()', () => {
    it('should call RepositoriesDataService\'s getPackages() function', () => {
      const spy = spyOn(repositoriesDataService, 'getPackages').and.callThrough();
      dataService.getPackagesData();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('getRepositoriesData()', () => {
    it('should call RepositoriesDataService\'s getRepositories() function', () => {
      const spy = spyOn(repositoriesDataService, 'getRepositories').and.callThrough();
      dataService.getRepositoriesData();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('getCustomBranches()', () => {
    it('should call RepositoriesDataService\'s getCustomBranches() function', () => {
      const spy = spyOn(repositoriesDataService, 'getCustomBranches').and.callThrough();
      dataService.getCustomBranches('testUser', 'testRepo');

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('setCustomBranchesData()', () => {
    it('should call RepositoriesDataService\'s setCustomBranchesData() function', () => {
      const spy = spyOn(repositoriesDataService, 'setCustomBranchesData').and.callThrough();
      dataService.setCustomBranchesData({
        baseBranch: 'customBranch1',
        compareBranch: 'customBranch2'
      },
      'testRepo',
      'testUSer');

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('getUserData()', () => {
    it('should call RepositoriesDataService\'s getUserData() function', () => {
      const spy = spyOn(repositoriesDataService, 'getUserData').and.callThrough();
      dataService.getUserData();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('getRepositoryDetails()', () => {
    it('should call RepositoriesDataService\'s getRepositoryDetails() function', () => {
      const spy = spyOn(repositoriesDataService, 'getRepositoryDetails').and.callThrough();
      dataService.getRepositoryDetails();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('getAllRepoBranches()', () => {
    it('should call RepositoriesDataService\'s getAllRepoBranchesData() function', () => {
      const spy = spyOn(repositoriesDataService, 'getAllRepoBranchesData').and.callThrough();
      dataService.getAllRepoBranches('testRepo');

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('removeComparing()', () => {
    it('should call RepositoriesDataService\'s removeComparing() function', () => {
      const spy = spyOn(repositoriesDataService, 'removeComparing').and.callThrough();
      dataService.removeComparing(
        'testUser',
        'testRepo',
        {
          branches: {
            baseBranch: { branchName: '' },
            compareBranch: { branchName: '' }
          }
        });

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('packages()', () => {
    it('should return \'availablePackages\' BehaviourSubject', () => {
      dataService.setPackagesData(MockPackages);

      dataService.packages
        .subscribe(packages => {
          expect(packages).toBe(MockPackages);
        });
    });
  });

  describe('repositories()', () => {
    it('should return \'companyRepositories\' BehaviourSubject', () => {
      dataService.setRepositories(MockRepositories);

      dataService.repositories
        .subscribe(repositories => {
          expect(repositories).toBe(MockRepositories);
        });
    });
  });

  describe('customBranches()', () => {
    it('should return \'CustomBranches\' ', () => {
      dataService.setCustomBranches(ListOfCustombranches);

      dataService.customBranches
        .subscribe(branches => {
          expect(branches).toBe(ListOfCustombranches);
        });
    });
  });
});
