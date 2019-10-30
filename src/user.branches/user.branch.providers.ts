import { Connection } from 'mongoose';
import { UserBranchesSchema  } from './user.branches.schema';

export const userBranchProviders = [
    {
        provide: 'UserBranchesToken',
        useFactory: (connection: Connection) =>
            connection.model('Branches', UserBranchesSchema),
        inject: ['DbConnectionToken'],
    }
];
