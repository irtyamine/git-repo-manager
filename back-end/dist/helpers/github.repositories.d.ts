declare const gitHubConfig: {
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
    url: {
        localhost: string;
        ngrok: string;
    };
    recommendedAtValorVersions: {
        lodash: string;
        tslint: string;
        typescript: string;
        express: string;
        '@angular/common': string;
    };
};
export default gitHubConfig;
