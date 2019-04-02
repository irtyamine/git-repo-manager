import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GetRepositoriesService } from './get.repositories.service';
import { MockDataService } from './mock.data.service';
let mockRepositories = require('./mock.repositories.json');

describe('Service: DataService', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ MockDataService, GetRepositoriesService ]
    });
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    let getRepositoriesService = TestBed.get(GetRepositoriesService),
      dataService = new MockDataService(getRepositoriesService);
    expect(dataService).toBeTruthy();
  });

  describe('loadReposNames()', () => {
    it('should return an Observable', () => {
      let getRepositoriesService = TestBed.get(GetRepositoriesService),
        mockService = new MockDataService(getRepositoriesService);

      mockService.loadReposNames().subscribe(repositoriesNames => {
        expect(repositoriesNames).toEqual(mockRepositories.dummyData[0].repoName);
      });

      httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/names`)
        .flush(mockRepositories.dummyData[0].repoName);
    });
  });

  describe('getNames(name)', () => {
    it('should get repository name and call getReposData(param)', () => {
      let getRepositoriesService = TestBed.get(GetRepositoriesService),
        mockService = new MockDataService(getRepositoriesService),
        getReposDataSpy = spyOn(mockService, 'getReposData');

      mockService.getNames('name');
      expect(getReposDataSpy).toHaveBeenCalled();
    });
  });

  describe('getReposData(param)', () => {
    it ('should return "repositoriesSubject" as BehaviorSubject', () => {
      let getRepositoriesService = TestBed.get(GetRepositoriesService),
        mockService = new MockDataService(getRepositoriesService);

      for(let repo of mockRepositories.dummyData) {
        mockService.getReposData(repo.repoName);
        httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
        .flush(repo);
      }

      mockService.subject.subscribe(repository => {
        expect(repository).toEqual(mockRepositories.dummyData);
      });
    });
  });

  describe('filterByPrivacyAndBranches(value)', () => {
    it('should filter by public repos', () => {
      let getRepositoriesService = TestBed.get(GetRepositoriesService),
        mockService = new MockDataService(getRepositoriesService);

      for (let repo of mockRepositories.dummyData) {
        mockService.getReposData(repo.repoName);
        httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
          .flush(repo);
      }

      mockService.filterByPrivacyAndBranches('Public');

      mockService.subject.subscribe(repositories => {
        expect(repositories.length).toBe(5);
      });
    });

    it ('should filter by private repos', () => {
      let getRepositoriesService = TestBed.get(GetRepositoriesService),
        mockService = new MockDataService(getRepositoriesService);

      for (let repo of mockRepositories.dummyData) {
        mockService.getReposData(repo.repoName);
        let req = httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`);
        req.flush(repo);
      }

      mockService.filterByPrivacyAndBranches('Private');

      mockService.subject.subscribe(repositories => {
        expect(repositories.length).toBe(4);
      });
    });

    it ('should filter by missing master branch', () => {
      let getRepositoriesService = TestBed.get(GetRepositoriesService),
        mockService = new MockDataService(getRepositoriesService);

      for (let repo of mockRepositories.dummyData) {
        mockService.getReposData(repo.repoName);
        httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
          .flush(repo);
      }

      mockService.filterByPrivacyAndBranches('master');

      mockService.subject.subscribe(repositories => {
        expect(repositories.length).toBe(3);
      });
    });

    it ('should filter by missing development branch', () => {
      let getRepositoriesService = TestBed.get(GetRepositoriesService),
        mockService = new MockDataService(getRepositoriesService);

      for (let repo of mockRepositories.dummyData) {
        mockService.getReposData(repo.repoName);
        httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
          .flush(repo);
      }

      mockService.filterByPrivacyAndBranches('development');

      mockService.subject.subscribe(repositories => {
        expect(repositories.length).toBe(2);
      });
    });

    it ('should filter and return default array', () => {
      let getRepositoriesService = TestBed.get(GetRepositoriesService),
        mockService = new MockDataService(getRepositoriesService);

      for (let repo of mockRepositories.dummyData) {
        mockService.getReposData(repo.repoName);
        httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
          .flush(repo);
      }

      mockService.filterByPrivacyAndBranches('default');

      mockService.subject.subscribe(repositories => {
        expect(repositories).toEqual(mockRepositories.dummyData);
      });
    });
  });

  describe('filterByPackages(value)', () => {
    it ('should filter by repository name', () => {
      let getRepositoriesService = TestBed.get(GetRepositoriesService),
        mockService = new MockDataService(getRepositoriesService);

      for (let repo of mockRepositories.dummyData) {
        mockService.getReposData(repo.repoName);
        httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
          .flush(repo);
      }

      mockService.filterByPackages({ packageName: 'repoName', version: 't' });

      mockService.subject.subscribe(repositories => {
        expect(repositories.length).toBe(3);
      });
    });

    it ('should filter by package name', () => {
      let getRepositoriesService = TestBed.get(GetRepositoriesService),
        mockService = new MockDataService(getRepositoriesService);

      for (let repo of mockRepositories.dummyData) {
        mockService.getReposData(repo.repoName);
        httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
          .flush(repo);
      }

      mockService.filterByPackages({ packageName: 'name', version: 'mas' });

      mockService.subject.subscribe(repositories => {
        expect(repositories.length).toBe(1);
      });
    });

    it ('should filter by project version at master or development branches', () => {
      let getRepositoriesService = TestBed.get(GetRepositoriesService),
        mockService = new MockDataService(getRepositoriesService);

      for (let repo of mockRepositories.dummyData) {
        mockService.getReposData(repo.repoName);
        httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
          .flush(repo);
      }

      mockService.filterByPackages({packageName: 'version', version: '0.1'});

      mockService.subject.subscribe(repositories => {
        expect(repositories.length).toBe(3);
      });
    });

    it ('should filter by package description at master or development branches', () => {
      let getRepositoriesService = TestBed.get(GetRepositoriesService),
        mockService = new MockDataService(getRepositoriesService);

      for (let repo of mockRepositories.dummyData) {
        mockService.getReposData(repo.repoName);
        httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
          .flush(repo);
      }

      mockService.filterByPackages({ packageName: 'description', version: 'desc'});

      mockService.subject.subscribe(repositories => {
        expect(repositories.length).toBe(2);
      });
    });

    it ('should filter by lodash version at master or development branches', () => {
      let getRepositoriesService = TestBed.get(GetRepositoriesService),
        mockService = new MockDataService(getRepositoriesService);

      for (let repo of mockRepositories.dummyData) {
        mockService.getReposData(repo.repoName);
        httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
          .flush(repo);
      }

      mockService.filterByPackages({ packageName: 'lodash', version: '*' });

      mockService.subject.subscribe(repositories => {
        expect(repositories.length).toBe(1);
      });
    });

    it ('should filter by tslint version at master or development branches', () => {
      let getRepositoriesService = TestBed.get(GetRepositoriesService),
        mockService = new MockDataService(getRepositoriesService);

      for (let repo of mockRepositories.dummyData) {
        mockService.getReposData(repo.repoName);
        httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
          .flush(repo);
      }

      mockService.filterByPackages({ packageName: 'tslint', version: '.5' });

      mockService.subject.subscribe(repositories => {
        expect(repositories.length).toBe(0);
      });
    });

    it ('should filter by typescript version at master or development branches', () => {
      let getRepositoriesService = TestBed.get(GetRepositoriesService),
        mockService = new MockDataService(getRepositoriesService);

      for (let repo of mockRepositories.dummyData) {
        mockService.getReposData(repo.repoName);
        httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
          .flush(repo);
      }

      mockService.filterByPackages({ packageName: 'typescript', version: '.2.' });

      mockService.subject.subscribe(repositories => {
        expect(repositories.length).toBe(2);
      });
    });

    it ('should filter by express version at master or development branches', () => {
      let getRepositoriesService = TestBed.get(GetRepositoriesService),
        mockService = new MockDataService(getRepositoriesService);

      for (let repo of mockRepositories.dummyData) {
        mockService.getReposData(repo.repoName);
        httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
          .flush(repo);
      }

      mockService.filterByPackages({ packageName: 'express', version: '4.1' });

      mockService.subject.subscribe(repositories => {
        expect(repositories.length).toBe(4);
      });
    });

    it ('should filter by @angular/common version at master or development branches', () => {
      let getRepositoriesService = TestBed.get(GetRepositoriesService),
        mockService = new MockDataService(getRepositoriesService);

      for (let repo of mockRepositories.dummyData) {
        mockService.getReposData(repo.repoName);
        httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
          .flush(repo);
      }

      mockService.filterByPackages({ packageName: '@angular/common', version: '^' });

      mockService.subject.subscribe(repositories => {
        expect(repositories.length).toBe(1);
      });
    });

    it ('should filter and return data with missing package at both branches', () => {
      let getRepositoriesService = TestBed.get(GetRepositoriesService),
        mockService = new MockDataService(getRepositoriesService);
      
      for (let repo of mockRepositories.dummyData) {
        mockService.getReposData(repo.repoName);
        httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
          .flush(repo);
      }

      mockService.filterByPackages({ packageName: 'lodash', version: 'none' });

      mockService.subject.subscribe(repositories => {
        expect(repositories.length).toBe(2);
      });
    });
  });
});