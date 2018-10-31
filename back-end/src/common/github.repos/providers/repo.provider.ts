import { Connection } from 'mongoose';
import { RepoDataSchema } from '../../../database/schemas/repo.schema/repo.data.schema';
import { RepoDataMasterSchema } from '../../../database/schemas/repo.schema/repo.data.master.schema';

export const repoProviders = [
    {
        provide: 'RepoModelToken',
        useFactory: (connection: Connection) => connection.model('Repo', RepoDataSchema),
        inject: ['DbConnectionToken']
    }
];