import { Injectable } from '@angular/core';
import AuthModel from '../models/auth.model';
import * as AuthActions from '../store/actions/auth.action';
import { select, Store } from '@ngrx/store';
import { AuthState } from '../store/states/auth.state';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class StoreService {
  public AuthState$: Observable<AuthState>;
  public AuthSubscription: Subscription;
  public Auth: AuthModel;

  constructor(
    private readonly lsService: LocalStorageService,
    private readonly store: Store<AuthState>
  ) {
    this.AuthState$ = this.store.pipe(select('auth'));
    this.AuthSubscription = this.AuthState$.pipe(map(x => this.Auth = x.auth)).subscribe();
  }

  public setAuthDataToStore() {
    const storeData: AuthModel = {
      organization: this.lsService.getItem('org'),
      dataSource: this.lsService.getItem('source') };

    this.store.dispatch({
      type: AuthActions.AuthActionsEnums.NEW_AUTH,
      payload: storeData
    });
  }

  public getAuthData() {
    return this.Auth;
  }
}
