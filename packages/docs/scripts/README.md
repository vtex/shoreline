# Scripts de Build da Documentação

Esta pasta contém scripts que geram automaticamente conteúdo para a documentação.

## Scripts Disponíveis

### `build-examples.mjs`

Gera previews de código para todos os arquivos na pasta `/examples`.

**Execução:**
```bash
pnpm gen:examples
```

**Como funciona:**
- Lê todos os arquivos `.tsx` da pasta `/examples` (ignora subdiretórios)
- Formata o código usando Prettier
- Gera previews HTML usando Shiki.js
- Cria um arquivo `/__examples__/index.ts` com todos os exemplos

### `build-contributors.mjs`

Gera estatísticas de contribuidores a partir da API do GitHub.

**Execução:**
```bash
pnpm gen:contributors
```

**Requisitos:**
- Token do GitHub com acesso ao escopo `public_repo`
- Variável de ambiente `VTEX_GITHUB_BOT_TOKEN`

**Configuração:**
1. Crie um token pessoal no GitHub: https://github.com/settings/tokens
2. Crie um arquivo `.env` na raiz da pasta `docs`:
   ```env
   VTEX_GITHUB_BOT_TOKEN=seu_token_aqui
   ```

**Nota:** O script falhará graciosamente se o token não estiver configurado, permitindo que o build continue normalmente.

**Como funciona:**
- Busca issues e pull requests do repositório `vtex/shoreline`
- Gera estatísticas de contribuição para cada usuário
- Cria arquivos em `/__contributions__/`:
  - `stats.ts` - estatísticas de contribuidores
  - `issues.ts` - issues mais comentadas
- Cria páginas individuais para cada contribuidor em `/pages/guides/contributor/`

### `build-props.mjs`

Gera documentação de props dos componentes a partir do código TypeScript.

**Execução:**
```bash
pnpm gen:props
```

**Como funciona:**
- Analisa os arquivos TypeScript dos componentes
- Extrai interfaces e tipos de props
- Gera documentação automática das props

## Troubleshooting

### Erro "EISDIR: illegal operation on a directory"
Este erro ocorria quando o script tentava ler um diretório como arquivo. Foi corrigido para filtrar apenas arquivos.

### Erro "Bad credentials" na API do GitHub
Indica que o token do GitHub está ausente ou inválido. Configure a variável `VTEX_GITHUB_BOT_TOKEN` conforme descrito acima.

