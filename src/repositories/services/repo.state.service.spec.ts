import { Test } from '@nestjs/testing';
import { RepositoriesController } from '../repositories.controller';
import { RepoStateService } from './repo.state.service';
import { HttpModule } from '@nestjs/common';
import { GitHubRepositoriesService } from './repositories.service';
import { AuthService } from '../../app.authentication/auth.service';
import { GithubRepository } from '../../app.authentication/github.repository';
import { CronJobService } from './cronjob.service';
import { repositoriesProviders } from '../repositories.providers';
import { githubUserProviders } from '../../app.authentication/github.user.providers';
import { databaseProviders } from '../../common/database.providers';
import { MockRepositoriesRepository } from '../mock.repositories.repository';
import { GitHubRepositoriesRepository } from '../repositories.repository';
const mockReposData = require('../mock.repositories.data.json');
const reposData = require('../../../config/github-repositories-config.json');

describe('controller: RepositoriesController', () => {
    let controller: RepositoriesController;
    let service: RepoStateService;
    let repositoriesService: GitHubRepositoriesService;

    let reposService = {
        provide: GitHubRepositoriesRepository,
        useClass: MockRepositoriesRepository
    };

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [
                RepositoriesController
            ],
            imports: [ HttpModule ],
            providers: [
                GitHubRepositoriesService,
                AuthService,
                GithubRepository,
                RepoStateService,
                CronJobService,
                reposService,
                ...repositoriesProviders,
                ...githubUserProviders,
                ...databaseProviders
            ]
        }).compile();

        controller = module.get<RepositoriesController>(RepositoriesController);
        service = module.get<RepoStateService>(RepoStateService);
        repositoriesService = module.get<GitHubRepositoriesService>(GitHubRepositoriesService);
    });

    describe('findRecommendVersions()', () => {
        it('should return an object of recommend versions', (done: DoneFn) => {
            const recommendVersions = controller.findRecommendVersions();
            expect(recommendVersions).toEqual(reposData.RECOMMENDED_AT_VALOR_VERSIONS);
            done();
        });
    });

    describe('getNamesFromDB()', () => {
        it('should return an array of repositories names',(done: DoneFn) => {
            service.getNames().then(res => {
                expect(res).toEqual(['name', 'name/one', 'name/two']);
                done();
            });
        });
    });

    describe('findRepoDataAtDatabase(req.query.repositoryName)', () => {
        it('should return an object of repository data', (done: DoneFn) => {
            const repositoryData = service.findRepoDataAtDatabase('name/one');
            expect(repositoryData).toEqual(mockReposData.repositoryData);
            done();
        });
    });
});
