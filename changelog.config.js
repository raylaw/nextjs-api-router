const custom = require('@digitalroute/cz-conventional-changelog-for-jira/configurable');
// You can do this optionally if you want to extend the commit types
const defaultTypes = require('@digitalroute/cz-conventional-changelog-for-jira/types');

module.exports = custom({
  types: {
    ...defaultTypes,
    perf: {
      description: 'Improvements that will make your code perform better',
      title: 'Performance',
    },
  },
  skipScope: false,
  scopes: ['workspace', 'NxRoute'],
  customScope: true,
  jiraPrefix: 'RAY',
});
