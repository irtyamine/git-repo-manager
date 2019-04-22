import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpModule, INestApplication } from '@nestjs/common';
import { RepositoriesController } from '../repositories/repositories.controller';
import { GitHubRepositoriesService } from '../repositories/services/repositories.service';
import { AuthService } from '../app.authentication/auth.service';
import { GithubRepository } from '../app.authentication/github.repository';
import { RepoStateService } from '../repositories/services/repo.state.service';
import { CronJobService } from '../repositories/services/cronjob.service';
import { repositoriesProviders } from '../repositories/repositories.providers';
import { githubUserProviders } from '../app.authentication/github.user.providers';
import { databaseProviders } from '../common/database.providers';
import { GitHubRepositoriesRepository } from '../repositories/repositories.repository';
import { MockRepositoriesRepository } from '../repositories/mock.repositories.repository';

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
                GithubRepository,
                RepoStateService,
                CronJobService,
                {
                    provide: GitHubRepositoriesRepository,
                    useClass: MockRepositoriesRepository
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
