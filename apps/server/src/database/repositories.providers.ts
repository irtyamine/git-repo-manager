import { Connection } from 'mongoose';
import { OrganizationsListSchema } from '../schemas/organizations-list.schema';
import { GithubRepositoriesSchema } from '../schemas/github-repository.schema';
import { PackgesSchema } from '../schemas/github-packages.schema';
import { UserDataSchema } from '../schemas/user-data.schema';

export const gitHubRepositoriesProviders = [
  {
    provide: 'OrganizationsModelToken',
    useFactory: (connection: Connection) =>
      connection.model('organizations_list', OrganizationsListSchema),
    inject: ['DbConnectionToken']
  },
  {
    provide: 'NewRepositoryModelToken',
    useFactory: (connection: Connection) =>
      connection.model('repositories_data', GithubRepositoriesSchema),
    inject: ['DbConnectionToken']
  },
  {
    provide: 'PackagesModelToken',
    useFactory: (connection: Connection) =>
      connection.model('packages', PackgesSchema),
    inject: ['DbConnectionToken']
  },
  {
    provide: 'UsersModelToken',
    useFactory: (connection: Connection) =>
      connection.model('users', UserDataSchema),
    inject: ['DbConnectionToken']
  }
];
