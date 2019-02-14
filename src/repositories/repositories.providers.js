"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repo_schema_1 = require("./schemas/repo.schema");
exports.repositoriesProviders = [
    {
        provide: 'RepoModelToken',
        useFactory: (connection) => connection.model('Repo', repo_schema_1.RepoSchema),
        inject: ['DbConnectionToken'],
    }
];
//# sourceMappingURL=repositories.providers.js.map