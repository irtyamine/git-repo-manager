declare const repoConfig: {
    repositories: {
        name: string;
        repoType: string;
        token: string;
    }[];
    aliases: string[][];
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
