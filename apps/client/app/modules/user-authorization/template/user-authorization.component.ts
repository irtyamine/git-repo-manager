import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  constructor(
    private readonly router: Router,
    private readonly auth: AuthService,
    private readonly formBuilder: FormBuilder
  ) {  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      organization: ['', Validators.required],
      dataSource: ['', Validators.required]
    });
  }

  public login() {
    return this.auth.authenticateUser(this.loginForm.value);
  }
}
