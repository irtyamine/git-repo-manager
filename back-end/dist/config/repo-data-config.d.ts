declare const repoConfig: {
    repositories: (string | {
        repo: string;
        typeOfPrivacy: string;
        token: any;
    })[];
    privateRepositories: string[];
    branches: string[];
    objectPackages: {
        express: string;
        lodash: string;
        tslint: string;
        typescript: string;
        angular: string;
    };
    staticRepoData: {
        version: string;
        name: string;
        description: string;
    };
};
export default repoConfig;
