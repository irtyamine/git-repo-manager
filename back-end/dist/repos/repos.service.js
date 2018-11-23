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
const repos_repository_1 = require("./repos.repository");
const module_1 = require();
let GitHubRepositoriesService = class GitHubRepositoriesService {
    constructor(httpService, repoDB) {
        this.httpService = httpService;
        this.repoDB = repoDB;
    }
    getRepositories() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(module_1.gitHubConfig);
        });
    }
    makeRequestToGitHubLink(repositories) {
        return __awaiter(this, void 0, void 0, function* () {
            const arrayOfAlias = module_1.gitHubConfig.aliases;
            const arrayOfRepos = lodash_1.flatMap(repositories, (repoData) => {
                return {
                    repoType: repoData.repoType,
                    repoName: repoData.name,
                    aliases: arrayOfAlias,
                    token: repoData.token
                };
            });
            for (let repo of arrayOfRepos) {
                const { repoType, repoName, aliases, token } = repo;
                for (let alias of aliases) {
                    const branchName = alias[0];
                    for (let branch of alias) {
                        const link = `https://raw.githubusercontent.com/${repoName}/${branch}/package.json`;
                        try {
                            const githubData = yield this.getRepositoryData(link, token);
                            const repositoryObject = {
                                repoName,
                                timestamp: Date.now(),
                                repoType,
                                [branchName]: githubData
                            };
                            yield this.repoDB.insertToDB(repositoryObject);
                            break;
                        }
                        catch (error) {
                            if (error.response.status !== 404) {
                                console.log(`${error.message}:  ${error.cause}`);
                            }
                        }
                    }
                }
            }
            return yield this.repoDB.findReposData();
        });
    }
    getRepositoryData(route, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                headers: {
                    Authorization: accessToken,
                },
            };
            const { data: packageJsonData } = yield this.httpService.get(route, config).toPromise();
            const dependencies = lodash_1.assign({}, packageJsonData.devDependencies, packageJsonData.dependencies);
            const staticRepoData = lodash_1.pick(packageJsonData, [
                module_1.gitHubConfig.staticRepoData.version,
                module_1.gitHubConfig.staticRepoData.name,
                module_1.gitHubConfig.staticRepoData.description,
            ]);
            const dependenciesRepo = lodash_1.pick(dependencies, [
                module_1.gitHubConfig.objectPackages.express,
                module_1.gitHubConfig.objectPackages.lodash,
                module_1.gitHubConfig.objectPackages.tslint,
                module_1.gitHubConfig.objectPackages.typescript,
                module_1.gitHubConfig.objectPackages.angular,
            ]);
            return lodash_1.assign({}, staticRepoData, dependenciesRepo);
        });
    }
};
GitHubRepositoriesService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_1.HttpService, repos_repository_1.GitHubRepositoriesRepository])
], GitHubRepositoriesService);
exports.GitHubRepositoriesService = GitHubRepositoriesService;
//# sourceMappingURL=repos.service.js.map