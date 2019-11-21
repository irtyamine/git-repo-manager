import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotificationService } from '../notifications/notification.service';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { AuthService } from '../../app/modules/user-authorization/services/auth.service';
import { AuthReducer } from '../store/reducers/auth.reducer';
import { WarningsReducer } from '../store/reducers/warnings.reducer';
import { LocalStorageService } from '../services/local-storage.service';
import { MockLocalStorage } from '../mock/mock-local-storage';
import { By } from '@angular/platform-browser';

describe('Component: HeaderComponent', () => {
  let component: HeaderComponent;
  let componentFixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService;
  let lsService: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot({
          'auth': AuthReducer,
          'warnings': WarningsReducer
        }),
      ],
      providers: [
        AuthService,
        LocalStorageService,
        NotificationService
      ]
    })
      .compileComponents();

    function logout() {
      return 'logout';
    }

    componentFixture = TestBed.createComponent(HeaderComponent);
    component = componentFixture.componentInstance;
    componentFixture.detectChanges();

    component.userData = { role: 'member', login: 'testUser' };
    component.lastUpdate = '2 hrs';
    componentFixture.detectChanges();

    authService = TestBed.get(AuthService);
    lsService = TestBed.get(LocalStorageService);

    spyOn(lsService, 'getItem')
      .and.callFake(MockLocalStorage.getItem);

    spyOn(lsService, 'setItem')
      .and.callFake(MockLocalStorage.setItem);

    spyOn(lsService, 'removeItem')
      .and.callFake(MockLocalStorage.removeItem);

    spyOn(lsService, 'clear')
      .and.callFake(MockLocalStorage.clear);


    spyOn(authService, 'logout')
      .and.callFake(logout);

    lsService.clear();
  });

  it('should be created', () => {
    expect(component).toBeDefined();
  });

  describe('Function: setDataSource(dataSource: string)', () => {
    it('should return \'GitHub\'', () => {
      component.dataSource = 'github';
      componentFixture.detectChanges();
      const result = component.setDataSource(component.dataSource);

      expect(result).toBe('GitHub');
    });

    it('should return \'GitLab\'', () => {
      component.dataSource = 'gitlab';
      componentFixture.detectChanges();

      const result = component.setDataSource(component.dataSource);

      expect(result).toBe('GitLab');
    });
  });

  describe('Function: logout()', () => {
    it('should call AuthService\'s logout() function', () => {
      component.logout();

      expect(authService.logout).toHaveBeenCalled();
    });
  });

  describe('HTML: header.component.html', () => {
  //   it('should call AuthService\'s \'logout()\' function', () => {
  //     lsService.setItem('org', 'testOrg');
  //     lsService.setItem('source', 'github');
  //
  //     const spy = spyOn(authService, 'logout').and.callThrough();
  //     component.signOut();
  //
  //     expect(spy).toHaveBeenCalled();
  //   });

    it('should return last update time 2hrs ago', () => {
      component.lastUpdate = '2 hrs';
      componentFixture.detectChanges();
      const res = componentFixture.debugElement.queryAll(By.css('.header__last-update'));

      expect(res[0].nativeElement.innerText).toBe('Last Update: 2 hrs ago');
    });

    it('should return \'GitHub\' vcs', () => {
      component.dataSource = 'github';
      componentFixture.detectChanges();
      const res = componentFixture.debugElement.queryAll(By.css('.header__text'));

      expect(res[0].nativeElement.innerText).toBe('VCS: GitHub');
    });

    it('should return member testUser', () => {
      const res = componentFixture.debugElement.queryAll(By.css('.header__text'));

      expect(res[1].nativeElement.innerText).toBe('member: testUser');
    });

    it('should have controls \'Dependencies management\' and \'Versions management\'', () => {
      const res = componentFixture.debugElement.queryAll(By.css('.controls__text'));

      expect(res[0].nativeElement.innerText).toBe('Dependencies management');
      expect(res[1].nativeElement.innerText).toBe('Versions management');
    });

    it('should have logout button', () => {
      const res = componentFixture.debugElement.queryAll(By.css('.btn-logout'));

      expect(res[0].name).toBe('button');
      expect(res[0].nativeElement.innerText).toBe('Logout');
    });
  });
});
