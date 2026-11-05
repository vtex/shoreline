// Stories tagged `skip-test` are known to fail and are deferred to the
// component reviews (see shoreline-specs/specs/shoreline-ai-ci-readiness.md).
module.exports = {
  tags: {
    skip: ['skip-test'],
  },
}
