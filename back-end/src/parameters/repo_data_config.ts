let repo_config = {
    repositories: [
        'VS-work/vs-website',
        'VS-work/ngx-bootstrap',
        'VS-work/waffle-server-repo-service',
        'VS-work/git-csv-diff'
    ],
    branches: [
        'master',
        'develop',
        'development'
    ],
    nested_objects: [
        'devDependencies',
        'dependencies'
    ],
    object_packages: [
        'express',
        'lodash',
        'tslint',
        'typescript',
        '@angular/common'
    ],
    packages: [
        'version',
        'name',
        'description',
        'express',
        'lodash',
        'tslint',
        'typescript',
        '@angular/common'
    ],
    staticRepoData: [
        'version',
        'name',
        'description',
    ],
};

export default repo_config;