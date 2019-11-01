import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalStorageService } from '../../../shared/services/local-storage.service';

@Component({
  selector: 'app-user-authorization',
  templateUrl: './user-authorization.html',
  styleUrls: ['./user-authorization.scss']
})

export class UserAuthorizationComponent implements OnInit {
  public errText: string;
  public errCondition: boolean = false;
  public loginForm: FormGroup;
  public dataSource: FormGroup;
  public loginText: string = 'Choose organization and VCS';

  constructor(
    private readonly router: Router,
    private readonly auth: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly lsService: LocalStorageService
  ) {  }

  ngOnInit(): void {
    this.lsService.clear();

    this.loginForm = this.formBuilder.group({
      organization: ['', Validators.required],
      dataSource: ['', Validators.required]
    });
  }

  public setVCS() {
    let orgNameLength = this.loginForm.value.organization.length;

    switch (this.loginForm.value.dataSource) {
      case orgNameLength !== 0 && 'github':
        return 'Log in via GitHub';
      default:
        return 'Choose organization and VCS';
    }
  }
  public login() {
    document.getElementById('LoginButton').setAttribute('disabled', 'disabled');
    this.loginText = 'Loading...';
    return this.auth.authenticateUser(this.loginForm.value);
  }
}
