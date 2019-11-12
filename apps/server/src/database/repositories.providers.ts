import { Connection } from 'mongoose';
import { OrganizationsListSchema } from '../schemas/organizations-list.schema';
import { GithubRepositoriesSchema } from '../modules/github-repositories/schemas/repository.schema';
import { PackgesSchema } from '../modules/github-repositories/schemas/packages.schema';
import { UserDataSchema } from '../schemas/user-data.schema';
import { CustomBranchesSchema } from '../modules/github-repositories/schemas/custom-branches.schema';
import { BranchesAliasesSchema } from '../modules/github-repositories/schemas/branches-aliases.schema';

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
  },
  {
    provide: 'CustomBranchesToken',
    useFactory: (connection: Connection) =>
      connection.model('custom_branches', CustomBranchesSchema),
    inject: ['DbConnectionToken']
  },
  {
    provide: 'BranchesAliases',
    useFactory: (connection: Connection) =>
      connection.model('branches_aliases', BranchesAliasesSchema),
    inject: ['DbConnectionToken']
  }
];
