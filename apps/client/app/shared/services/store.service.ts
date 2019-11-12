import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';

import { AuthState } from '../store/states/auth.state';
import { WarningsState } from '../store/states/warnings.state';

import AuthModel from '../models/auth.model';
import WarningModel from '../models/warnings.model';

import * as WarningsActions from '../store/actions/warnings.action';
import * as AuthActions from '../store/actions/auth.action';

@Injectable({ providedIn: 'root' })
export class StoreService {
  public AuthState$: Observable<AuthState>;
  public WarningsState$: Observable<WarningsState>;
  public AuthSubscription: Subscription;
  public WarningsSubscription: Subscription;
  public Auth: AuthModel;
  public Warnings: WarningModel[];

  constructor(
    private readonly lsService: LocalStorageService,
    private readonly store: Store<AuthState>
  ) {
    this.AuthState$ = this.store.pipe(select('auth'));
    this.WarningsState$ = this.store.pipe(select('warnings'));

    this.AuthSubscription = this.AuthState$
      .pipe(
        map(x => this.Auth = x.auth)
      )
      .subscribe();

    this.WarningsSubscription = this.WarningsState$
      .pipe(
        map(x => this.Warnings = x.warnings)
      )
      .subscribe();
  }

  private setAuthDataToStore() {
    const storeData: AuthModel = {
      organization: this.lsService.getItem('org'),
      dataSource: this.lsService.getItem('source') };

    this.store.dispatch({
      type: AuthActions.AuthActionsEnums.NEW_AUTH,
      payload: storeData
    });
  }

  public setWarnings(target: string, warning: string) {
    const newWarning: WarningModel = {
      aim: target,
      warning: warning
    };

    this.store.dispatch({
      type: WarningsActions.WarningsActionsEnum.ADD_WARNING,
      payload: newWarning
    });
  }

  public clearWarnings() {
    this.store.dispatch({
      type: WarningsActions.WarningsActionsEnum.CLEAR_WARNINGS
    });
  }

  public getAuthData() {
    this.setAuthDataToStore();
    return this.Auth;
  }

  public getWarnings() {
    return this.Warnings;
  }
}
