import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpResponse } from '@angular/common/http';

describe('Guard: AuthGuard', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ AuthService, AuthGuard ]
    });

    httpMock = TestBed.get(HttpTestingController);
  });

  describe('canActivate()', () => {
    it('should return false', (done: DoneFn) => {
      const authService = TestBed.get(AuthService),
        authGuard = new AuthGuard(authService);

      authGuard.canActivate().subscribe(result => {
        expect(result).toBe(false);
        done();
      });
      httpMock.expectOne(`${authService.API_URL}/repositories2/isAuthenticated`)
        .event(new HttpResponse<boolean>({ body: false }));
    });

    it('should return true', (done: DoneFn) => {
      const authService = TestBed.get(AuthService),
        authGuard = new AuthGuard(authService);

      authGuard.canActivate().subscribe(result => {
        expect(result).toBe(true);
        done();
      });
      httpMock.expectOne(`${authService.API_URL}/repositories2/isAuthenticated`)
        .event(new HttpResponse<boolean>({ body: true }));
    });
  });
});