import { TestBed } from '@angular/core/testing';
import { RepositoryDetailsGuard } from '../repository-details.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorageService } from '../../services/local-storage.service';
import { MockLocalStorage } from '../../mock/mock-local-storage';

describe('Guard: RepositoryDetailsGuard', () => {
  let repositoryDetailsGuard: RepositoryDetailsGuard;
  let lsService: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [ LocalStorageService ]
    });

    lsService = TestBed.get(LocalStorageService);
    repositoryDetailsGuard = TestBed.get(RepositoryDetailsGuard);

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

  describe('canActivate()', () => {
    it('should return false if there isn\'t repository name at localStorage', () => {
      expect(repositoryDetailsGuard.canActivate()).toBeFalsy();
    });

    it('should return true if there is the repository name at localStorage', () => {
      lsService.setItem('repository', 'testRepo');
      expect(repositoryDetailsGuard.canActivate()).toBeTruthy();
    });
  });
});
