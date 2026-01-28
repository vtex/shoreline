module.exports = {
  preset: 'conventionalcommits',
  releaseRules: [
    { breaking: true, release: 'minor' }, // Change breaking changes to minor
    { type: 'feat', release: 'minor' }, // Features are treated as minor releases
    { type: 'fix', release: 'patch' }, // Fixes are treated as patch releases
  ],
  parserOpts: {
    noteKeywords: ['BREAKING CHANGE'],
  },
}
