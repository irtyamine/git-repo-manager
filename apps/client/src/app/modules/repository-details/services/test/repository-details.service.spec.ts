import { TestBed } from '@angular/core/testing';
import { RepositoryDetailsService } from '../repository-details.service';
import { ShieldsService } from '../../../../shared/services/shields.service';
import { StoreService } from '../../../../shared/services/store.service';
import { DataService } from '../../../../shared/services/data.service';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { StoreModule } from '@ngrx/store';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthReducer } from '../../../../shared/store/reducers/auth.reducer';
import { WarningsReducer } from '../../../../shared/store/reducers/warnings.reducer';
import { MockLocalStorage } from '../../../../shared/mock/mock-local-storage';
import { environment } from '../../../../../environments/environment';

describe('Service: RepositoryDetailsService', () => {
  let repositoriesDetailsService: RepositoryDetailsService;
  let shieldsService: ShieldsService;
  let storeService: StoreService;
  let dataService: DataService;
  let lsService: LocalStorageService;
  let httpMock: HttpTestingController;

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
        RepositoryDetailsService,
        DataService,
        ShieldsService,
        StoreService,
        LocalStorageService
      ]
    });

    repositoriesDetailsService = TestBed.get(RepositoryDetailsService);
    shieldsService = TestBed.get(ShieldsService);
    storeService = TestBed.get(StoreService);
    dataService = TestBed.get(DataService);
    lsService = TestBed.get(LocalStorageService);
    httpMock = TestBed.get(HttpTestingController);

    spyOn(lsService, 'getItem')
      .and.callFake(MockLocalStorage.getItem);

    spyOn(lsService, 'setItem')
      .and.callFake(MockLocalStorage.setItem);

    spyOn(lsService, 'removeItem')
      .and.callFake(MockLocalStorage.removeItem);

    spyOn(lsService, 'clear')
      .and.callFake(MockLocalStorage.clear);

    lsService.clear();
  });

  describe('Function: getRepositoryDetails()', () => {
    it('should call DataService\'s getRepositoryDetails() function', () => {
      const spy = spyOn(dataService, 'getRepositoryDetails').and.callThrough();

      repositoriesDetailsService.getRepositoryDetails();
      expect(spy).toHaveBeenCalled();
    });

    it('should get repository details', () => {
      lsService.setItem('repository', 'testRepo');
      lsService.setItem('org', 'testOrg');
      lsService.setItem('source', 'github');

      repositoriesDetailsService
        .getRepositoryDetails()
        .subscribe((res: { data: number }) => {
          expect(res.data).toBe(1);
        });

      const req = httpMock.expectOne(`${environment.url}/api/github/repositories/repository-details?repoName=testRepo&organization=testOrg`);
      req.flush({ data: 1 });

      expect(req.request.method).toBe('GET');
    });
  });

  describe('Function: getDefaultBranchesData()', () => {
    it('should call ShieldsService\'s setShieldsForRepositoryDefaultBranches() function', () => {
      const baseBranch = { branchName: 'master' };
      const compareBranch = { branchName: 'development' };

      const spy = spyOn(shieldsService, 'setShieldsForRepositoryDefaultBranches').and.callThrough();
      repositoriesDetailsService.getDefaultBranchesData({ baseBranch, compareBranch });

      expect(spy).toHaveBeenCalled();
    });

    it('should return shield link with both branches', () => {
      const baseBranch = { branchName: 'master' };
      const compareBranch = { branchName: 'development' };

      const result = repositoriesDetailsService.getDefaultBranchesData({ baseBranch, compareBranch });
      expect(result)
        .toBe(
          `https://img.shields.io/badge/default%20branches-${baseBranch.branchName}%20⟵%20${compareBranch.branchName}-green?style=flat-square`
        );
    });

    it('should return shield link with missed base branch', () => {
      const compareBranch = { branchName: 'development' };

      const result = repositoriesDetailsService.getDefaultBranchesData({ undefined, compareBranch });
      expect(result)
        .toBe(
          `https://img.shields.io/badge/default%20branches-${compareBranch.branchName}-red?style=flat-square`
        );
    });

    it('should return shield link with missed compare branch', () => {
      const baseBranch = { branchName: 'master' };

      const result = repositoriesDetailsService.getDefaultBranchesData({ baseBranch, undefined });
      expect(result)
        .toBe(
          `https://img.shields.io/badge/default%20branches-${baseBranch.branchName}-red?style=flat-square`
        );
    });
  });

  describe('Function: getUserData()', () => {
    it('should call DataService\'s getUserData() function', () => {
      const spy = spyOn(dataService, 'getUserData');

      repositoriesDetailsService.getUserData();
      expect(spy).toHaveBeenCalled();
    });

    it('should return user data', () => {
      lsService.setItem('org', 'testOrg');
      lsService.setItem('source', 'github');

      repositoriesDetailsService.getUserData()
        .subscribe((res: { login: string, role: string }) => {
          expect(res.login).toBe('testUser');
          expect(res.role).toBe('member');
        });

      const req = httpMock.expectOne(`${environment.url}/api/github/user`);
      req.flush({ login: 'testUser', role: 'member' });

      expect(req.request.method).toBe('GET');
    });
  });

  describe('Function: removeBranches()', () => {
    it('should call DataService\'s removeComparing() function', () => {
      const dummyBranches = {
        branches: {
          baseBranch: {
            branchName: 'testBranch1'
          },
          compareBranch: {
            branchName: 'testBranch2'
          }
        }
      };

      const spy = spyOn(dataService, 'removeComparing').and.callThrough();

      repositoriesDetailsService.removeBranches('testUser', 'testOrg', dummyBranches);
      expect(spy).toHaveBeenCalled();
    });

    it('should remove custom branches comparing', () => {
      lsService.setItem('org', 'testOrg');
      lsService.setItem('source', 'github');

      const dummyBranches = {
        branches: {
          baseBranch: {
            branchName: 'testBranch1'
          },
          compareBranch: {
            branchName: 'testBranch2'
          }
        }
      };

      repositoriesDetailsService.removeBranches('testUser', 'testRepo', dummyBranches);
      const req = httpMock.expectOne(`${environment.url}/api/github/repositories/remove-custom-branches?repoName=testRepo&userName=testUser&organization=testOrg&vcs=github&baseBranch=testBranch1&compareBranch=testBranch2`);
      req.flush(dummyBranches);

      expect(req.request.method).toBe('DELETE');
    });
  });
});
