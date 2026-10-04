# Evidências para a RFC Horizon

Consulta ao GitHub em 04/10/2026, às 03:47 UTC. A RFC permanece na versão inicial 1.0. Este registro sustenta as afirmações sobre contribuição, origem do Styleguide e separação da camada visual de Agentic UI.

## Atividade do Shoreline

A análise considera três meses completos, de 01/07 a 30/09/2026. A fonte principal são os PRs efetivamente integrados, contados pela data de merge, e as publicações do pacote `@vtex/shoreline`.

| Indicador | Resultado observado |
| --- | --- |
| PRs integrados no trimestre | 9: julho 0, agosto 8, setembro 1. |
| Autoria dos PRs integrados | 3 contas classificadas como User pela API, distribuídas em 6, 2 e 1 PRs. Nenhuma conta Bot nessa amostra. |
| Concentração das contribuições | 6 dos 9 PRs, aproximadamente 67%, vieram de uma conta. |
| Contas que efetuaram os merges | 3, também distribuídas em 6, 2 e 1 merges. |
| Publicações do pacote principal | 8, de 1.12.14 a 1.12.21. |
| Última publicação | 1.12.21 em 28/09/2026. |
| Intervalo entre as duas últimas publicações | 44,97 dias: 1.12.20 em 14/08 e 1.12.21 em 28/09. |
| Fila aberta no momento da consulta | 14 PRs: 10 de Renovate (Bot) e 4 de contas User; destes últimos, 2 drafts e 2 não drafts. |

