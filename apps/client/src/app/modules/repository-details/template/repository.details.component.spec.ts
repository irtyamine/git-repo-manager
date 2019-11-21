import { TestBed, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { RepositoryDetailsComponent } from './repository-details.component';
import { StoreService } from '../../../../shared/services/store.service';
import { StoreModule } from '@ngrx/store';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ShieldsService } from '../../../../shared/services/shields.service';
import { NotificationService } from '../../../../shared/notifications/notification.service';
import { DataService } from '../../../../shared/services/data.service';
import { RepositoryDetailsService } from '../services/repository-details.service';
import { DependenciesService } from '../services/dependencies.service';
import { RepositoryBranchesService } from '../services/repository-branches.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthReducer } from '../../../../shared/store/reducers/auth.reducer';
import { WarningsReducer } from '../../../../shared/store/reducers/warnings.reducer';
import { TimestampPipe } from '../../../../shared/pipes/timestamp.pipe';
import { HeaderModule } from '../../../../shared/header/header.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalService, TypeaheadModule } from 'ngx-bootstrap';
import { AuthService } from '../../user-authorization/services/auth.service';
import { MockLocalStorage } from '../../../../shared/mock/mock-local-storage';
import { ListOfCustomBranches } from '../../../../shared/mock/mock-data';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { ModalBackdropComponent } from 'ngx-bootstrap';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ModalContainerComponent } from 'ngx-bootstrap/modal';

class MockRepositoryDetails extends RepositoryDetailsComponent {
  public getRepositoryDetails() {
    return super.getRepositoryDetails();
  }

  public getUserData() {
    return super.getUserData();
  }

  public setDefaultBranchesShields(branches: any) {
    return super.setDefaultBranchesShields(branches);
  }

  public getBranches(branches: any) {
    return super.getBranches(branches);
  }

  public setRepositoryDependencies(branches: any) {
    return super.setRepositoryDependencies(branches);
  }

  public checkForImportantDependencies(dependencies: any) {
    return super.checkForImportantDependencies(dependencies);
  }
}

