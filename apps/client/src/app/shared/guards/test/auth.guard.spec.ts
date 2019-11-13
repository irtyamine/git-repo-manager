import { TestBed } from '@angular/core/testing';
import { AuthGuard } from '../auth.guard';
import { AuthService } from '../../../modules/user-authorization/services/auth.service';
import { NotificationService } from '../../notifications/notification.service';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthReducer } from '../../store/reducers/auth.reducer';
import { WarningsReducer } from '../../store/reducers/warnings.reducer';
import { environment } from '../../../../environments/environment';
import { HttpResponse } from '@angular/common/http';

describe('Guard: AuthGuard', () => {
  let httpMock: HttpTestingController;
  let authGuard: AuthGuard;
  let authService: AuthService;
  let notificationsService: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        StoreModule.forRoot({
          'auth': AuthReducer,
          'warnings': WarningsReducer
        }),
      ],
      providers: [ AuthService, NotificationService ]
    });

    httpMock = TestBed.get(HttpTestingController);
    authGuard = TestBed.get(AuthGuard);
    authService = TestBed.get(AuthService);
    notificationsService = TestBed.get(NotificationService);
  });

  describe('canActivate()', () => {
    it('should return false if user is not authenticated', () => {
      const spy = spyOn(authService, 'check').and.callThrough();
      const notificationClearSpy = spyOn(notificationsService, 'clear').and.callThrough();
      const notificationErrorSpy = spyOn(notificationsService, 'error').and.callThrough();

      authGuard.canActivate()
        .subscribe(result => {
          expect(spy).toHaveBeenCalled();
          expect(notificationClearSpy).toHaveBeenCalled();
          expect(notificationErrorSpy).toHaveBeenCalled();
          expect(result).toBeFalsy();
        });

      httpMock.expectOne(`${environment.url}/api/github/isAuthenticated`)
        .event(new HttpResponse<boolean>({ body: false }));
    });

    it('should return true if user is authenticated', () => {
      const spy = spyOn(authService, 'check').and.callThrough();
      authGuard.canActivate()
        .subscribe(result => {
          expect(spy).toHaveBeenCalled();
          expect(result).toBeTruthy();
        });

      httpMock.expectOne(`${environment.url}/api/github/isAuthenticated`)
        .event(new HttpResponse<boolean>({ body: true }));
    });
  });

});

