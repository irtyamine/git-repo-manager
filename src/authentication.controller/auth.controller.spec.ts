import { Test } from '@nestjs/testing';
import { AuthController } from './controller';
import { AuthService } from './auth.service';
import { GithubRepositoryLayer } from './repository-layer';
import { GithubStrategy } from './github.strategy';
import { githubUserProviders } from './user.providers';
import { databaseProviders } from '../common/database.providers';
import { HttpModule } from '@nestjs/common';
import { MockGithubRepositoryLayer } from './mock.repository-layer';

describe('controller: AuthController', () => {
    let service: AuthService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [AuthController],
            imports: [HttpModule],
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

        service = module.get<AuthService>(AuthService);
    });

    describe('isAuthenticated', () => {
        it('should return "true" after success find access token', (done: DoneFn) => {
            service.getUserPersonalAccesstoken('lC3dGPoZavFwsxCjEvNrqy').then(res => {
                expect(res).toBeTruthy();
                done();
            });
        });

        it('should return "Unauthorized" error if access token was not found', (done: DoneFn) => {
            service.getUserPersonalAccesstoken('lC3dGPoZavFwsxCjEvNrqI').then(res => {},
            err => {
                expect(err.message.statusCode).toBe(401);
                expect(err.message.error).toBe('Unauthorized');
                done();
            });
        });
    });
});
