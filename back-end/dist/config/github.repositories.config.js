"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const API_github_keys_1 = require("../helpers/API.github.keys");
const gitHubConfig = {
    repositories: [
        { name: 'valor-software/dollar-street-consumer-api', repoType: 'Private', token: API_github_keys_1.default.reposAccessToken },
        { name: 'valor-software/dollar-street-cms-server', repoType: 'Private', token: API_github_keys_1.default.reposAccessToken },
        { name: 'valor-software/personal-crm', repoType: 'Private', token: API_github_keys_1.default.reposAccessToken },
        { name: 'valor-software/envision-nest', repoType: 'Private', token: API_github_keys_1.default.reposAccessToken },
        { name: 'valor-software/church-app', repoType: 'Private', token: API_github_keys_1.default.reposAccessToken },
        { name: 'VS-work/vs-website', repoType: 'Public', token: '' },
        { name: 'VS-work/ngx-bootstrap', repoType: 'Public', token: '' },
        { name: 'Gapminder/dollar-street-pages', repoType: 'Public', token: '' },
        { name: 'valor-software/dollar-street-cms-pages', repoType: 'Public', token: '' },
        { name: 'valor-software/dollar-street-embed-api', repoType: 'Public', token: '' },
        { name: 'vizabi/vizabi', repoType: 'Public', token: '' },
        { name: 'vizabi/vizabi-interpolators', repoType: 'Public', token: '' },
        { name: 'vizabi/ng2-vizabi', repoType: 'Public', token: '' },
        { name: 'Gapminder/ng2-tools-page', repoType: 'Public', token: '' },
        { name: 'vizabi/vizabi-ddfcsv-reader', repoType: 'Public', token: '' },
        { name: 'vizabi/vizabi-ws-reader', repoType: 'Public', token: '' },
        { name: 'Gapminder/ddf-validation', repoType: 'Public', token: '' },
        { name: 'Gapminder/gapminder-offline', repoType: 'Public', token: '' },
        { name: 'Gapminder/waffle-server', repoType: 'Public', token: '' },
        { name: 'VS-work/waffle-server-repo-service', repoType: 'Public', token: '' },
        { name: 'VS-work/git-csv-diff', repoType: 'Public', token: '' },
        { name: 'vizabi/readers-test', repoType: 'Public', token: '' },
        { name: 'Gapminder/ddf-time-utils', repoType: 'Public', token: '' },
        { name: 'VS-work/live-starter', repoType: 'Public', token: '' },
        { name: 'VS-work/live-starter-api', repoType: 'Public', token: '' },
        { name: 'MilaLys/themes-switching', repoType: 'Public', token: '' }
    ],
    aliases: [
        ['master'],
        ['development', 'develop']
    ],
    objectPackages: {
        express: 'express',
        lodash: 'lodash',
        tslint: 'tslint',
        typescript: 'typescript',
        angular: '@angular/common',
    },
    staticRepoData: {
        version: 'version',
        name: 'name',
        description: 'description',
    },
    url: {
        localhost: 'http://localhost:3000',
        ngrok: 'http://6dc5679f.ngrok.io'
    },
    recommendedAtValorVersions: {
        lodash: '4.17.7',
        tslint: '5.8.0',
        typescript: '2.5.2',
        version: '1.0.0',
        express: '4.16.0',
        '@angular/common': '5.2.0'
    }
};
exports.default = gitHubConfig;
//# sourceMappingURL=github.repositories.config.js.map