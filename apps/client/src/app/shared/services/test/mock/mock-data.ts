export const DefaultBranches = {
  baseBranch: {
    branchName: 'master'
  },
  compareBranch: {
    branchName: 'development'
  }
};

export const MockPackages = [
  {
    name: 'version',
    recommendVersion: '',
    addedBy: 'admin',
    organization: 'valor-software',
    dataSource: 'github',
    isImportant: true
  },
  {
    name: 'lodash',
    recommendVersion: '14.10.0',
    addedBy: 'admin',
    organization: 'valor-software',
    dataSource: 'github',
    isImportant: false
  }
];

export const MockRepositories = [
  {
    repoName: 'testRepo1',
    repoType: 'Public',
    timestamp: 111111111111111111,
    organization: 'testOrg',
    dataSource: 'all',
    branches: {
      baseBranch: {},
      compareBranch: {}
    }
  },
  {
    repoName: 'testRepo2',
    repoType: 'Private',
    timestamp: 111111111111111111,
    organization: 'testOrg',
    dataSource: 'all',
    branches: {
      baseBranch: {},
      compareBranch: {}
    }
  },
  {
    repoName: 'testRepo3',
    repoType: 'Public',
    timestamp: 111111111111111111,
    organization: 'testOrg',
    dataSource: 'all',
    branches: {
      baseBranch: {},
      compareBranch: {}
    }
  },

];
