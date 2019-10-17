import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Document, Model } from 'mongoose';
import { AuthInterface } from '../../../interfaces/auth.interface';
import { OrganizationsListInterface } from '../../../interfaces/organizations-list.interface';
import { UserDataInterface } from '../../../interfaces/user-data.interface';

@Injectable()
export class LayerService {

  constructor(
    @Inject('OrganizationsModelToken') private readonly organizationsList: Model<OrganizationsListInterface & Document>,
    @Inject('UsersModelToken') private readonly users: Model<UserDataInterface & Document>
  ) {
  }

  public async getOrgData(orgData: AuthInterface) {
    const res = await this.organizationsList
      .findOne({
        organizationName: orgData.organization,
        organizationDataStorage: { $in: [orgData.dataSource] }
      })
      .select({ '_id': 0 });

    if (!res) {
      throw new NotFoundException('Organization not found');
    }

    return true;
  }

  public async getUserData(authToken: string) {
    return await this.users
      .findOne({ authToken: authToken })
      .select({ '_id': 0, 'role': 1, 'login': 1 });
  }

  public async saveLoggedInUser(user: UserDataInterface) {
    const newUser = new this.users(user);

    return await this.users.create(newUser);
  }
}


