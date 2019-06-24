// import { TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { GetRepositoriesService } from './get.repositories.service';
// import { DataService } from './data.service';
//
// let mockRepositories = require('./mock.repositories.response.json');
//
// describe('Service: DataService', () => {
//   let httpMock: HttpTestingController;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [ HttpClientTestingModule ],
//       providers: [ DataService, GetRepositoriesService ]
//     });
//     httpMock = TestBed.get(HttpTestingController);
//   });
//
//   it('should be created', (done: DoneFn) => {
//     let getRepositoriesService = TestBed.get(GetRepositoriesService),
//       dataService = new DataService(getRepositoriesService);
//     expect(dataService).toBeTruthy();
//     done();
//   });
//
//   describe('loadReposNames()', () => {
//     it('should return an Observable', (done: DoneFn) => {
//       let getRepositoriesService = TestBed.get(GetRepositoriesService),
//         mockService = new DataService(getRepositoriesService);
//
//       mockService.loadReposNames().subscribe(repositoriesNames => {
//         expect(repositoriesNames).toEqual({repoName: mockRepositories.dummyData[0].repoName});
//         done();
//       });
//
//       httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/names`)
//         .flush({'repoName': mockRepositories.dummyData[0].repoName});
//     });
//   });
//
//   describe('getReposData(param)', () => {
//     it ('should return "repositoriesSubject" as BehaviorSubject', (done: DoneFn) => {
//       let getRepositoriesService = TestBed.get(GetRepositoriesService),
//         mockService = new DataService(getRepositoriesService);
//
//       for(let repo of mockRepositories.dummyData) {
//         mockService.getReposData(repo.repoName);
//         httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
//         .flush(repo);
//       }
//
//       mockService.subject.subscribe(repository => {
//         expect(repository).toEqual(mockRepositories.dummyData);
//         done();
//       });
//     });
//   });
//
//   describe('filterByPrivacyAndBranches(value)', () => {
//     it('should filter by public repos', (done: DoneFn) => {
//       let getRepositoriesService = TestBed.get(GetRepositoriesService),
//         mockService = new DataService(getRepositoriesService);
//
//       for (let repo of mockRepositories.dummyData) {
//         mockService.getReposData(repo.repoName);
//         httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
//           .flush(repo);
//       }
//
//       mockService.filterByPrivacyAndBranches('repoType',{});
//
//       mockService.subject.subscribe(repositories => {
//         expect(repositories.length).toBe(5);
//         done();
//       });
//     });
//
//     it ('should filter by private repos', (done: DoneFn) => {
//       let getRepositoriesService = TestBed.get(GetRepositoriesService),
//         mockService = new DataService(getRepositoriesService);
//
//       for (let repo of mockRepositories.dummyData) {
//         mockService.getReposData(repo.repoName);
//         let req = httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`);
//         req.flush(repo);
//       }
//
//       mockService.filterByPrivacyAndBranches('repoType', {});
//
//       mockService.subject.subscribe(repositories => {
//         expect(repositories.length).toBe(4);
//         done();
//       });
//     });
//
//     it ('should filter by missing master branch', (done: DoneFn) => {
//       let getRepositoriesService = TestBed.get(GetRepositoriesService),
//         mockService = new DataService(getRepositoriesService);
//
//       for (let repo of mockRepositories.dummyData) {
//         mockService.getReposData(repo.repoName);
//         httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
//           .flush(repo);
//       }
//
//       mockService.filterByPrivacyAndBranches('branch', {});
//
//       mockService.subject.subscribe(repositories => {
//         expect(repositories.length).toBe(3);
//         done();
//       });
//     });
//
//     it ('should filter by missing development branch', (done: DoneFn) => {
//       let getRepositoriesService = TestBed.get(GetRepositoriesService),
//         mockService = new DataService(getRepositoriesService);
//
//       for (let repo of mockRepositories.dummyData) {
//         mockService.getReposData(repo.repoName);
//         httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
//           .flush(repo);
//       }
//
//       mockService.filterByPrivacyAndBranches('branch', {});
//
//       mockService.subject.subscribe(repositories => {
//         expect(repositories.length).toBe(2);
//         done();
//       });
//     });
//
//     it ('should filter and return default array', (done: DoneFn) => {
//       let getRepositoriesService = TestBed.get(GetRepositoriesService),
//         mockService = new DataService(getRepositoriesService);
//
//       for (let repo of mockRepositories.dummyData) {
//         mockService.getReposData(repo.repoName);
//         httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
//           .flush(repo);
//       }
//
//       mockService.filterByPrivacyAndBranches('branch', {});
//
//       mockService.subject.subscribe(repositories => {
//         expect(repositories).toEqual(mockRepositories.dummyData);
//         done();
//       });
//     });
//   });
//
//   describe('filterByPackages(value)', () => {
//     it ('should filter by repository name', (done: DoneFn) => {
//       let getRepositoriesService = TestBed.get(GetRepositoriesService),
//         mockService = new DataService(getRepositoriesService);
//
//       for (let repo of mockRepositories.dummyData) {
//         mockService.getReposData(repo.repoName);
//         httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
//           .flush(repo);
//       }
//
//       mockService.filterByPackages({ packageName: 'repoName', version: 't' });
//
//       mockService.subject.subscribe(repositories => {
//         expect(repositories.length).toBe(3);
//         done();
//       });
//     });
//
//     it ('should filter by package name', (done: DoneFn) => {
//       let getRepositoriesService = TestBed.get(GetRepositoriesService),
//         mockService = new DataService(getRepositoriesService);
//
//       for (let repo of mockRepositories.dummyData) {
//         mockService.getReposData(repo.repoName);
//         httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
//           .flush(repo);
//       }
//
//       mockService.filterByPackages({ packageName: 'name', version: 'mas' });
//
//       mockService.subject.subscribe(repositories => {
//         expect(repositories.length).toBe(1);
//         done();
//       });
//     });
//
//     it ('should filter by project version at master or development branches', (done: DoneFn) => {
//       let getRepositoriesService = TestBed.get(GetRepositoriesService),
//         mockService = new DataService(getRepositoriesService);
//
//       for (let repo of mockRepositories.dummyData) {
//         mockService.getReposData(repo.repoName);
//         httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
//           .flush(repo);
//       }
//
//       mockService.filterByPackages({packageName: 'version', version: '0.1'});
//
//       mockService.subject.subscribe(repositories => {
//         expect(repositories.length).toBe(3);
//         done();
//       });
//     });
//
//     it ('should filter by package description at master or development branches', (done: DoneFn) => {
//       let getRepositoriesService = TestBed.get(GetRepositoriesService),
//         mockService = new DataService(getRepositoriesService);
//
//       for (let repo of mockRepositories.dummyData) {
//         mockService.getReposData(repo.repoName);
//         httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
//           .flush(repo);
//       }
//
//       mockService.filterByPackages({ packageName: 'description', version: 'desc'});
//
//       mockService.subject.subscribe(repositories => {
//         expect(repositories.length).toBe(2);
//         done();
//       });
//     });
//
//     it ('should filter by lodash version at master or development branches', (done: DoneFn) => {
//       let getRepositoriesService = TestBed.get(GetRepositoriesService),
//         mockService = new DataService(getRepositoriesService);
//
//       for (let repo of mockRepositories.dummyData) {
//         mockService.getReposData(repo.repoName);
//         httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
//           .flush(repo);
//       }
//
//       mockService.filterByPackages({ packageName: 'lodash', version: '*' });
//
//       mockService.subject.subscribe(repositories => {
//         expect(repositories.length).toBe(1);
//         done();
//       });
//     });
//
//     it ('should filter by tslint version at master or development branches', (done: DoneFn) => {
//       let getRepositoriesService = TestBed.get(GetRepositoriesService),
//         mockService = new DataService(getRepositoriesService);
//
//       for (let repo of mockRepositories.dummyData) {
//         mockService.getReposData(repo.repoName);
//         httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
//           .flush(repo);
//       }
//
//       mockService.filterByPackages({ packageName: 'tslint', version: '.5' });
//
//       mockService.subject.subscribe(repositories => {
//         expect(repositories.length).toBe(0);
//         done();
//       });
//     });
//
//     it ('should filter by typescript version at master or development branches', (done: DoneFn) => {
//       let getRepositoriesService = TestBed.get(GetRepositoriesService),
//         mockService = new DataService(getRepositoriesService);
//
//       for (let repo of mockRepositories.dummyData) {
//         mockService.getReposData(repo.repoName);
//         httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
//           .flush(repo);
//       }
//
//       mockService.filterByPackages({ packageName: 'typescript', version: '.2.' });
//
//       mockService.subject.subscribe(repositories => {
//         expect(repositories.length).toBe(2);
//         done();
//       });
//     });
//
//     it ('should filter by express version at master or development branches', (done: DoneFn) => {
//       let getRepositoriesService = TestBed.get(GetRepositoriesService),
//         mockService = new DataService(getRepositoriesService);
//
//       for (let repo of mockRepositories.dummyData) {
//         mockService.getReposData(repo.repoName);
//         httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
//           .flush(repo);
//       }
//
//       mockService.filterByPackages({ packageName: 'express', version: '4.1' });
//
//       mockService.subject.subscribe(repositories => {
//         expect(repositories.length).toBe(4);
//         done();
//       });
//     });
//
//     it ('should filter by @angular/common version at master or development branches', (done: DoneFn) => {
//       let getRepositoriesService = TestBed.get(GetRepositoriesService),
//         mockService = new DataService(getRepositoriesService);
//
//       for (let repo of mockRepositories.dummyData) {
//         mockService.getReposData(repo.repoName);
//         httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
//           .flush(repo);
//       }
//
//       mockService.filterByPackages({ packageName: '@angular/common', version: '^' });
//
//       mockService.subject.subscribe(repositories => {
//         expect(repositories.length).toBe(1);
//         done();
//       });
//     });
//
//     it ('should filter and return data with missing package at both branches', (done: DoneFn) => {
//       let getRepositoriesService = TestBed.get(GetRepositoriesService),
//         mockService = new DataService(getRepositoriesService);
//
//       for (let repo of mockRepositories.dummyData) {
//         mockService.getReposData(repo.repoName);
//         httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
//           .flush(repo);
//       }
//
//       mockService.filterByPackages({ packageName: 'lodash', version: 'none' });
//
//       mockService.subject.subscribe(repositories => {
//         expect(repositories.length).toBe(6);
//         done();
//       });
//     });
//   });
// });
