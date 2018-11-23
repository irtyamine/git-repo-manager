"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repos_parent_schema_1 = require("./schemas/repos.parent.schema");
exports.reposProviders = [
    {
        provide: 'RepoModelToken',
        useFactory: (connection) => connection.model('Repo', repos_parent_schema_1.ReposParentSchema),
        inject: ['DbConnectionToken']
    }
];
//# sourceMappingURL=repos.providers.js.map