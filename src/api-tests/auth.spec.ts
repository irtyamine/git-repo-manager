import * as request from 'supertest';
import * as cookieParser from 'cookie-parser';
import { HttpModule, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthController } from '../authentication.controller/controller';
import { AuthService } from '../authentication.controller/auth.service';
import { GithubRepositoryLayer } from '../authentication.controller/repository-layer';
import { MockGithubRepositoryLayer } from '../authentication.controller/mock.repository-layer';
import { GithubStrategy } from '../authentication.controller/github.strategy';
import { databaseProviders } from '../common/database.providers';
import { githubUserProviders } from '../authentication.controller/user.providers';

describe('AppAuthentication', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            controllers: [ AuthController ],
            imports: [ HttpModule ],
            providers: [
                AuthService,
                {
                    provide: GithubRepositoryLayer,
                    useClass: MockGithubRepositoryLayer
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
