import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Document, Model } from 'mongoose';
import { AuthInterface } from '../../../interfaces/auth.interface';
import { OrganizationsListInterface } from '../../../interfaces/organizations-list.interface';

@Injectable()
export class LayerService {

  constructor(
    @Inject('OrganizationsModelToken') private readonly organizationsList: Model<OrganizationsListInterface&Document>
  ) {  }

  public async getOrgData(orgData: AuthInterface) {
    const res = await this.organizationsList
      .findOne({
        organizationName: orgData.organization,
        organizationDataStorage: { $in: [ orgData.dataSource ] }
      })
      .select({ '_id': 0 });

    if (!res) {
      throw new NotFoundException('Organization not found');
    }

    return true;
  }

  public async getOrganizations() {
    return await this.organizationsList
      .find()
      .select({ '_id': 0, 'organizationName': 1 })
  }

}
