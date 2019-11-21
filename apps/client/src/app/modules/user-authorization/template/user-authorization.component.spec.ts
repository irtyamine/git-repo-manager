import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAuthorizationComponent } from './user-authorization.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { AuthReducer } from '../../../../shared/store/reducers/auth.reducer';
import { WarningsReducer } from '../../../../shared/store/reducers/warnings.reducer';
import { NotificationService } from '../../../../shared/notifications/notification.service';

describe('Component: UserAuthorizationComponent', () => {
  let component: UserAuthorizationComponent;
  let componentFixture: ComponentFixture<UserAuthorizationComponent>;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAuthorizationComponent ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        StoreModule.forRoot({
          'auth': AuthReducer,
          'warnings': WarningsReducer
        })
      ],
      providers: [
        UserAuthorizationComponent,
        NotificationService,
        AuthService,
        LocalStorageService
      ]
    }).compileComponents();

    function authenticateUser(data) {
      return data;
    }

    componentFixture = TestBed.createComponent(UserAuthorizationComponent);
    component = componentFixture.componentInstance;
    authService = TestBed.get(AuthService);

    spyOn(authService, 'authenticateUser')
      .and.callFake(authenticateUser);
  });

  it('should be created', () => {
    expect(component).toBeDefined();
  });

  describe('Form', () => {
    it('should be defined', () => {
      component.ngOnInit();
      expect(component.loginForm).toBeDefined();
    });

    it('should be non-valid after page load', () => {
      component.ngOnInit();
      expect(component.loginForm.valid).toBeFalsy();
    });

    it('should be non-valid if incorrect values added', () => {
      component.ngOnInit();
      component.loginForm.setValue({ organization: 'testOrg', dataSource: '' });

      expect(component.loginForm.valid).toBeFalsy();
    });

    it('should be valid after set values', () => {
      component.ngOnInit();
      component.loginForm.setValue({ organization: 'testOrg', dataSource: 'github' });

      expect(component.loginForm.valid).toBeTruthy();
    });
  });

  describe('Function: setVCS()', () => {
    it('should return \'Choose organization and VCS\' if form not valid', () => {
      component.ngOnInit();
      component.loginForm.setValue({ organization: 'testOrg', dataSource: '' });

      component.setVCS();
      expect(component.loginText).toBe('Choose organization and VCS');
    });

    it('should return \'Log in via GitHub\' if form valid and \'github\' vcs selected', () => {
      component.ngOnInit();
      component.loginForm.setValue({ organization: 'testValue', dataSource: 'github' });

      component.setVCS();
      expect(component.loginText).toBe('Log in via GitHub');
    });
  });

  describe('Function: login()', () => {
    it('should return \'Loading...\' after call', () => {
      component.ngOnInit();
      component.loginForm.setValue({ organization: 'testOrg', dataSource: 'github' });

      component.login();
      expect(component.loginText).toBe('Loading...');
    });

    it('should call AuthService\'s authenticateUser() function', () => {
      component.ngOnInit();
      component.loginForm.setValue({ organization: 'testOrg', dataSource: 'github' });

      component.login();
      expect(authService.authenticateUser).toHaveBeenCalled();
    });
  });
});
