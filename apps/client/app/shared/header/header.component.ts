import { Component, Input } from '@angular/core';
import { AuthService } from '../../modules/user-authorization/services/auth.service';
import { AuthDataInterface } from '../interfaces/auth-data.interface';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  @Input() lastUpdate: string;
  @Input() dataSource: string;
  @Input() userData: AuthDataInterface;

  constructor(
    private readonly auth: AuthService
  ) {}

  public logout() {
    this.auth.logout();
  }

  public setDataSource(dataSource: string) {
    switch (dataSource) {
      case 'github':
        return 'GitHub';
      case 'gitlab':
        return 'GitLab';
    }
  }
}
