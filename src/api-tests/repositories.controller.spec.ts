import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpModule, INestApplication } from '@nestjs/common';
import { RepositoriesController } from '../repositories.controller/controller';
import { GitHubRepositoriesService } from '../repositories.controller/services/get-repositories-data';
import { AuthService } from '../authentication.controller/auth.service';
import { GithubRepositoryLayer } from '../authentication.controller/repository-layer';
import { RepoStateService } from '../repositories.controller/services/repo.state';
import { CronJobService } from '../repositories.controller/services/cronjob';
import { repositoriesProviders } from '../repositories.controller/repositories.providers';
import { githubUserProviders } from '../authentication.controller/user.providers';
import { databaseProviders } from '../common/database.providers';
import { GitHubRepositoriesRepositoryLayer } from '../repositories.controller/repository-layer';
import { MockRepositoriesRepositoryLayer } from '../repositories.controller/mock.repository-layer';

describe('Repositories', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            controllers: [
                RepositoriesController
            ],
            imports: [ HttpModule ],
            providers: [
                GitHubRepositoriesService,
                AuthService,
                GithubRepositoryLayer,
                RepoStateService,
                CronJobService,
                {
                    provide: GitHubRepositoriesRepositoryLayer,
                    useClass: MockRepositoriesRepositoryLayer
                },
                ...repositoriesProviders,
                ...githubUserProviders,
                ...databaseProviders
            ]
        })
          .compile();

        app = module.createNestApplication();
        await app.init();
    });

    it('/GET recommend-versions', () => {
        return request(app.getHttpServer())
            .get('/repositories/recommend-versions')
            .expect(200)
            .expect({
                lodash: '4.17.1',
                tslint: '5.8.0',
                typescript: '2.5.2',
                express: '4.15.0',
                '@angular/common': '5.2.0'
        });
    });

    it('/GET names', () => {
        return request(app.getHttpServer())
            .get('/repositories/names')
            .expect(200)
            .expect(['name', 'name/one', 'name/two']);
    });

    it('/GET repository', () => {
        return request(app.getHttpServer())
            .get('/repositories/repository')
            .expect(200)
            .expect({
                repoName: 'name/one',
                repoType: 'Public',
                timestamp: 1555496488280,
                branches: {
                    master: {
                        description: 'Testing description for master branch'
                    },
                    development: {
                        description: 'Testing description for development branch'
                    }
                }
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
