import { TestBed } from '@angular/core/testing';
import { RepositoriesDataService } from '../repositories-data.service';
import { StoreService } from '../store.service';
import { StoreModule } from '@ngrx/store';
import { LocalStorageService } from '../local-storage.service';
import { AuthReducer } from '../../store/reducers/auth.reducer';
import { WarningsReducer } from '../../store/reducers/warnings.reducer';
import { MockLocalStorage } from './mock/mock-local-storage';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { MockPackages, MockRepositories } from './mock/mock-data';
import { environment } from '../../../../environments/environment';

describe('Service: RepositoriesDataService', () => {
  let reposDataService: RepositoriesDataService;
  let storeService: StoreService;
  let httpMock: HttpTestingController;
  let lsService: LocalStorageService;

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
        RepositoriesDataService,
        LocalStorageService
      ]
    });

    reposDataService = TestBed.get(RepositoriesDataService);
    storeService = TestBed.get(StoreService);
    httpMock = TestBed.get(HttpTestingController);
    lsService = TestBed.get(LocalStorageService);

    spyOn(localStorage, 'getItem')
      .and.callFake(MockLocalStorage.getItem);

    spyOn(localStorage, 'setItem')
      .and.callFake(MockLocalStorage.setItem);

    spyOn(localStorage, 'removeItem')
      .and.callFake(MockLocalStorage.removeItem);

    spyOn(localStorage, 'clear')
      .and.callFake(MockLocalStorage.clear);

    lsService.clear();
  });

  describe('Requests to GitHub endpoints', () => {
    it('should return user data', () => {
      lsService.setItem('org', 'valor-software');
      lsService.setItem('source', 'github');

      const mockUsrData = {
        login: 'testUser',
        dataSource: 'github'
      };

      reposDataService.getUserData()
        .subscribe((user: { login: string, dataSource: string }) => {
          expect(user.login).toBe('testUser');
          expect(user.dataSource).toBe('github')
        });

      const req = httpMock.expectOne(`${environment.url}/api/github/user`);
      expect(req.request.method).toEqual('GET');

      req.flush(mockUsrData);
    });

    it('should return repository packages', () => {
      lsService.setItem('org', 'testOrg');
      lsService.setItem('source', 'github');

      reposDataService.getPackages()
        .subscribe((res: Object[]) => {
          expect(res).toEqual(MockPackages)
        });

      const req = httpMock.expectOne(`${environment.url}/api/github/repositories/packages?organization=testOrg&dataSource=github`);
      expect(req.request.method).toEqual('GET');

      req.flush(MockPackages);
    });

    it('should return all repositories data', () => {
      lsService.setItem('org', 'testOrg');
      lsService.setItem('source', 'github');

      reposDataService.getRepositories()
        .subscribe((res: Object[]) => {
          expect(res).toEqual(MockRepositories);
        });

      const req = httpMock.expectOne(`${environment.url}/api/github/repositories/all-repositories?organization=testOrg&dataSource=github`);
      expect(req.request.method).toEqual('GET');

      req.flush(MockRepositories);
    });

    it('should return single repository data', () => {
      lsService.setItem('org', 'testOrg');
      lsService.setItem('source', 'github');
      lsService.setItem('repository', 'testRepo2');

      const resultRepo = MockRepositories.find(repo => repo.repoName === 'testRepo2');

      reposDataService.getRepositoryDetails()
        .subscribe((res: any) => {
          expect(res).toEqual(resultRepo);
        });

      const req = httpMock.expectOne(`${environment.url}/api/github/repositories/repository-details?repoName=testRepo2&organization=testOrg`);
      expect(req.request.method).toEqual('GET');

      req.flush(resultRepo);
    })
  })

});
