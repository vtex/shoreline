import { recommended } from './configs/recommended'
import { createTagComponentOutsideRenderPhase } from './rules/create-tag-component-outside-render-phase'

// tsdx doesn't support we configure our tsconfig.json
// to target module commonjs, so we need to manually
// use module.exports here
module.exports = {
  configs: {
    recommended,
  },

  // TODO: these rules could be auto-generated using fs+path,
  // but tsdx doesn't works well with dynamic imports,
  // so we need to change our build system first
  rules: {
    'create-tag-component-outside-render-phase':
      createTagComponentOutsideRenderPhase,
  },
}
