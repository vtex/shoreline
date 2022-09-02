import rollupConfig from '../../rollup.config'

const [mainConfig, typesConfig] = rollupConfig

export default [
  {
    ...mainConfig,
    external: [...mainConfig.external, '@vtex/admin-ui'],
  },
  typesConfig,
]
