// import { Injectable } from '@angular/core';
// import { TestBed, ComponentFixture } from '@angular/core/testing';
// import { CompanyProjectsComponent } from './company-projects.component';
// import { HelpersService } from '../services/helpers.service';
// import { FiltrationService } from '../services/filtration.service';
// import { DataService } from '../../../../shared/services/data.service';
// import { AuthService } from '../../user-authorization/services/auth.service';
// import { NotificationService } from '../../../../shared/notifications/notification.service';
// import { StoreService } from '../../../../shared/services/store.service';
// import { LocalStorageService } from '../../../../shared/services/local-storage.service';
// import { TooltipModule } from 'ngx-bootstrap';
// import { StoreModule } from '@ngrx/store';
// import { RouterTestingModule } from '@angular/router/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { MockLocalStorage } from '../../../../shared/mock/mock-local-storage';
// import { MockRepositories } from '../../../../shared/mock/mock-data';
// import { MockTableHeader, MockRepositoriesData } from '../../../../shared/mock/mock-company-projects';
// import { AuthReducer } from '../../../../shared/store/reducers/auth.reducer';
// import { WarningsReducer } from '../../../../shared/store/reducers/warnings.reducer';
// import { TimestampPipe } from '../../../../shared/pipes/timestamp.pipe';
// import { HeaderModule } from '../../../../shared/header/header.module';
// import { FiltersChildComponent } from '../dynamic-components/filters/child-component/filters-child.component';
// import { FiltersParentComponent } from '../dynamic-components/filters/parent-component/filters-parent.component';
// import { BehaviorSubject, Subject } from 'rxjs';
//
// class MockCompanyProjectsComponent extends  CompanyProjectsComponent {
//   public defaultRepos = super.defaultRepos;
// }
//
// @Injectable({ providedIn: 'root' })
// class MockDataService extends DataService {
//   public availablePackages: BehaviorSubject<any>;
//   public companyRepositories: BehaviorSubject<any>;
//   // public customBranchesSubject: BehaviorSubject<any> = super.customBranchesSubject;
// }
//
// describe('Component: CompanyProjectsComponent', () => {
//   let component: MockCompanyProjectsComponent;
//   let fixture: ComponentFixture<MockCompanyProjectsComponent>;
//   let helpersService: HelpersService;
//   let filtrationService: FiltrationService;
//   let dataService: MockDataService;
//   let authService: AuthService;
//   let notificationService: NotificationService;
//   let storeService: StoreService;
//   let lsService: LocalStorageService;
//   let httpMock: HttpTestingController;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         MockCompanyProjectsComponent,
//         TimestampPipe,
//         FiltersChildComponent,
//         FiltersParentComponent
//       ],
//       imports: [
//         TooltipModule,
//         RouterTestingModule,
//         HttpClientTestingModule,
//         HeaderModule,
//         StoreModule.forRoot({
//           'auth': AuthReducer,
//           'warnings': WarningsReducer
//         }),
//       ],
//       providers: [
//         TimestampPipe,
//         HelpersService,
//         FiltrationService,
//         MockDataService,
//         AuthService,
//         NotificationService,
//         StoreService,
//         LocalStorageService
//       ]
//     })
//       .compileComponents();
//
//     fixture = TestBed.createComponent(MockCompanyProjectsComponent);
//     component = fixture.componentInstance;
//     helpersService = TestBed.get(HelpersService);
//     filtrationService = TestBed.get(FiltrationService);
//     dataService = TestBed.get(MockDataService);
//     authService = TestBed.get(AuthService);
//     notificationService = TestBed.get(AuthService);
//     storeService = TestBed.get(StoreService);
//     lsService = TestBed.get(LocalStorageService);
//     httpMock = TestBed.get(HttpTestingController);
//
//     spyOn(lsService, 'getItem')
//       .and.callFake(MockLocalStorage.getItem);
//
//     spyOn(lsService, 'setItem')
//       .and.callFake(MockLocalStorage.setItem);
//
//     spyOn(lsService, 'removeItem')
//       .and.callFake(MockLocalStorage.removeItem);
//
//     spyOn(lsService, 'clear')
//       .and.callFake(MockLocalStorage.clear);
//
//     lsService.clear();
//   });
//
//   it('should be defined', () => {
//     expect(component).toBeDefined();
//   });
//
//   describe('Function: ngOnInit()', () => {
//     it('should call StoreService\'s clearWarnings() function', () => {
//       const spy = spyOn(storeService, 'clearWarnings').and.callThrough();
//
//       component.ngOnInit();
//       expect(spy).toHaveBeenCalled();
//     });
//   });
// });
