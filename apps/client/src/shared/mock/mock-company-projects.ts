export const MockTableHeader = [
  {
    name: 'version',
    recommendVersion: '',
    addedBy: 'admin',
    organization: 'testOrg',
    dataSource: 'github',
    isImportant: true
  },
  {
    name: 'lodash',
    recommendVersion: '14.10.0',
    addedBy: 'admin',
    organization: 'tesOrg',
    dataSource: 'github',
    isImportant: false
  },
];

export const MockRepositoriesData = [
  {
    repoName: 'testRepoOne',
    repoType: 'Public',
    dataSource: 'github',
    timestamp: 1574420858029,
    branches: {
      compareBranch: {
        version: '1.0.0'
      }
    }
  },
  {
    repoName: 'testRepoTwo',
    repoType: 'Private',
    dataSource: 'github',
    timestamp: 1574420858029,
    branches: {
      baseBranch: {
        version: '1.1.0',
        lodash: '14.09.10'
      },
      compareBranch: {
        version: '1.2.0',
        lodash: '^14.10.0'
      }
    }
  },
  {
    repoName: 'testRepoThree',
    repoType: 'Public',
    dataSource: 'github',
    timestamp: 1574420858029,
    branches: {
      baseBranch: {
        lodash: '14.10.0'
      },
    }
  }
];
