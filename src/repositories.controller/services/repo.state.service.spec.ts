// import { Test } from '@nestjs/testing';
// import { RepositoriesController } from '../controller';
// import { RepoStateService } from './repo.state';
// import { HttpModule } from '@nestjs/common';
// import { GitHubRepositoriesService } from './get-repositories-data';
// import { AuthService } from '../../authentication.controller/auth.service';
// import { GithubRepositoryLayer } from '../../authentication.controller/repository-layer';
// import { CronJobService } from './cronjob';
// import { repositoriesProviders } from '../repositories.providers';
// import { githubUserProviders } from '../../authentication.controller/user.providers';
// import { databaseProviders } from '../../common/database.providers';
// import { MockRepositoriesRepositoryLayer } from '../mock.repository-layer';
// import { GitHubRepositoriesRepositoryLayer } from '../repository-layer';
// const mockReposData = require('../../api-tests/mock.repositories.data.json');
// const reposData = require('../../../github-repositories-config.json');
//
// describe('controller: RepositoriesController', () => {
//     let controller: RepositoriesController;
//     let service: RepoStateService;
//     let repositoriesService: GitHubRepositoriesService;
//
//     let reposService = {
//         provide: GitHubRepositoriesRepositoryLayer,
//         useClass: MockRepositoriesRepositoryLayer
//     };
//
//     beforeEach(async () => {
//         const module = await Test.createTestingModule({
//             controllers: [
//                 RepositoriesController
//             ],
//             imports: [ HttpModule ],
//             providers: [
//                 GitHubRepositoriesService,
//                 AuthService,
//                 GithubRepositoryLayer,
//                 RepoStateService,
//                 CronJobService,
//                 reposService,
//                 ...repositoriesProviders,
//                 ...githubUserProviders,
//                 ...databaseProviders
//             ]
//         }).compile();
//
//         controller = module.get<RepositoriesController>(RepositoriesController);
//         service = module.get<RepoStateService>(RepoStateService);
//         repositoriesService = module.get<GitHubRepositoriesService>(GitHubRepositoriesService);
//     });
//
//     describe('findRecommendVersions()', () => {
//         it('should return an object of recommend versions', (done: DoneFn) => {
//             const recommendVersions = controller.findRecommendVersions();
//             expect(recommendVersions).toEqual(reposData.RECOMMENDED_AT_VALOR_VERSIONS);
//             done();
//         });
//     });
//
//     describe('getNamesFromDB()', () => {
//         it('should return an array of repositories names',(done: DoneFn) => {
//             service.getNames().then(res => {
//                 expect(res).toEqual(['name', 'name/one', 'name/two']);
//                 done();
//             });
//         });
//     });
//
//     describe('findRepoDataAtDatabase(req.query.repositoryName)', () => {
//         it('should return an object of repository data', (done: DoneFn) => {
//             const repositoryData = service.findRepoDataAtDatabase('name/one');
//             expect(repositoryData).toEqual(mockReposData.repositoryData);
//             done();
//         });
//     });
// });
