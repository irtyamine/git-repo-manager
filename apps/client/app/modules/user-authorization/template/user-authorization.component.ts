import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-authorization',
  templateUrl: './user-authorization.html',
  styleUrls: ['./user-authorization.scss']
})

export class UserAuthorizationComponent implements OnInit {
  public loginForm = new FormGroup({
    organization: new FormControl(''),
    dataSource: new FormControl('')
  });

  constructor() {  }

  ngOnInit(): void {  }
}
