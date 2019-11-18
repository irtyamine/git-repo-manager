import { TestBed } from '@angular/core/testing';
import { DataService } from '../../../../shared/services/data.service';
import { StoreModule } from '@ngrx/store';
import { RepositoryBranchesService } from '../repository-branches.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthReducer } from '../../../../shared/store/reducers/auth.reducer';
import { WarningsReducer } from '../../../../shared/store/reducers/warnings.reducer';
import { DefaultBranches } from '../../../../shared/services/test/mock/mock-data';
import { environment } from '../../../../../environments/environment';
import { MockLocalStorage } from '../../../../shared/services/test/mock/mock-local-storage';
import { ListOfCustombranches } from '../../../../shared/services/test/mock/mock-data';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';

describe('Service: RepositoryBranchesService', () => {
  let repositoryBranchesService: RepositoryBranchesService;
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
        RepositoryBranchesService,
        LocalStorageService,
        DataService
      ]
    });

    repositoryBranchesService = TestBed.get(RepositoryBranchesService);
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

  describe('Function: getAllBranches()', () => {
    it('should call DataService\'s getAllRepoBranches() function', () => {
      const spy = spyOn(dataService, 'getAllRepoBranches').and.callThrough();

      repositoryBranchesService.getAllBranches('testRepo');
      expect(spy).toHaveBeenCalled();
    });

    it('should return default repo branches data', () => {
      lsService.setItem('source', 'github');

      repositoryBranchesService.getAllBranches('testRepo')
        .subscribe(res => {
          expect(res).toEqual(DefaultBranches);
        });

      const req = httpMock.expectOne(`${environment.url}/api/github/repositories/branches?repoName=testRepo`);
      req.flush(DefaultBranches);

      expect(req.request.method).toBe('GET');
    });
  });

  describe('Function: getCustomBranches()', () => {
    it('should call DataService\'s getCustomBranches() function', () => {
      const spy = spyOn(dataService, 'getCustomBranches').and.callThrough();

      repositoryBranchesService.getCustomBranches('testUser', 'testRepo');
      expect(spy).toHaveBeenCalled();
    });

    it('should return custom branches', () => {
      lsService.setItem('org', 'testOrg');
      lsService.setItem('source', 'github');

      repositoryBranchesService.getCustomBranches('testUser', 'testRepo');

      const req = httpMock.expectOne(`${environment.url}/api/github/repositories/custom-branches?addedBy=testUser&repoName=testRepo&organization=testOrg&vcs=github`);
      req.flush(ListOfCustombranches);

      dataService.customBranches
        .subscribe(res => {
          expect(res).toEqual(ListOfCustombranches);
        });

      expect(req.request.method).toBe('GET');
    });
  });

  describe('Function: setNewCustomBranchesData()', () => {
    it('should call DataService\'s setCustomBranchesData() function', () => {
      lsService.setItem('org', 'testOrg');
      lsService.setItem('source', 'github');

      const dummybody = {
        repoName: 'testRepo',
        userName: 'testUser',
        organization: 'testOrg',
        baseBranch: 'testBase',
        compareBranch: 'testCompare'
      };

      const spy = spyOn(dataService, 'setCustomBranchesData').and.callThrough();
      repositoryBranchesService.setNewCustomBranchesData(
        {
          baseBranch: 'testBase',
          compareBranch: 'testCompare'
        },
        'testRepo',
        'testUser'
      )
        .subscribe();

      expect(spy).toHaveBeenCalled();
    });

    it('should set new custom branches', () => {
      lsService.setItem('org', 'testOrg');
      lsService.setItem('source', 'github');

      const dummybody = {
        repoName: 'testRepo',
        userName: 'testUser',
        organization: 'testOrg',
        baseBranch: 'testBase',
        compareBranch: 'testCompare'
      };

      const spy = spyOn(dataService, 'setCustomBranchesData').and.callThrough();
      repositoryBranchesService.setNewCustomBranchesData(
        {
          baseBranch: 'testBase',
          compareBranch: 'testCompare'
        },
        'testRepo',
        'testUser'
      )
        .subscribe(res => {
          expect(res).toEqual(ListOfCustombranches);
        });

      const req = httpMock.expectOne(`${environment.url}/api/github/repositories/add-custom-branches`);
      req.flush(ListOfCustombranches);

      expect(req.request.method).toBe('POST');
    });
  });
});
