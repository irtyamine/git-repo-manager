import * as request from 'supertest';
import * as cookieParser from 'cookie-parser';
import { HttpModule, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthController } from '../app.authentication/auth.controller';
import { AuthService } from '../app.authentication/auth.service';
import { GithubRepository } from '../app.authentication/github.repository';
import { MockGithubRepository } from '../app.authentication/mock.github.repository';
import { GithubStrategy } from '../app.authentication/github.strategy';
import { databaseProviders } from '../common/database.providers';
import { githubUserProviders } from '../app.authentication/github.user.providers';

describe('AppAuthentication', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            controllers: [ AuthController ],
            imports: [ HttpModule ],
            providers: [
                AuthService,
                {
                    provide: GithubRepository,
                    useClass: MockGithubRepository
                },
                GithubStrategy,
                ...databaseProviders,
                ...githubUserProviders
            ]
        }).compile();

        app = module.createNestApplication();
        app.use(cookieParser());
        await app.init();
    });

    it('/GET github', (done: DoneFn) => {
        return request(app.getHttpServer())
            .get('/repositories2/github')
            .end((err, res) => {
                expect(res.header.location).toContain('https://github.com/login/oauth/authorize' );
                done();
            });
    });

    describe('/GET isAuthenticated', () => {
        it('should return body: true if auth token is exists', (done: DoneFn) => {
            return request(app.getHttpServer())
                .get('/repositories2/isAuthenticated')
                .set({'Cookie': '_auth_token=mR3ol78EsVpLyk44YYz2PX'})
                .end((err, res) => {
                    expect(res.body).toBe(true);
                    done();
                });
        });

        it('should return body: false if auth token is not exists', (done: DoneFn) => {
            return request(app.getHttpServer())
                .get('/repositories2/isAuthenticated')
                .set({'Coolie': ''})
                .end((err, res) => {
                    expect(res.body).toBe(false);
                    done();
                });
        });

        it('should return 401 error if auth token is incorrect or was expired', (done: DoneFn) => {
            return request(app.getHttpServer())
                .get('/repositories2/isAuthenticated')
                .set({'Cookie': '_auth_token=lC3dGPoZavD@#Wedsda'})
                .end((err, res) => {
                    expect(res.status).toBe(401);
                    done();
                });
        });
    });

    it('/GET logout', async (done: DoneFn) => {
        return await request(app.getHttpServer())
            .get('/repositories2/logout')
            .then(res => {
                expect(res.header.location).toContain('/login');
                done();
            });
    });
});
