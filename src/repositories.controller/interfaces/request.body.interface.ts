export interface RequestBodyInterface {
    repoName: string;
    branches: {
        [key: string]: any
    };
}
