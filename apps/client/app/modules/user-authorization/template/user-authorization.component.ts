import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-authorization',
  templateUrl: './user-authorization.html',
  styleUrls: ['./user-authorization.scss']
})

export class UserAuthorizationComponent implements OnInit {
  public loginForm: FormGroup;
  public dataSource: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      organization: ['', Validators.required],
      dataSource: ['', Validators.required]
    });
  }

  public login() {
    console.log(this.loginForm.value);
  }
}
