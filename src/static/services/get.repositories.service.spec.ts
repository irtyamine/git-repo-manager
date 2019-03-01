import { GetRepositoriesService } from './get.repositories.service';
import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

describe('Service: GetRepositoriesService', () => {
  let injector: TestBed;
  let service: GetRepositoriesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ GetRepositoriesService ]
    });
    injector = getTestBed();
    service = injector.get(GetRepositoriesService);
    httpMock = injector.get(HttpTestingController);
  });

  it ('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getRecommendVersionDataConfig()', () => {
    it ('should return an Observable<any>', () => {
      const dummyData = {
        testPackageOne: '1',
        testPackageTwo: '2',
        testPackageThree: '3',
        testPackageFour: '4',
        testPackageFive: '5'
      };

      service.getRecommendVersionDataConfig().subscribe(versions => {
        expect(versions).toEqual(dummyData);
      });

      const req = httpMock.expectOne(`${service.API_URL}/repositories/recommend-versions`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyData);
    });

    it ('should throw the 404 error', () => {
      const emsg = 'deliberate 404 error';

      service.getRecommendVersionDataConfig().subscribe(versions =>
        fail('should have failed with the 404 error'),
       (err: HttpErrorResponse) => {
          expect(err.status).toBe(404, 'code');
          expect(err.error).toBe(emsg, 'message');
      });

      const req = httpMock.expectOne(`${service.API_URL}/repositories/recommend-versions`);
      req.flush(emsg, { status: 404, statusText: 'Not Found' });
    });

    it ('should throw the 500 error', () => {
      const emsg = 'deliberate 500 error';

      service.getRecommendVersionDataConfig().subscribe(versions =>
        fail('should have failed with the 500 error'),
       (err: HttpErrorResponse) => {
         expect(err.status).toBe(500, 'code');
         expect(err.error).toBe(emsg, 'message');
      });

      const req = httpMock.expectOne(`${service.API_URL}/repositories/recommend-versions`);
      req.flush(emsg, { status: 500, statusText: 'Internal Server Error' });
    });
  });

  describe('getRepositoryNames()', () => {
    it ('should return an Observable<any>', () => {
      const dummyData = [
        { repoName: 'TestName/One' },
        { repoName: 'TestName/Two' },
        { repoName: 'TestName/Three' },
        { repoName: 'TestName/Four' },
        { repoName: 'TestName/Five' },
        { repoName: 'TestName/Six' }
      ];

      service.getRepositoryNames().subscribe(data => {
        expect(data.length).toBe(6);
        expect(data).toEqual(dummyData);
      });

      const req = httpMock.expectOne(`${service.API_URL}/repositories/names`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyData);
    });

    it ('should throw the 404 error', () => {
      const emsg = 'deliberate 404 error';

      service.getRepositoryNames().subscribe(data =>
        fail('should have failed with the 404 error'),
        (err: HttpErrorResponse) => {
        expect(err.status).toEqual(404, 'code');
        expect(err.error).toEqual(emsg, 'message');
        });

      const req = httpMock.expectOne(`${service.API_URL}/repositories/names`);
      req.flush(emsg, { status: 404, statusText: 'Not Found' });
    });

    it ('should throw the 500 error', () => {
      const emsg = 'deliberate 500 error';

      service.getRepositoryNames().subscribe(data =>
        fail('should have failed with the 500 error'),
        (err: HttpErrorResponse) => {
        expect(err.status).toEqual(500, 'code');
        expect(err.error).toEqual(emsg, 'message');
        });

      const req = httpMock.expectOne(`${service.API_URL}/repositories/names`);
      req.flush(emsg, { status: 500, statusText: 'Internal Server Error' });
    });
  });

  describe('getAllRepositories()', () => {
    it ('should return an Observable<any>', () => {
      const dummyData = {
        repoName: 'TestName/One',
        repoType: 'Private',
        timestamp: Date.now(),
        branches: {
          master: {
            version: '0.0.0',
            description: 'Test description'
          },
          development: {
            version: '0.0.1',
            description: 'Test description v2'
          }
        }
      };

      service.getAllRepositories('TestName/One').subscribe(repository => {
        expect(repository).toBe(dummyData);
      });

      const req = httpMock.expectOne(`${service.API_URL}/repositories/all-repositories?repositoryName=TestName/One`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyData);
    });

    it ('should throw the 404 error', () => {
      const emsg = 'deliberate 404 error';

      service.getAllRepositories('TestName/Two').subscribe(repository =>
          fail('should have failed with the 404 error'),
        (err: HttpErrorResponse) => {
          expect(err.status).toEqual(404, 'status');
          expect(err.error).toEqual(emsg, 'message');
        });

      const req = httpMock.expectOne(`${service.API_URL}/repositories/all-repositories?repositoryName=TestName/Two`);
      req.flush(emsg, { status: 404, statusText: 'Not Found' });
    });

    it('should throw the 500 error', () => {
      const emsg = 'deliberate 500 error';

      service.getAllRepositories('TestName/Three').subscribe(repository =>
        fail('should have failed with the 500 error'),
        (err: HttpErrorResponse) => {
          expect(err.status).toEqual(500, 'status');
          expect(err.error).toEqual(emsg, 'message');
        });

      const req = httpMock.expectOne(`${service.API_URL}/repositories/all-repositories?repositoryName=TestName/Three`);
      req.flush(emsg, { status: 500, statusText: 'Internal Server Error' });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
