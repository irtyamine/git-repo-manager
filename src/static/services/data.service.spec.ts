import { DataService } from './data.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GetRepositoriesService } from './get.repositories.service';
import { MockDataService } from './mock.data.service';

describe('Service: DataService', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ DataService, GetRepositoriesService ]
    });
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    let getRepositoriesService = TestBed.get(GetRepositoriesService),
      dataService = new DataService(getRepositoriesService);
    expect(dataService).toBeTruthy();
  });

  describe('getReposData(param)', () => {
    it ('should return "repositoriesSubject" as BehaviorSubject', () => {
      let getRepositoriesService = TestBed.get(GetRepositoriesService),
        mockService = new MockDataService(getRepositoriesService);

      const dummyData = [{
        repoName: 'RepoName/One',
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
        },
      }];

      mockService.getReposData('RepoName/One');
      let req = httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/all-repositories?repositoryName=RepoName/One`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyData[0]);

      mockService.subject.subscribe(repository => {
        expect(repository).toEqual(dummyData);
      });
    });
  });

  describe('filterByPrivacyAndBranches(value)', () => {
    it('should filter by public repos', () => {
      let getRepositoriesService = TestBed.get(GetRepositoriesService),
        mockService = new MockDataService(getRepositoriesService);

      let dummyData = [
        {
          repoName: 'RepoName/One',
          repoType: 'Public',
        },
        {
          repoName: 'RepoName/Two',
          repoType: 'Private',
        }
      ];

      for (let repo of dummyData) {
        mockService.getReposData(repo.repoName);
        let req = httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/all-repositories?repositoryName=${repo.repoName}`);
        req.flush(repo);
      }

      mockService.filterByPrivacyAndBranches('Public');

      mockService.subject.subscribe(result => {
        expect(result).toEqual([dummyData[0]]);
      });
    });

    it ('should filter by private repos', () => {
      let getRepositoriesService = TestBed.get(GetRepositoriesService),
        mockService = new MockDataService(getRepositoriesService);

      let dummyData = [
        {
          repoName: 'RepoName/One',
          repoType: 'Public',
        },
        {
          repoName: 'RepoName/Two',
          repoType: 'Private',
        }
      ];

      for (let repo of dummyData) {
        mockService.getReposData(repo.repoName);
        let req = httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/all-repositories?repositoryName=${repo.repoName}`);
        req.flush(repo);
      }

      mockService.filterByPrivacyAndBranches('Private');

      mockService.subject.subscribe(result => {
        expect(result).toEqual([dummyData[1]]);
      });
    });

    it ('should filter by missing master branch', () => {
      let getRepositoriesService = TestBed.get(GetRepositoriesService),
        mockService = new MockDataService(getRepositoriesService);

      const dummyData = [
        {
          repoName: 'RepoName/onlyMaster',
          branches: {
            master: {
              name: 'master'
            }
          }
        },
        {
          repoName: 'RepoName/onlyDevelopment',
          branches: {
            development: {
              name: 'development'
            }
          }
        }
      ];

      for (let repo of dummyData) {
        mockService.getReposData(repo.repoName);
        const req = httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/all-repositories?repositoryName=${repo.repoName}`);
        req.flush(repo);
      }

      mockService.filterByPrivacyAndBranches('master');

      mockService.subject.subscribe(result => {
        expect(result).toEqual([dummyData[1]]);
      });
    });

    it ('should filter by missing development branch', () => {
      let getRepositoriesService = TestBed.get(GetRepositoriesService),
        mockService = new MockDataService(getRepositoriesService);

      const dummyData = [
        {
          repoName: 'RepoName/onlyMaster',
          branches: {
            master: {
              name: 'master'
            }
          }
        },
        {
          repoName: 'RepoName/onlyDevelopment',
          branches: {
            development: {
              name: 'development'
            }
          }
        }
      ];

      for (let repo of dummyData) {
        mockService.getReposData(repo.repoName);
        const req = httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/all-repositories?repositoryName=${repo.repoName}`);
        req.flush(repo);
      }

      mockService.filterByPrivacyAndBranches('development');

      mockService.subject.subscribe(result => {
        expect(result).toEqual([dummyData[0]]);
      });
    });

    it ('should filter by missing master and development branches', () => {
      let getRepositoriesService = TestBed.get(GetRepositoriesService),
        mockService = new MockDataService(getRepositoriesService);

      const dummyData = [
        {
          repoName: 'RepoName/noBranches',
        },
        {
          repoName: 'RepoName/allBranches',
          branches: {
            master: {
              name: 'master'
            },
            development: {
              name: 'development'
            }
          }
        }
      ];

      for (let repo of dummyData) {
        mockService.getReposData(repo.repoName);
        const req = httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/all-repositories?repositoryName=${repo.repoName}`);
        req.flush(repo);
      }

      mockService.filterByPrivacyAndBranches('none');

      mockService.subject.subscribe(result => {
        expect(result).toEqual([dummyData[0]]);
      });
    });

    it ('should filter and return default array', () => {
      let getRepositoriesService = TestBed.get(GetRepositoriesService),
        mockService = new MockDataService(getRepositoriesService);

      const dummyData = [
        {
          repoName: 'RepoName/noBranches',
        },
        {
          repoName: 'RepoName/onlyMaster',
          branches: {
            master: {
              name: 'master'
            }
          }
        },
        {
          repoName: 'RepoName/onlyDevelopment',
          branches: {
            development: {
              name: 'development'
            }
          }
        },
        {
          repoName: 'RepoName/allBranches',
          branches: {
            master: {
              name: 'master'
            },
            development: {
              name: 'development'
            }
          }
        }
      ];

      for (let repo of dummyData) {
        mockService.getReposData(repo.repoName);
        const req = httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/all-repositories?repositoryName=${repo.repoName}`);
        req.flush(repo);
      }

      mockService.filterByPrivacyAndBranches('default');

      mockService.subject.subscribe(result => {
        expect(result).toEqual(dummyData);
      });
    });
  });

  describe('filterByPackages(value)', () => {
    it ('should filter by repository name', () => {
      let getRepositoriesService = TestBed.get(GetRepositoriesService),
        mockService = new MockDataService(getRepositoriesService);

      const dummyData = [
        {
          repoName: 'Repo/find',
          branches: {}
        },
        {
          repoName: 'Repo/miss',
          branches: {}
        }
      ];

      for (let repo of dummyData) {
        mockService.getReposData(repo.repoName);
        const req = httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/all-repositories?repositoryName=${repo.repoName}`);
        req.flush(repo);
      }

      mockService.filterByPackages({ packageName: 'repoName', version: 'fi' });

      mockService.subject.subscribe(result => {
        expect(result).toEqual([dummyData[0]]);
      });
    });

    it ('should filter by package name', () => {
      let getRepositoriesService = TestBed.get(GetRepositoriesService),
        mockService = new MockDataService(getRepositoriesService);

      const dummyData = [
        {
          repoName: 'Repo/find',
          name: 'Package/find',
          branches: {}
        },
        {
          repoName: 'Repo/miss',
          name: 'Package/miss',
          branches: {}
        }
      ];

      for (let repo of dummyData) {
        mockService.getReposData(repo.repoName);
        const req = httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/all-repositories?repositoryName=${repo.repoName}`);
        req.flush(repo);
      }

      mockService.filterByPackages({ packageName: 'name', version: 'fi' });

      mockService.subject.subscribe(result => {
        expect(result).toEqual([dummyData[0]]);
      });
    });

    it ('should filter by project version at master or development branches', () => {
      let getRepositoriesService = TestBed.get(GetRepositoriesService),
        mockService = new MockDataService(getRepositoriesService);

      const dummyData = [
        {
          repoName: 'Repo/find',
          branches: {
            master: {
              version: '0.0.1'
            },
            development: {
              version: '0.0.2'
            }
          }
        },
        {
          repoName: 'Repo/miss',
          branches: {
            master: {
              version: '1.0.0'
            }
          }
        }
      ];

      for (let repo of dummyData) {
        mockService.getReposData(repo.repoName);
        const req = httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/all-repositories?repositoryName=${repo.repoName}`);
        req.flush(repo);
      }

      mockService.subject.subscribe(result => {
        expect(result).toEqual(dummyData);
      });
    });

    it ('should filter by package description at master or development branches', () => {
      let getRepositoriesService = TestBed.get(GetRepositoriesService),
        mockService = new MockDataService(getRepositoriesService);

      const dummyData = [
        {
          repoName: 'Repo/find',
          branches: {
            master: {
              description: 'Test master description'
            }
          }
        },
        {
          repoName: 'Repo/miss',
          branches: {
            development: {
              description: 'Test development description'
            }
          }
        }
      ];

      for (let repo of dummyData) {
        mockService.getReposData(repo.repoName);
        const req = httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/all-repositories?repositoryName=${repo.repoName}`);
        req.flush(repo);
      }

      mockService.filterByPackages({ packageName: 'description', version: 'dev'});

      mockService.subject.subscribe(result => {
        expect(result).toEqual([dummyData[1]]);
      });
    });

    it ('should filter by lodash version at master or development branches', () => {
      let getRepositoriesService = TestBed.get(GetRepositoriesService),
        mockService = new MockDataService(getRepositoriesService);

      const dummyData = [
        {
          repoName: 'Repo/find',
          branches: {
            master: {
              lodash: '4*'
            }
          }
        },
        {
          repoName: 'Repo/miss',
          branches: {
            development: {
              lodash: '3.16.5'
            }
          }
        }
      ];

      for (let repo of dummyData) {
        mockService.getReposData(repo.repoName);
        const req = httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/all-repositories?repositoryName=${repo.repoName}`);
        req.flush(repo);
      }

      mockService.filterByPackages({ packageName: 'lodash', version: '4.' });

      mockService.subject.subscribe(result => {
        expect(result.length).toEqual(0);
      });
    });

    it ('should filter by tslint version at master or development branches', () => {
      let getRepositoriesService = TestBed.get(GetRepositoriesService),
        mockService = new MockDataService(getRepositoriesService);

      const dummyData = [
        {
          repoName: 'Repo/find',
          branches: {
            master: {
              tslint: '2.3.2'
            }
          }
        },
        {
          repoName: 'Repo/miss',
          branches: {
            development: {
              tslint: '3.1.5'
            }
          }
        }
      ];

      for (let repo of dummyData) {
        mockService.getReposData(repo.repoName);
        const req = httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/all-repositories?repositoryName=${repo.repoName}`);
        req.flush(repo);
      }

      mockService.filterByPackages({ packageName: 'tslint', version: '.5' });

      mockService.subject.subscribe(result => {
        expect(result).toEqual([dummyData[1]]);
      });
    });

    it ('should filter by typescript version at master or development branches', () => {
      let getRepositoriesService = TestBed.get(GetRepositoriesService),
        mockService = new MockDataService(getRepositoriesService);

      const dummyData = [
        {
          repoName: 'Repo/find',
          branches: {
            master: {
              typescript: '2.3.2'
            }
          }
        },
        {
          repoName: 'Repo/miss',
          branches: {
            development: {
              typescript: '3.1.5'
            }
          }
        }
      ];

      for (let repo of dummyData) {
        mockService.getReposData(repo.repoName);
        const req = httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/all-repositories?repositoryName=${repo.repoName}`);
        req.flush(repo);
      }

      mockService.filterByPackages({ packageName: 'typescript', version: '.5' });

      mockService.subject.subscribe(result => {
        expect(result).toEqual([dummyData[1]]);
      });
    });

    it ('should filter by express version at master or development branches', () => {
      let getRepositoriesService = TestBed.get(GetRepositoriesService),
        mockService = new MockDataService(getRepositoriesService);

      const dummyData = [
        {
          repoName: 'Repo/find',
          branches: {
            master: {
              express: '4.15.3'
            }
          }
        },
        {
          repoName: 'Repo/miss',
          branches: {
            development: {
              express: '4.16.3'
            }
          }
        }
      ];

      for (let repo of dummyData) {
        mockService.getReposData(repo.repoName);
        const req = httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/all-repositories?repositoryName=${repo.repoName}`);
        req.flush(repo);
      }

      mockService.filterByPackages({ packageName: 'express', version: '4.1' });

      mockService.subject.subscribe(result => {
        expect(result).toEqual(dummyData);
      });
    });

    it ('should filter by @angular/common version at master or development branches', () => {
      let getRepositoriesService = TestBed.get(GetRepositoriesService),
        mockService = new MockDataService(getRepositoriesService);

      const dummyData = [
        {
          repoName: 'Repo/find',
          branches: {
            master: {
              '@angular/common': '^2.4.2'
            }
          }
        },
        {
          repoName: 'Repo/miss',
          branches: {
            development: {
              '@angular/common': '4.3.6'
            }
          }
        }
      ];

      for (let repo of dummyData) {
        mockService.getReposData(repo.repoName);
        const req = httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/all-repositories?repositoryName=${repo.repoName}`);
        req.flush(repo);
      }

      mockService.filterByPackages({ packageName: '@angular/common', version: '^' });

      mockService.subject.subscribe(result => {
        expect(result).toEqual([dummyData[0]]);
      });
    });

    it ('should filter and return data with missing package at both repositories', () => {
      let getRepositoriesService = TestBed.get(GetRepositoriesService),
        mockService = new MockDataService(getRepositoriesService);

      const dummyData = [
        {
          repoName: 'Repo/find',
          branches: {
            master: {
              '@angular/common': '^2.4.2'
            },
            development: {
              tslint: '3.15.1'
            }
          }
        },
        {
          repoName: 'Repo/miss',
          branches: {
            master: {
              lodash: '4.17.1'
            },
            development: {
              '@angular/common': '4.3.6'
            }
          }
        }
      ];
      
      for (let repo of dummyData) {
        mockService.getReposData(repo.repoName);
        const req = httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/all-repositories?repositoryName=${repo.repoName}`);
        req.flush(repo);
      }

      mockService.filterByPackages({ packageName: 'lodash', version: 'none' });

      mockService.subject.subscribe(result => {
        expect(result).toEqual([dummyData[0]]);
      });
    });
  });
});