describe('Component: RepositoryDetailsComponent', () => {
  let component: MockRepositoryDetails;
  let componentFixture: ComponentFixture<MockRepositoryDetails>;
  let storeService: StoreService;
  let lsService: LocalStorageService;
  let shieldsService: ShieldsService;
  let notificationService: NotificationService;
  let dataService: DataService;
  let repositoryDetailsService: RepositoryDetailsService;
  let dependenciesService: DependenciesService;
  let repositoryBranchesService: RepositoryBranchesService;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockRepositoryDetails,
        TimestampPipe,
        ModalBackdropComponent,
        ModalContainerComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        HeaderModule,
        TypeaheadModule.forRoot(),
        StoreModule.forRoot({
          'auth': AuthReducer,
          'warnings': WarningsReducer
        }),
      ],
      providers: [
        BsModalService,
        LocalStorageService,
        ShieldsService,
        StoreService,
        DependenciesService,
        RepositoryBranchesService,
        RepositoryDetailsService,
        NotificationService,
        AuthService,
        DataService,
        TimestampPipe
      ]
    }).overrideModule(
        BrowserDynamicTestingModule,
        {
          set: { entryComponents: [ ModalBackdropComponent, ModalContainerComponent ] }
        })
      .compileComponents();

    componentFixture = TestBed.createComponent(MockRepositoryDetails);
    component = componentFixture.componentInstance;
    lsService = TestBed.get(LocalStorageService);
    storeService = TestBed.get(StoreService);
    shieldsService = TestBed.get(ShieldsService);
    notificationService = TestBed.get(NotificationService);
    dataService = TestBed.get(DataService);
    repositoryBranchesService = TestBed.get(RepositoryBranchesService);
    repositoryDetailsService = TestBed.get(RepositoryDetailsService);
    dependenciesService = TestBed.get(DependenciesService);
    httpMock = TestBed.get(HttpTestingController);
    router = TestBed.get(Router);

    function fakeClick(nameId: string, bodyId: string, btnId: string) {
      document.getElementById(nameId);
      document.getElementById(bodyId);
      document.getElementById(btnId);
    }

    spyOn(lsService, 'getItem')
      .and.callFake(MockLocalStorage.getItem);

    spyOn(lsService, 'setItem')
      .and.callFake(MockLocalStorage.setItem);

    spyOn(lsService, 'removeItem')
      .and.callFake(MockLocalStorage.removeItem);

    spyOn(lsService, 'clear')
      .and.callFake(MockLocalStorage.clear);

    spyOn(component, 'click')
      .and.callFake(fakeClick);

    lsService.clear();
  });

  it('should be created', () => {
    expect(component).toBeDefined();
  });

  describe('Function: ngOnInit()', () => {
    it('should define \'customBranchesForm\' form', () => {
      component.ngOnInit();
      expect(component.customBranchesForm).toBeDefined();
    });

    it('should call getRepositoryDetails() function', () => {
      const spy = spyOn(component, 'getRepositoryDetails').and.callThrough();
      component.ngOnInit();

      expect(spy).toHaveBeenCalled();
    });

    it('should call getUserData() function', () => {
      const spy = spyOn(component, 'getUserData').and.callThrough();
      component.ngOnInit();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Form: customBranchesForm', () => {
    it('should be invalid by default', () => {
      component.ngOnInit();
      expect(component.customBranchesForm.valid).toBeFalsy();
    });

    it('should be invalid if only one value set', () => {
      component.ngOnInit();
      component.customBranchesForm.setValue({ baseBranch: 'testBranch1', compareBranch: '' });
      expect(component.customBranchesForm.valid).toBeFalsy();
    });

    it('should be valid if both values set', () => {
      component.ngOnInit();
      component.customBranchesForm.setValue({ baseBranch: 'testBranch1', compareBranch: 'testBranch2' });
      expect(component.customBranchesForm.valid).toBeTruthy();
    });
  });

  describe('Function: openCompareCustomBranchesModal()', () => {
    it('should set disableButtonCondition as true', () => {
      const componentWrapper = componentFixture.debugElement.componentInstance;
      const app = componentWrapper.appComponentRef;
      component.openCompareCustomBranchesModal(app);

      componentFixture.detectChanges();

      expect(component.disableButtonCondition).toBeTruthy();
    });

    it('should set btnText as \'Loading...\'', () => {
      const componentWrapper = componentFixture.debugElement.componentInstance;
      const app = componentWrapper.appComponentRef;
      component.openCompareCustomBranchesModal(app);

      componentFixture.detectChanges();

      expect(component.btnText).toBe('Loading...');
    });

    it('should call RepositoryBranchesService\'s getAllBranches() function', () => {
      const spy = spyOn(repositoryBranchesService, 'getAllBranches').and.callThrough();

      const componentWrapper = componentFixture.debugElement.componentInstance;
      const app = componentWrapper.appComponentRef;
      component.openCompareCustomBranchesModal(app);

      componentFixture.detectChanges();

      expect(spy).toHaveBeenCalled();
    });


    it('should set data to repositoryBranches', () => {
      component.repositoryDetails.next({ repoName: 'testRepo' });

      lsService.setItem('org', 'testOrg');
      lsService.setItem('source', 'github');

      const dummyData = [ 'testBranch', 'testBranch_1' ];

      const componentWrapper = componentFixture.debugElement.componentInstance;
      const app = componentWrapper.appComponentRef;

      component.openCompareCustomBranchesModal(app);
      componentFixture.detectChanges();

      const req = httpMock.expectOne(`${environment.url}/api/github/repositories/branches?repoName=testRepo`);

      req.flush(dummyData);
      componentFixture.detectChanges();

      expect(component.repositoryBranches).toBe(dummyData);
    });

    it('should set disableButtonCondition to false after complete get branches data', () => {
      component.repositoryDetails.next({ repoName: 'testRepo' });

      lsService.setItem('org', 'testOrg');
      lsService.setItem('source', 'github');

      const dummyData = [ 'testBranch', 'testBranch_1' ];

      const componentWrapper = componentFixture.debugElement.componentInstance;
      const app = componentWrapper.appComponentRef;

      component.openCompareCustomBranchesModal(app);
      componentFixture.detectChanges();

      const req = httpMock.expectOne(`${environment.url}/api/github/repositories/branches?repoName=testRepo`);

      req.flush(dummyData);
      componentFixture.detectChanges();

      expect(component.disableButtonCondition).toBeFalsy();
    });

    it('should set btnText to \'Compare custom branches\' after complete get branches data', () => {
      component.repositoryDetails.next({ repoName: 'testRepo' });

      lsService.setItem('org', 'testOrg');
      lsService.setItem('source', 'github');

      const dummyData = [ 'testBranch', 'testBranch_1' ];

      const componentWrapper = componentFixture.debugElement.componentInstance;
      const app = componentWrapper.appComponentRef;

      component.openCompareCustomBranchesModal(app);
      componentFixture.detectChanges();

      const req = httpMock.expectOne(`${environment.url}/api/github/repositories/branches?repoName=testRepo`);

      req.flush(dummyData);
      componentFixture.detectChanges();

      expect(component.btnText).toBe('Compare custom branches');
    });
  });

  describe('Function: getRepositoryDetails()', () => {
    it('should call RepositoryDetailsService\'s getRepositoryDetails() function', () => {
      const spy = spyOn(repositoryDetailsService, 'getRepositoryDetails').and.callThrough();

      component.getRepositoryDetails();
      expect(spy).toHaveBeenCalled();
    });

    it('should set data to repositoryDetails subject', () => {
      const dummyBranches = {
        branches: {
          baseBranch: {
            branchName: 'baseTest'
          },
          compareBranch: {
            branchName: 'compareTest'
          }
        }
      };

      lsService.setItem('repository', 'testRepo');
      lsService.setItem('org', 'testOrg');
      lsService.setItem('source', 'github');

      component.getRepositoryDetails();

      const req = httpMock.expectOne(`${environment.url}/api/github/repositories/repository-details?repoName=testRepo&organization=testOrg`);
      expect(req.request.method).toBe('GET');

      req.flush(dummyBranches);
      componentFixture.detectChanges();

      component.repositoryDetails
        .subscribe((res: any) => {
          expect(res).toBe(dummyBranches);
        });
    });

    it('should call component\'s setDefaultBranchesShields() function', () => {
      const dummyBranches = {
        branches: {
          baseBranch: {
            branchName: 'baseTest'
          },
          compareBranch: {
            branchName: 'compareTest'
          }
        }
      };

      lsService.setItem('repository', 'testRepo');
      lsService.setItem('org', 'testOrg');
      lsService.setItem('source', 'github');
      const spy = spyOn(component, 'setDefaultBranchesShields').and.callThrough();

      component.getRepositoryDetails();

      const req = httpMock.expectOne(`${environment.url}/api/github/repositories/repository-details?repoName=testRepo&organization=testOrg`);
      expect(req.request.method).toBe('GET');

      req.flush(dummyBranches);
      componentFixture.detectChanges();

      expect(spy).toHaveBeenCalled();
    });

    it('should call component\'s getBranches() function', () => {
      const dummyBranches = {
        branches: {
          baseBranch: {
            branchName: 'baseTest'
          },
          compareBranch: {
            branchName: 'compareTest'
          }
        }
      };

      lsService.setItem('repository', 'testRepo');
      lsService.setItem('org', 'testOrg');
      lsService.setItem('source', 'github');
      const spy = spyOn(component, 'getBranches').and.callThrough();

      component.getRepositoryDetails();

      const req = httpMock.expectOne(`${environment.url}/api/github/repositories/repository-details?repoName=testRepo&organization=testOrg`);
      expect(req.request.method).toBe('GET');

      req.flush(dummyBranches);
      componentFixture.detectChanges();

      expect(spy).toHaveBeenCalled();
    });

    it('should call component\'s setRepositoryDependencies() function', () => {
      const dummyBranches = {
        branches: {
          baseBranch: {
            branchName: 'baseTest'
          },
          compareBranch: {
            branchName: 'compareTest'
          }
        }
      };

      lsService.setItem('repository', 'testRepo');
      lsService.setItem('org', 'testOrg');
      lsService.setItem('source', 'github');
      const spy = spyOn(component, 'setRepositoryDependencies').and.callThrough();

      component.getRepositoryDetails();

      const req = httpMock.expectOne(`${environment.url}/api/github/repositories/repository-details?repoName=testRepo&organization=testOrg`);
      expect(req.request.method).toBe('GET');

      req.flush(dummyBranches);
      componentFixture.detectChanges();

      expect(spy).toHaveBeenCalled();
    });

    it('should call component\'s checkForImportantDependencies() function', () => {
      const dummyBranches = {
        branches: {
          baseBranch: {
            branchName: 'baseTest'
          },
          compareBranch: {
            branchName: 'compareTest'
          }
        }
      };

      lsService.setItem('repository', 'testRepo');
      lsService.setItem('org', 'testOrg');
      lsService.setItem('source', 'github');
      const spy = spyOn(component, 'checkForImportantDependencies').and.callThrough();

      component.getRepositoryDetails();

      const req = httpMock.expectOne(`${environment.url}/api/github/repositories/repository-details?repoName=testRepo&organization=testOrg`);
      expect(req.request.method).toBe('GET');

      req.flush(dummyBranches);
      componentFixture.detectChanges();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Function: getUserData()', () => {
    it('should call RepositoryDetailsService\'s getUserData() function', () => {
      const userData = { login: 'TestUser', role: 'member' };

      lsService.setItem('org', 'testOrg');
      lsService.setItem('source', 'github');

      const spy = spyOn(repositoryDetailsService, 'getUserData').and.callThrough();
      component.getUserData();


      const req = httpMock.expectOne(`${environment.url}/api/github/user`);

      req.flush(userData);
      componentFixture.detectChanges();

      expect(spy).toHaveBeenCalled();
    });

    it('should set user data', () => {
      const userData = { login: 'TestUser', role: 'member' };

      lsService.setItem('org', 'testOrg');
      lsService.setItem('source', 'github');

      component.getUserData();


      const req = httpMock.expectOne(`${environment.url}/api/github/user`);

      req.flush(userData);
      componentFixture.detectChanges();

      expect(component.usrData).toBe(userData);
    });

    it('should call RepositoryBranchesService\'s getCustomBranches', () => {
      component.repositoryDetails.next({ repoName: 'testRepo' });

      lsService.setItem('org', 'testOrg');
      lsService.setItem('source', 'github');

      const userData = { login: 'TestUser', role: 'member' };

      const spy = spyOn(repositoryBranchesService, 'getCustomBranches').and.callThrough();
      component.getUserData();

      const req = httpMock.expectOne(`${environment.url}/api/github/user`);

      req.flush(userData);
      componentFixture.detectChanges();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Function: getDependenciesFromBranch()', () => {
    it('should return array with deleted first element', () => {
      const testArr = { testItem: 'data', testItem1: 'data' };

      const result = component.getDependenciesFromBranch(testArr);
      componentFixture.detectChanges();

      expect(result.length).toBe(1);
      expect(result[0]).toBe('testItem1');
    });
  });

  describe('Function: setDefaultBranchesShields()', () => {
    it('should call RepositoryDetailsService\'s getDefaultBranchesData()', () => {
      const branchData = {
        baseBranch: { branchName: 'name1' },
        compareBranch: { branchName: 'name2' }
      };
      const spy = spyOn(repositoryDetailsService, 'getDefaultBranchesData').and.callThrough();

      component.setDefaultBranchesShields(branchData);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Function: getBranches()', () => {
    it('should return an array of branches', () => {
      const branches = {
        baseBranch: { branchName: 'name1' },
        compareBranch: { branchName: 'name2' }
      };

      const result = component.getBranches(branches);

      expect(result).toEqual(['baseBranch', 'compareBranch']);
    });
  });

  describe('Function: setRepositoryDependencies()', () => {
    it('', () => {
      const branchData = {
        baseBranch: { branchName: 'name1', name: 1 },
        compareBranch: { branchName: 'name2', test: 2 }
      };

      const result = component.setRepositoryDependencies(branchData);

      expect(result.length).toBe(2);
    });
  });

  describe('Function: setVersionStatus()', () => {
    it('should call DependenciesService\'s compareVersions() function', () => {
      const branchData = {
        baseBranch: { branchName: 'name1' },
        compareBranch: { branchName: 'name2' }
      };

      const spy = spyOn(dependenciesService, 'compareVersions').and.callThrough();
      component.setVersionStatus('testDependency', branchData);

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Function: setShieldForDependency()', () => {
    it('should call ShieldsService\'s setShieldsForDependencies() function', () => {
      const spy = spyOn(shieldsService, 'setShieldsForDependencies').and.callThrough();

      component.setShieldForDependency('testDependency');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Function: setRepoDependenciesShields()', () => {
    it('should call ShieldsService\'s setRepositoryDependencies() function', () => {
      const dependencies = ['name1', 'name2'];
      const spy = spyOn(shieldsService, 'setRepositoryDependencies').and.callThrough();

      component.setRepoDependenciesShields(dependencies);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Function: showWarnings()', () => {
    it('\'showWarningsCondition\' should be true by default', () => {
      expect(component.showWarningsCondition).toBeTruthy();
    });

    it('should set \'showWarningsCondition\' to false', () => {
      component.showWarnings();

      expect(component.showWarningsCondition).toBeFalsy();
    });
  });

  describe('Function: click()', () => {
    it('should call document.getElementById 3 times', () => {
      spyOn(document, 'getElementById').and.callThrough();
      component.click('name1', 'body1', 'btn1');

      expect(document.getElementById).toHaveBeenCalledTimes(3);
    });
  });

  describe('Function: back()', () => {
    it('should navigate to \'/repositories\' path', () => {
      spyOn(router, 'navigateByUrl').and.stub();
      component.back();
      expect(router.navigateByUrl).toHaveBeenCalledWith('repositories');
    });
  });

  describe('Function: checkNewBranches()', () => {
    it('should return true if there aren\'t any multiples', () => {
      component.ngOnInit();

      component.customBranchesForm.setValue({ baseBranch: 'testBranch1', compareBranch: 'testBranch2' });
      component.customBranches.next(ListOfCustomBranches);

      const result = component.checkNewBranches();
      expect(result).toBeTruthy();
    });

    it('should return false if are there multiple branches(#1)', () => {
      component.ngOnInit();

      component.customBranchesForm.setValue({ baseBranch: 'testSix', compareBranch: 'testFive' });
      component.customBranches.next(ListOfCustomBranches);

      const result = component.checkNewBranches();
      expect(result).toBeFalsy();
    });

    it('should return false if are there multiple branches(#2)', () => {
      component.ngOnInit();

      component.customBranchesForm.setValue({ baseBranch: 'testFive', compareBranch: 'testSix' });
      component.customBranches.next(ListOfCustomBranches);

      const result = component.checkNewBranches();
      expect(result).toBeFalsy();
    });

    it('should return false if new base branch is same as compare branch', () => {
      component.ngOnInit();

      component.customBranchesForm.setValue({ baseBranch: 'testSeven', compareBranch: 'testSeven' });
      component.customBranches.next(ListOfCustomBranches);

      const result = component.checkNewBranches();
      expect(result).toBeFalsy();
    });

    it('should return false if new custom branches are default branches(#1)', () => {
      component.ngOnInit();

      component.customBranchesForm.setValue({ baseBranch: 'master', compareBranch: 'development' });
      component.customBranches.next(ListOfCustomBranches);

      const result = component.checkNewBranches();
      expect(result).toBeFalsy();
    });

    it('should return false if new custom branches are default branches(#1)', () => {
      component.ngOnInit();

      component.customBranchesForm.setValue({ baseBranch: 'development', compareBranch: 'master' });
      component.customBranches.next(ListOfCustomBranches);

      const result = component.checkNewBranches();
      expect(result).toBeFalsy();
    });
  });

  // describe('Function: addBranches()', () => {
  //   it('should set addBranchesText to \'Loading...\'', () => {
  //     lsService.setItem('org', 'testOrg');
  //     lsService.setItem('source', 'github');
  //     component.ngOnInit();
  //
  //     component.customBranchesForm.setValue({ baseBranch: 'testOne', compareBranch: 'testTwo' });
  //     component.repositoryDetails.next({ repoName: 'testRepo' });
  //     component.usrData = { login: 'testUser', role: 'member' };
  //
  //     component.addBranches();
  //     expect(component.addBranchesText).toBe('Loading...');
  //   });
  //
  //   it('should set disableAddBranchesButtonCondition to false during the request executing', () => {
  //     lsService.setItem('org', 'testOrg');
  //     lsService.setItem('source', 'github');
  //     component.ngOnInit();
  //
  //     const componentWrapper = componentFixture.debugElement.componentInstance;
  //     const app = componentWrapper.appComponentRef;
  //     component.openCompareCustomBranchesModal(app);
  //
  //     componentFixture.detectChanges();
  //
  //     component.customBranchesForm.setValue({ baseBranch: 'testOne', compareBranch: 'testTwo' });
  //     component.repositoryDetails.next({ repoName: 'testRepo' });
  //     component.usrData = { login: 'testUser', role: 'member' };
  //
  //     component.addBranches();
  //     expect(component.disableAddBranchesButtonCondition).toBeFalsy();
  //   });
  //
  //   it('should set addBranchesText to \'Add branches...\' after set new custom branches', () => {
  //     const dummyBranches = [{
  //       branches: {
  //         baseBranch: {
  //           branchName: 'test1'
  //         },
  //         compareBranch: {
  //           branchName: 'tes2'
  //         }
  //       }
  //     }];
  //
  //     lsService.setItem('org', 'testOrg');
  //     lsService.setItem('source', 'github');
  //     component.ngOnInit();
  //
  //     component.customBranchesForm.setValue({ baseBranch: 'testOne', compareBranch: 'testTwo' });
  //     component.repositoryDetails.next({ repoName: 'testRepo' });
  //     component.usrData = { login: 'testUser', role: 'member' };
  //
  //     component.addBranches();
  //
  //     const req = httpMock.expectOne(`${environment.url}/api/github/repositories/add-custom-branches`);
  //     req.flush(dummyBranches);
  //
  //     expect(component.addBranchesText).toBe('Add branches...');
  //   });
  //
  //   it('should set disableAddBranchesButtonCondition to true after request executing complete', () => {
  //     const dummyBranches = [{
  //       branches: {
  //         baseBranch: {
  //           branchName: 'test1'
  //         },
  //         compareBranch: {
  //           branchName: 'tes2'
  //         }
  //       }
  //     }];
  //
  //     lsService.setItem('org', 'testOrg');
  //     lsService.setItem('source', 'github');
  //
  //     component.ngOnInit();
  //
  //     component.customBranchesForm.setValue({ baseBranch: 'testOne', compareBranch: 'testTwo' });
  //     component.repositoryDetails.next({ repoName: 'testRepo' });
  //     component.usrData = { login: 'testUser', role: 'member' };
  //
  //     component.addBranches();
  //
  //     const req = httpMock.expectOne(`${environment.url}/api/github/repositories/add-custom-branches`);
  //     req.flush(dummyBranches);
  //
  //     expect(component.disableAddBranchesButtonCondition).toBeTruthy();
  //   });
  //
  //   it('should reset customBranchesForm after request executing complete', () => {
  //     const dummyBranches = [{
  //       branches: {
  //         baseBranch: {
  //           branchName: 'test1'
  //         },
  //         compareBranch: {
  //           branchName: 'tes2'
  //         }
  //       }
  //     }];
  //
  //     lsService.setItem('org', 'testOrg');
  //     lsService.setItem('source', 'github');
  //
  //     component.ngOnInit();
  //
  //     component.customBranchesForm.setValue({ baseBranch: 'testOne', compareBranch: 'testTwo' });
  //     component.repositoryDetails.next({ repoName: 'testRepo' });
  //     component.usrData = { login: 'testUser', role: 'member' };
  //     componentFixture.detectChanges();
  //
  //     component.addBranches();
  //
  //     const req = httpMock.expectOne(`${environment.url}/api/github/repositories/add-custom-branches`);
  //     req.flush(dummyBranches);
  //
  //     expect(component.customBranchesForm.valid).toBeFalsy();
  //   });
  // });

  describe('Function: getCustomBranches()', () => {
    it('should return an array of branches data', () => {
      const customBranch = { baseBranch: { branchName: 'test1' }, compareBranch: { branchName: 'test2' } };

      const result = component.getCustomBranches(customBranch);
      expect(result).toEqual([ 'baseBranch', 'compareBranch' ]);
    });
  });

  describe('Function: removeComparing()', () => {
    it('should call RepositoryDetailsService\'s removeBranches() function', () => {
      component.usrData = { login: 'testUser', role: 'member' };
      component.repositoryDetails.next({ repoName: 'testRepo' });

      const dummyBranches = {
        branches: {
          baseBranch: { branchName: 'testOne' },
          compareBranch: { branchName: 'testTwo' }
        }
      };

      const spy = spyOn(repositoryDetailsService, 'removeBranches').and.callThrough();
      component.removeComparing(dummyBranches);

      expect(spy).toHaveBeenCalled();
    });
  });
});
