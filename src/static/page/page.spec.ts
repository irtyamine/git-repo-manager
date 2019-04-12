import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Page} from './page';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
const dummyObject = require('../services/mock.repositories.json');
import { DataService } from '../services/data.service';
import { GetRepositoriesService } from '../services/get.repositories.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('Component: PageComponent', () => {
  let component: Page;
  let fixture: ComponentFixture<Page>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ Page ],
      imports: [ HttpClientTestingModule ],
      providers: [ DataService, GetRepositoriesService ]
    }).compileComponents();

    fixture = TestBed.createComponent(Page);
    httpMock = TestBed.get(HttpTestingController);
  });

  describe('<thead>', () => {
    it('should have only one tag <tr>', (done: DoneFn) => {
      const bannerDebug: DebugElement = fixture.debugElement,
        paragraphDebug = bannerDebug.queryAll(By.css('thead tr'));

      expect(paragraphDebug.length).toBe(1);
      done();
    });

    it('should have 11 <th> tags', (done: DoneFn) => {
      const bannerDebug: DebugElement = fixture.debugElement,
        paragraphDebug = bannerDebug.queryAll(By.css('thead tr th'));

      expect(paragraphDebug.length).toBe(11);
      done();
    });

    describe('<th>', () => {
      it('should have <th> tag with "Repository name" value', (done: DoneFn) => {
        const bannerDebug: DebugElement = fixture.debugElement,
          paragraphDebug = bannerDebug.queryAll(By.css('th')),
          th = paragraphDebug[0].nativeElement;

        expect(th.textContent).toEqual('Repository name');
        done();
      });

      it('should have <th> tag with "Type of privacy" value', (done: DoneFn) => {
        const bannerDebug: DebugElement = fixture.debugElement,
          paragraphDebug = bannerDebug.queryAll(By.css('th')),
          th = paragraphDebug[1].nativeElement;

        expect(th.textContent).toEqual('Type of privacy');
        done();
      });

      it('should have <th> tag with "Branches" value', (done: DoneFn) => {
        const bannerDebug: DebugElement = fixture.debugElement,
          paragraphDebug = bannerDebug.queryAll(By.css('th')),
          th = paragraphDebug[2].nativeElement;

        expect(th.textContent).toEqual('Branches');
        done();
      });

      it('should have <th> tag with "package name" value', (done: DoneFn) => {
        const bannerElement: HTMLElement = fixture.nativeElement,
          a = bannerElement.querySelector('a');

        const bannerDebug: DebugElement = fixture.debugElement,
          paragraphDebug = bannerDebug.queryAll(By.css('th')),
          th = paragraphDebug[3].nativeElement;

        expect(a.textContent).toEqual('*');
        expect(th.textContent).toEqual('package name*');
        done();
      });

      it('should have <th> tag with "version*" value', (done: DoneFn) => {
        const bannerElement: HTMLElement = fixture.nativeElement,
          a = bannerElement.querySelector('a');

        const bannerDebug: DebugElement = fixture.debugElement,
          paragraphDebug = bannerDebug.queryAll(By.css('th')),
          th = paragraphDebug[4].nativeElement;

        expect(a.textContent).toEqual('*');
        expect(th.textContent).toEqual('version*');
        done();
      });

      it('should have <th> tag with "description*" value', (done: DoneFn) => {
        const bannerElement: HTMLElement = fixture.nativeElement,
          a = bannerElement.querySelector('a');
        const bannerDebug: DebugElement = fixture.debugElement,
          paragraphDebug = bannerDebug.queryAll(By.css('th')),
          th = paragraphDebug[5].nativeElement;

        expect(a.textContent).toEqual('*');
        expect(th.textContent).toEqual('description*');
        done();
      });

      it('should have <th> tag with "lodash" value', (done: DoneFn) => {
        const bannerDebug: DebugElement = fixture.debugElement,
          paragraphDebug = bannerDebug.queryAll(By.css('th')),
          th = paragraphDebug[6].nativeElement;

        expect(th.textContent).toEqual('lodash');
        done();
      });

      it('should have <th> tag with "tslint*" value', (done: DoneFn) => {
        const bannerElement: HTMLElement = fixture.nativeElement,
          a = bannerElement.querySelector('a');
        const bannerDebug: DebugElement = fixture.debugElement,
          paragraphDebug = bannerDebug.queryAll(By.css('th')),
          th = paragraphDebug[7].nativeElement;

        expect(a.textContent).toEqual('*');
        expect(th.textContent).toEqual('tslint*');
        done();
      });

      it('should have <th> tag with "typescript*" value', (done: DoneFn) => {
        const bannerElement: HTMLElement = fixture.nativeElement,
          a = bannerElement.querySelector('a');
        const bannerDebug: DebugElement = fixture.debugElement,
          paragraphDebug = bannerDebug.queryAll(By.css('th')),
          th = paragraphDebug[8].nativeElement;

        expect(a.textContent).toEqual('*');
        expect(th.textContent).toEqual('typescript*');
        done();
      });

      it('should have <th> tag with "express" value', (done: DoneFn) => {
        const bannerDebug: DebugElement = fixture.debugElement,
          paragraphDebug = bannerDebug.queryAll(By.css('th')),
          th = paragraphDebug[9].nativeElement;

        expect(th.textContent).toEqual('express');
        done();
      });

      it('should have <th> tag with "@angular/common" value', (done: DoneFn) => {
        const  bannerDebug: DebugElement = fixture.debugElement,
          paragraphDebug = bannerDebug.queryAll(By.css('th')),
          th = paragraphDebug[10].nativeElement;

        expect(th.textContent).toEqual('@angular/common');
        done();
      });
    });
  });

  describe('<tboby>', () => {
    it('should have 2 <tr> tags', async (done: DoneFn) => {
      component = fixture.componentInstance;
      const getRepositoriesService = TestBed.get(GetRepositoriesService);

      httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/recommend-versions`)
        .flush(dummyObject.dummyVersions);
      httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/names`)
        .flush(dummyObject.dummyTemplate.map(repository => repository.repoName ));
      for(let repo of dummyObject.dummyTemplate) {
        httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
          .flush(repo);
      }

      fixture.detectChanges();

      const bannerDebug: DebugElement = fixture.debugElement,
        paragraphDebug = bannerDebug.queryAll(By.css('tbody tr'));

      expect(paragraphDebug.length).toBe(2);
      done();
    });

    it('should have 22 <td> tags', async (done: DoneFn) => {
      component = fixture.componentInstance;
      const getRepositoriesService = TestBed.get(GetRepositoriesService);

      httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/recommend-versions`)
        .flush(dummyObject.dummyVersions);
      httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/names`)
        .flush(dummyObject.dummyTemplate.map(repository => repository.repoName ));
      for(let repo of dummyObject.dummyTemplate) {
        httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
          .flush(repo);
      }

      fixture.detectChanges();

      const bannerDebug: DebugElement = fixture.debugElement,
        paragraphDebug = bannerDebug.queryAll(By.css('tbody tr td'));

      expect(paragraphDebug.length).toBe(22);
      done();
    });

    it('should have <td> "Repository name" tag with "Test/name" value', async (done: DoneFn) => {
      component = fixture.componentInstance;
      const getRepositoriesService = TestBed.get(GetRepositoriesService);

      httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/recommend-versions`)
        .flush(dummyObject.dummyVersions);
      httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/names`)
        .flush(dummyObject.dummyTemplate.map(repository => repository.repoName ));
      for(let repo of dummyObject.dummyTemplate) {
        httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
          .flush(repo);
      }

      fixture.detectChanges();

      const bannerDebug: DebugElement = fixture.debugElement,
        paragraphDebug = bannerDebug.queryAll(By.css('tbody tr td')),
        td = paragraphDebug[11].nativeElement;

      expect(td.textContent).toEqual('Test/name');
      done();
    });

    it('should have <td> "Type of privacy" tag with "Public" value', async (done: DoneFn) => {
      component = fixture.componentInstance;
      const getRepositoriesService = TestBed.get(GetRepositoriesService);

      httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/recommend-versions`)
        .flush(dummyObject.dummyVersions);
      httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/names`)
        .flush(dummyObject.dummyTemplate.map(repository => repository.repoName ));
      for(let repo of dummyObject.dummyTemplate) {
        httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
          .flush(repo);
      }

      fixture.detectChanges();

      const bannerDebug: DebugElement = fixture.debugElement,
        paragraphDebug = bannerDebug.queryAll(By.css('tbody tr td')),
        td = paragraphDebug[12].nativeElement;

      expect(td.className).toEqual('text bg-primary text-white h5');
      expect(td.textContent).toEqual('Public');
      done();
    });

    it('should have <td> "Branches" tag with "master --> development" value', async (done: DoneFn) => {
      component = fixture.componentInstance;
      const getRepositoriesService = TestBed.get(GetRepositoriesService);

      httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/recommend-versions`)
        .flush(dummyObject.dummyVersions);
      httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/names`)
        .flush(dummyObject.dummyTemplate.map(repository => repository.repoName ));
      for(let repo of dummyObject.dummyTemplate) {
        httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
          .flush(repo);
      }

      fixture.detectChanges();

      const bannerDebug: DebugElement = fixture.debugElement,
        paragraphDebug = bannerDebug.queryAll(By.css('tbody tr td')),
        td = paragraphDebug[13].nativeElement;

      expect(td.className).toEqual('text');
      expect(td.textContent).toEqual('master --> development');
      done();
    });

    it('should have <td> "name*" tag with "test" value', async (done: DoneFn) => {
      component = fixture.componentInstance;
      const getRepositoriesService = TestBed.get(GetRepositoriesService);

      httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/recommend-versions`)
        .flush(dummyObject.dummyVersions);
      httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/names`)
        .flush(dummyObject.dummyTemplate.map(repository => repository.repoName ));
      for(let repo of dummyObject.dummyTemplate) {
        httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
          .flush(repo);
      }

      fixture.detectChanges();

      const bannerDebug: DebugElement = fixture.debugElement,
        paragraphDebug = bannerDebug.queryAll(By.css('tbody tr td')),
        td = paragraphDebug[14].nativeElement;

      expect(td.className).toEqual('text');
      expect(td.textContent).toEqual('test');
      done();
    });

    it('should have <td> "version*" tag with "0.0.1" value', async (done: DoneFn) => {
      component = fixture.componentInstance;
      const getRepositoriesService = TestBed.get(GetRepositoriesService);

      httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/recommend-versions`)
        .flush(dummyObject.dummyVersions);
      httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/names`)
        .flush(dummyObject.dummyTemplate.map(repository => repository.repoName ));
      for(let repo of dummyObject.dummyTemplate) {
        httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
          .flush(repo);
      }

      fixture.detectChanges();

      const bannerDebug: DebugElement = fixture.debugElement,
        paragraphDebug = bannerDebug.queryAll(By.css('tbody tr td')),
        td = paragraphDebug[15].nativeElement;

      expect(td.className).toEqual('text');
      expect(td.textContent).toEqual(' 0.0.1 ');
      done();
    });

    it('should have <td> "description*" tag with "test description --> (none)" value', async (done: DoneFn) => {
      component = fixture.componentInstance;
      const getRepositoriesService = TestBed.get(GetRepositoriesService);

      httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/recommend-versions`)
        .flush(dummyObject.dummyVersions);
      httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/names`)
        .flush(dummyObject.dummyTemplate.map(repository => repository.repoName ));
      for(let repo of dummyObject.dummyTemplate) {
        httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
          .flush(repo);
      }

      fixture.detectChanges();

      const bannerDebug: DebugElement = fixture.debugElement,
        paragraphDebug = bannerDebug.queryAll(By.css('tbody tr td')),
        td = paragraphDebug[16].nativeElement;

      expect(td.className).toEqual('text');
      expect(td.textContent).toEqual(' Test description  -->  (none) ');
      done();
    });

    it('should have <td> "lodash" tag with "4.16.9" value', async (done: DoneFn) => {
      component = fixture.componentInstance;
      const getRepositoriesService = TestBed.get(GetRepositoriesService);

      httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/recommend-versions`)
        .flush(dummyObject.dummyVersions);
      httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/names`)
        .flush(dummyObject.dummyTemplate.map(repository => repository.repoName ));
      for(let repo of dummyObject.dummyTemplate) {
        httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
          .flush(repo);
      }

      fixture.detectChanges();

      const bannerDebug: DebugElement = fixture.debugElement,
        paragraphDebug = bannerDebug.queryAll(By.css('tbody tr td')),
        td = paragraphDebug[17].nativeElement;

      expect(td.textContent).toEqual(' 4.16.9 ');
      done();
    });

    it('should have <td> "tslint*" tag with "3.15.1" value', async (done: DoneFn) => {
      component = fixture.componentInstance;
      const getRepositoriesService = TestBed.get(GetRepositoriesService);

      httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/recommend-versions`)
        .flush(dummyObject.dummyVersions);
      httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/names`)
        .flush(dummyObject.dummyTemplate.map(repository => repository.repoName ));
      for(let repo of dummyObject.dummyTemplate) {
        httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
          .flush(repo);
      }

      fixture.detectChanges();

      const bannerDebug: DebugElement = fixture.debugElement,
        paragraphDebug = bannerDebug.queryAll(By.css('tbody tr td')),
        td = paragraphDebug[18].nativeElement;

      expect(td.className).toEqual('text');
      expect(td.textContent).toEqual(' 3.15.1 ');
      done();
    });

    it('should have <td> "typescript*" tag with "(none)" value', async (done: DoneFn) => {
      component = fixture.componentInstance;
      const getRepositoriesService = TestBed.get(GetRepositoriesService);

      httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/recommend-versions`)
        .flush(dummyObject.dummyVersions);
      httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/names`)
        .flush(dummyObject.dummyTemplate.map(repository => repository.repoName ));
      for(let repo of dummyObject.dummyTemplate) {
        httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
          .flush(repo);
      }

      fixture.detectChanges();

      const bannerDebug: DebugElement = fixture.debugElement,
        paragraphDebug = bannerDebug.queryAll(By.css('tbody tr td')),
        td = paragraphDebug[19].nativeElement;

      expect(td.className).toEqual('text bg-danger text-white h5');
      expect(td.textContent).toEqual('(none)');
      done();
    });

    it('should have <td> "express" tag with "(none)" value', async (done: DoneFn) => {
      component = fixture.componentInstance;
      const getRepositoriesService = TestBed.get(GetRepositoriesService);

      httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/recommend-versions`)
        .flush(dummyObject.dummyVersions);
      httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/names`)
        .flush(dummyObject.dummyTemplate.map(repository => repository.repoName ));
      for(let repo of dummyObject.dummyTemplate) {
        httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
          .flush(repo);
      }

      fixture.detectChanges();

      const bannerDebug: DebugElement = fixture.debugElement,
        paragraphDebug = bannerDebug.queryAll(By.css('tbody tr td')),
        td = paragraphDebug[20].nativeElement;

      expect(td.textContent).toEqual('(none)');
      done();
    });

    it('should have <td> "@angular/common" tag with "^2.4.4 --> 6.3.0" value', async (done: DoneFn) => {
      component = fixture.componentInstance;
      const getRepositoriesService = TestBed.get(GetRepositoriesService);

      httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/recommend-versions`)
        .flush(dummyObject.dummyVersions);
      httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/names`)
        .flush(dummyObject.dummyTemplate.map(repository => repository.repoName ));
      for(let repo of dummyObject.dummyTemplate) {
        httpMock.expectOne(`${getRepositoriesService.API_URL}/repositories/repository?repositoryName=${repo.repoName}`)
          .flush(repo);
      }

      fixture.detectChanges();

      const bannerDebug: DebugElement = fixture.debugElement,
        paragraphDebug = bannerDebug.queryAll(By.css('tbody tr td')),
        td = paragraphDebug[21].nativeElement;

      expect(td.textContent).toEqual(' ^2.4.4  -->  6.3.0 ');
      done();
    });
  });


  describe('filtration()', () => {
    it('should call filterByPackages() function', (done: DoneFn) => {
      component = fixture.componentInstance;
      const dataService = TestBed.get(DataService),
        spy = spyOn(dataService, 'filterByPackages');

      component.filtration('TestName', 'name');
      component.keyUp.subscribe(res => {
        expect(spy).toHaveBeenCalled();
      });
      done();
    });
  });

  describe('filterByPrivacy()', () => {
    it('should call filterByPrivacyAndBranches() function to filter by repository privacy', (done: DoneFn) => {
      component = fixture.componentInstance;
      const dataService = TestBed.get(DataService),
        spy = spyOn(dataService, 'filterByPrivacyAndBranches');

      component.filterByPrivacy('Private');
      expect(spy).toHaveBeenCalled();
      done();
    });
  });

  describe('filterBranches()', () => {
    it('should call filterByPrivacyAndBranches() function to filter by branches', (done: DoneFn) => {
      component = fixture.componentInstance;
      const dataService = TestBed.get(DataService),
        spy = spyOn(dataService, 'filterByPrivacyAndBranches');

      component.filterBranches('master');
      expect(spy).toHaveBeenCalled();
      done();
    });
  });

  describe('isBranch()', () => {
    it('should return false is master and development exists at object', (done: DoneFn) => {
      component = fixture.componentInstance;

      const result = component.isBranch(dummyObject.dataObject.branches);
      expect(result).toBeFalsy();
      done();
    });

    it('should return true is master or development is not exists at object', (done: DoneFn) => {
      component = fixture.componentInstance;

      const result = component.isBranch(dummyObject.dataMissingObject.branches);
      expect(result).toBeTruthy();
      done();
    });
  });

  describe('getStyleClassForVersion()', () => {
    it('should return true if version is less then recommend', (done: DoneFn) => {
      component = fixture.componentInstance;

      const result = component.getStyleClassForVersion(dummyObject.dataMissingObject.branches.development, 'tslint');
      expect(result).toBeTruthy();
      done();
    });
  });

  describe('getStyleClassForText()', () => {
    it('should return false if text is exist', (done: DoneFn) => {
      component = fixture.componentInstance;

      const result = component.getStyleClassForText(dummyObject.dataMissingObject.branches.master, 'name');
      expect(result).toBeFalsy();
      done();
    });

    it('should return true if text is not exist', () => {
      component = fixture.componentInstance;

      const result = component.getStyleClassForText(dummyObject.dataMissingObject.branches.master, 'description');
      expect(result).toBeTruthy();
    });
  });

  describe('getBranch()', () => {
    it('should return branch name', (done: DoneFn) => {
      component = fixture.componentInstance;

      const result = component.getBranch(dummyObject.dataMissingObject.branches, 'master');
      expect(result).toBe('master');
      done();
    });

    it('should return null if branch is not exists at object', (done: DoneFn) => {
      component = fixture.componentInstance;

      const result = component.getBranch(dummyObject.dataMissingObject.branches, 'development');
      expect(result).toBeNull();
      done();
    });
  });

  describe('isNone()', () => {
    it('should return true if master and development are not have specific field', (done: DoneFn) => {
      component = fixture.componentInstance;

      const result = component.isNone(dummyObject.dataObject.branches, 'tslint');
      expect(result).toBeTruthy();
      done();
    });

    it('should return false if master and development are have specific field', (done: DoneFn) => {
      component = fixture.componentInstance;

      const result = component.isNone(dummyObject.dataObject.branches, 'express');
      expect(result).toBeFalsy();
      done();
    });
  });

  describe('isNoneOrSame()', () => {
    it('should return true if master and development are have the same value of specific fields', (done: DoneFn) => {
      component = fixture.componentInstance;

      const result = component.isNoneOrSame(dummyObject.dataObject.branches, 'lodash');
      expect(result).toBeTruthy();
      done();
    });

    it('should return false if master and development are not have the same value of specific fields', (done: DoneFn) => {
      component = fixture.componentInstance;

      const result = component.isNoneOrSame(dummyObject.dataObject.branches, 'express');
      expect(result).toBeFalsy();
      done();
    });
  });

  describe('getPackageValue()', () => {
    it('should return (none) if there is not the required field', (done: DoneFn) => {
      component = fixture.componentInstance;

      const result = component.getPackageValue(dummyObject.dataObject.branches.master, 'typescript');
      expect(result).toBe('(none)');
      done();
    });

    it('should return package value if there is the required field', (done: DoneFn) => {
      component = fixture.componentInstance;

      const result = component.getPackageValue(dummyObject.dataObject.branches.development, 'lodash');
      expect(result).toBe('4.17.4');
      done();
    });
  });

  describe('lastUpdateTime()', () => {
    it('should get current time and time of last update of data and return result at hours', (done: DoneFn) => {
      component = fixture.componentInstance;

      const result = component.lastUpdate(Date.now() - 7200000);
      expect(result).toEqual('2 hrs');
      done();
    });
  });

  describe('setVersion()', () => {
    it('should return true if specific version is less then config version', (done: DoneFn) => {
      component = fixture.componentInstance;

      const result = component.setVersion('1.0.0', '1.1.0');
      expect(result).toBeTruthy();
      done();
    });

    it('should return false if specific version is more or equal the config version', (done: DoneFn) => {
      component = fixture.componentInstance;

      const result = component.setVersion('1.1.0', '1.0.0');
      const resultOfEqual = component.setVersion('1.0.0', '1.0.0');

      expect(resultOfEqual).toBeFalsy();
      expect(result).toBeFalsy();
      done();
    });
  });
});