Fontes: [PRs integrados no trimestre](https://github.com/vtex/shoreline/pulls?q=is%3Apr+is%3Amerged+merged%3A2026-07-01..2026-09-30), [releases](https://github.com/vtex/shoreline/releases), [1.12.21](https://github.com/vtex/shoreline/releases/tag/%40vtex/shoreline%401.12.21), [1.12.20](https://github.com/vtex/shoreline/releases/tag/%40vtex/shoreline%401.12.20) e [PRs abertos](https://github.com/vtex/shoreline/pulls?q=is%3Apr+is%3Aopen).

A `main` remota estava em [`d4aa0778ca9e20fe96a5eb41818594cb6ce09bc3`](https://github.com/vtex/shoreline/commit/d4aa0778ca9e20fe96a5eb41818594cb6ce09bc3), de 28/09/2026. O campo `pushed_at` do repositório também inclui outras branches, como Horizon; não foi usado para medir a evolução entregue na `main`.

### Método e interpretação

A consulta GraphQL usou `repo:vtex/shoreline is:pr is:merged merged:2026-07-01..2026-09-30`. Foram retornados os nove nós, com `issueCount=9`. A classificação User/Bot vem de `author.__typename`; ela identifica o tipo de conta, não o uso de assistência de IA. As releases foram filtradas por tags `@vtex/shoreline@...`, evitando contar a mesma rodada uma vez por pacote do monorepo.

Os dados mostram contribuições concentradas em poucas contas e períodos. A incompatibilidade com o ritmo necessário aos produtos é a necessidade relatada por Engenharia na elaboração desta RFC, considerada junto às adaptações locais identificadas nos consumidores. Quantidade de PRs e intervalo entre versões, isoladamente, não medem produtividade, demanda ou tempo de espera por revisão.

Não há evidência de desaceleração progressiva: os trimestres de 2026 tiveram 7, 4 e 9 PRs integrados, respectivamente. Também não há base para descrever a fila como um grande conjunto de contribuições humanas abandonadas: os drafts [#2160](https://github.com/vtex/shoreline/pull/2160) e [#2161](https://github.com/vtex/shoreline/pull/2161) receberam commits em 28/09, e o PR [#2165](https://github.com/vtex/shoreline/pull/2165), aberto em 20/09, recebeu commit em 03/10. O PR [#2163](https://github.com/vtex/shoreline/pull/2163) foi aberto e teve seu último commit em 24/08.

Como exemplo, a correção de ícone [#2164](https://github.com/vtex/shoreline/pull/2164) levou 32,81 dias entre abertura e merge. Esse é o intervalo total entre abertura e integração; não mede exclusivamente espera por revisão. A proposta prioriza ampliar a capacidade de contribuição, definir responsáveis e acompanhar o tempo entre necessidade, revisão e publicação.

## Origem e práticas do AIW Styleguide

O checkout analisado foi [`baceafacc9e32a863987dad06da5a6654b387d6b`](https://github.com/vtex/aiw-styleguide/tree/baceafacc9e32a863987dad06da5a6654b387d6b). O histórico começa em 21/09/2026, mesma data do [PR #1 — Publicar styleguide autônomo](https://github.com/vtex/aiw-styleguide/pull/1). O [README](https://github.com/vtex/aiw-styleguide/blob/baceafacc9e32a863987dad06da5a6654b387d6b/README.md) descreve um catálogo visual integrado ao `ai-workspace-shell-template`. Seu caráter de iniciativa conjunta de Design e Engenharia foi informado pelo proponente da RFC.

| Evidência | Implicação para a proposta |
| --- | --- |
| [vendor-workspace.mjs](https://github.com/vtex/aiw-styleguide/blob/baceafacc9e32a863987dad06da5a6654b387d6b/scripts/vendor-workspace.mjs) copia módulos do template; o README descreve reconciliação de imports, propriedades e providers durante atualizações. | O catálogo preserva a implementação explorada, mas sua manutenção ainda depende de sincronização de código. |
| [main.tsx](https://github.com/vtex/aiw-styleguide/blob/baceafacc9e32a863987dad06da5a6654b387d6b/src/main.tsx) carrega os estilos do template depois do Shoreline; [theme.css](https://github.com/vtex/aiw-styleguide/blob/baceafacc9e32a863987dad06da5a6654b387d6b/app/theme.css) redefine tokens globais. | Parte da linguagem visual permanece em adaptações da aplicação, fora de um tema distribuído pelo Shoreline. |
| [Button CSS](https://github.com/vtex/aiw-styleguide/blob/baceafacc9e32a863987dad06da5a6654b387d6b/components/shoreline/button/button.css) implementa extensões locais com altura, espaçamento e tipografia fixos. | As capacidades reutilizáveis precisam ser tratadas como componentes e tokens da biblioteca. |
| [package.json](https://github.com/vtex/aiw-styleguide/blob/baceafacc9e32a863987dad06da5a6654b387d6b/package.json) oferece build, checagem de tipos e um script próprio; [verify-guide.mjs](https://github.com/vtex/aiw-styleguide/blob/baceafacc9e32a863987dad06da5a6654b387d6b/scripts/verify-guide.mjs) define 20 grupos de verificações, incluindo fidelidade à origem. | O catálogo tem validações. Elas não equivalem à contribuição de componentes para Shoreline com histórias de estados, interação, regressão visual e publicação pelo fluxo da biblioteca. |

A referência normativa é a [Development guideline](https://shoreline.vtex.com/guides/code/development-guideline), complementada pelo [Code styleguide](https://shoreline.vtex.com/guides/code/code-styleguide) e pela [Storybook guideline](https://shoreline.vtex.com/guides/code/storybook-guideline). Essas regras orientam contribuições ao Shoreline. A análise não exige que toda aplicação ou catálogo replique a infraestrutura da biblioteca; identifica o trabalho necessário para promover suas adaptações a componentes compartilhados.

Esta rodada foi uma inspeção de código e documentação, sem nova execução dos testes do Styleguide.

## Camada visual do Agentic UI

O checkout analisado foi [`a01d78536e33bedb619abb0743718701f1b865df`](https://github.com/vtex/ai-agents/tree/a01d78536e33bedb619abb0743718701f1b865df/building-blocks/agentic-ui). O pacote já depende de Shoreline e reúne componentes visuais, estado conversacional e integração com agentes. Seu [ponto de entrada](https://github.com/vtex/ai-agents/blob/a01d78536e33bedb619abb0743718701f1b865df/building-blocks/agentic-ui/src/index.ts) exporta `components`, `ui-protocol`, `sse` e `agent-integration`.

Todos os caminhos a seguir são relativos a `building-blocks/agentic-ui/src`:

| Grupo | Evidência | Tratamento proposto |
| --- | --- | --- |
| Apresentação com poucas dependências de execução | `components/markdown/markdown.tsx`, `components/loader/loader.tsx`, `components/artifact/artifact.tsx` e `components/agent-home.tsx`. Artifact recebe arquivo ou metadados, estado e callback de remoção; não executa upload. | Avaliar APIs, composição, estilos e sobreposições com componentes existentes antes da incorporação ao Shoreline. |
| Apresentação acoplada ao estado da conversa | `components/messages/message.tsx`, `components/reasoning/reasoning.tsx` e `components/canvas/canvas-trigger.tsx` consultam hooks de mensagens, raciocínio ou canvas. | Extrair apresentação controlada por dados, estados e callbacks; manter a conexão ao estado na integração. |
| Composição com dependência indireta | `components/message-composer/index.tsx` monta `MessageComposerQueue`; `message-composer-queue.tsx` consulta fila e envio imediato. | Separar interface da fila e da execução de envio antes da migração. |
| Estado e comunicação | `components/chat/chat-provider.tsx`, `components/chat/use-chat/`, `ui-protocol/`, `sse/open-sse.ts` e `agent-integration/`. | Permanecer fora de Shoreline e consumir seus componentes visuais. |

A proposta é consolidar os componentes de interface reutilizáveis em Shoreline, com Horizon como tema para os consumidores previstos. Agentic UI manterá a integração com conversas, protocolos e serviços. A separação exige desenho de APIs e migração dos consumidores; esta inspeção não afirma que a extração já foi implementada.
