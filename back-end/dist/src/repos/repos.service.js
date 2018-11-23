"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const repo_data_config_1 = require("../../config/repo-data-config");
const repos_repository_1 = require("./repos.repository");
let ReposService = class ReposService {
    constructor(httpService, repoDB) {
        this.httpService = httpService;
        this.repoDB = repoDB;
    }
    getRepo() {
        return __awaiter(this, void 0, void 0, function* () {
            const publicRepositories = yield this.makeRequestToGitHubLink(repo_data_config_1.default.repositories, '');
            console.log(publicRepositories);
            return 111;
        });
    }
    makeRequestToGitHubLink(repositories, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const arrayOfRepos = lodash_1.flatMap(repositories, (repoName) => {
                return lodash_1.map(repo_data_config_1.default.branches, (branch) => {
                    return {
                        link: `https://raw.githubusercontent.com/${repoName}/${branch}/package.json`,
                        repoName: repoName,
                        branch: branch,
                        token: token
                    };
                });
            });
            for (let repo of arrayOfRepos) {
                const { link, repoName, branch, token } = repo;
                const githubData = yield this.getReposData(link, token);
                if (githubData !== undefined) {
                    const newObject = lodash_1.assign({}, {
                        repoName,
                        timestamp: new Date(),
                        [branch]: githubData
                    });
                    yield this.repoDB.insertToDB(newObject);
                }
            }
            return this.repoDB.findReposData();
        });
    }
    getReposData(route, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const config = {
                    headers: {
                        Authorization: accessToken,
                    },
                };
                const { data: packageJsonData } = yield this.httpService.get(route, config).toPromise();
                const dependencies = lodash_1.assign({}, packageJsonData.devDependencies, packageJsonData.dependencies);
                const staticRepoData = lodash_1.pick(packageJsonData, [
                    repo_data_config_1.default.staticRepoData.version,
                    repo_data_config_1.default.staticRepoData.name,
                    repo_data_config_1.default.staticRepoData.description,
                ]);
                const dependenciesRepo = lodash_1.pick(dependencies, [
                    repo_data_config_1.default.objectPackages.express,
                    repo_data_config_1.default.objectPackages.lodash,
                    repo_data_config_1.default.objectPackages.tslint,
                    repo_data_config_1.default.objectPackages.typescript,
                    repo_data_config_1.default.objectPackages.angular,
                ]);
                return lodash_1.assign({}, staticRepoData, dependenciesRepo);
            }
            catch (err) {
                if (err.response.data === 'Not found\n') {
                    return { data: 'Nothing data' };
                }
            }
        });
    }
};
ReposService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_1.HttpService, repos_repository_1.ReposRepository])
], ReposService);
exports.ReposService = ReposService;
//# sourceMappingURL=repos.service.js.map