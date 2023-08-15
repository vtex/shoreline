export const vtexIORewrite = [
  {
    source: '/api/vtexcommerce/:account/:version/:endpoint*',
    destination: 'https://:account.vtexcommerce:version.com.br/api/:endpoint*',
  },
  {
    source: '/api/myvtex/:account/:endpoint*',
    destination: 'https://:account.myvtex.com.br/api/:endpoint*',
  },
]
