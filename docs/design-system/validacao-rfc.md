# Registro de validação — RFC Horizon v1.0

Data: 3 de outubro de 2026 (America/Recife). Branch: `feat/horizon-theme-rfc`. Base da execução registrada: `36d79334884227f9e4ddf3c45294f48214f30892`. Status: demonstração para revisão; sem aprovação para merge/release ou aceite de baseline.

## Escopo da demonstração técnica

A demonstração explora seleção de tema, tokens semânticos, APIs compartilhadas e comparação com Sunrise. Button e IconButton são os exemplos implementados, com API aditiva (`shape`, `small`, `success`, `outline`) e tokens específicos de Horizon. As imagens são capturas do [preview executável](preview/README.md), e suas decisões visuais permanecem propostas experimentais para discussão do tema.

Os resultados abaixo registram a execução de 3 de outubro de 2026. A organização editorial como proposta inicial v1.0 não representa uma nova execução dos checks nem aprovação de Design, merge ou release.

Revisão independente encontrou e corrigiu a resolução antecipada de aliases em `:root`, que poderia quebrar overrides locais Sunrise. Os consumidores usam fallbacks para resolver os tokens semânticos no contexto original; Horizon define seus tokens específicos. A story `components-button-tests--local-overrides` verifica cor, fonte, tracking, padding e foco locais.

## Checks executados

| Check | Resultado |
| --- | --- |
| `pnpm build` | Passou: 6 tarefas, incluindo distribuição ESM/CJS, declarações e CSS. |
| `pnpm exec vitest run` | Passou: 189 testes em 32 arquivos; inclui 10 testes novos de Button/IconButton. |
| `pnpm ds:test` | Passou: 100/100. O inventário de tokens foi atualizado para os overrides escopados. |
| `pnpm lint-fix` | Passou: 1.138 arquivos verificados; sem correções pendentes na execução final. |
| `pnpm ds themes` e `pnpm ds tokens --components` | Sunrise e Horizon reconhecidos; auditoria sem diagnósticos. |
| `pnpm ds check --base 36d79334884227f9e4ddf3c45294f48214f30892 --lint` | Passou; contratos continuam draft. |
| TypeScript do escopo Button/IconButton | Passou, incluindo runtime, stories e testes. |
| `pnpm exec tsc --noEmit --project packages/shoreline/tsconfig.json` | Falhou em 8 diagnósticos fora dos arquivos alterados de componentes; detalhamento abaixo. |
| `pnpm ds:visual:build` | Passou: 2 temas × 2 viewports × 51 Show = 204 cenários. |
| `pnpm ds:visual:check` | Não validou: Chromium pinado indisponível neste ambiente. Não há aceite de baselines. |
| `SHORELINE_VISUAL_CHANNEL=chrome pnpm ds:visual:capture` | Matriz completa executada: 168 passaram; 36 falharam por axe; zero cenários ignorados. Modo diagnóstico, sem comparação de baseline. |

O build de distribuição e a checagem global de tipos têm escopos distintos: o primeiro não implica que todos os arquivos de stories/testes passaram em `tsc --noEmit`.

## Interações e comparação visual

Button e IconButton passaram nos **8 cenários Show** (2 componentes × 2 temas × desktop/mobile), todos sem violações axe detectadas. A matriz inclui 7 variantes, 3 tamanhos, 2 formas e estados disabled/loading. Esses resultados não representam validação completa de acessibilidade.

As stories de interação `horizon-api` dos dois componentes exercitam Tab, Enter, Espaço, mudança para loading, `aria-busy` e bloqueio de novas ativações. A regressão `local-overrides` compara estilos computados com referências locais. A execução no navegador foi conferida pelo painel Interactions do Storybook nos dois temas. No preview, também foram exercitados clique e foco visível por teclado.

O diagnóstico completo usa macOS arm64, Node 22.23.1, Playwright 1.44.1, axe 4.9.1 e Chrome. O ambiente canônico previsto pelo runbook é Linux/Chromium pinado. Não foram criadas, aceitas ou substituídas baselines. O fingerprint registrado para aquela execução da matriz foi `50aef3413ed7a383e71f2c02136d23f795a9c666dccfee6cc24b3bfc154de42c`.

As 36 falhas se distribuem por 9 Show, nos quatro pares tema/viewport: chart-tooltip, confirmation-modal, date-picker, date-range-picker, input, modal, select, text e textarea. A distribuição coincide com o diagnóstico anterior preservado em [demonstração técnica](demonstracao-tecnica.md); não foi tratada como aceite da proposta.

## Pendências fora da PoC

- O `tsc` global encontra incompatibilidade de evento no teste de collection, variável sem uso em empty-state, nulabilidade em range-calendar, parâmetro implícito em search, dois estados incompatíveis com readonly em select, props de theme-builder e declaração ausente para theme-registry.cjs. Esses arquivos não foram modificados no escopo técnico registrado.
- Corrigir as falhas axe da matriz geral; executar o gate no ambiente canônico, revisar todos os diffs e obter aprovação humana das baselines.
- Medir o piso constitucional de cobertura por pacote e executar CI remota.
- Completar revisão de Design, tecnologias assistivas e integrações reais de AI Workspace, Studio e template de Design.

## Verificação documental registrada

Na execução registrada, o Google Docs foi conferido em formato sem páginas, com metadados em tabela, título/seções rosa, subtítulos cinza e corpo cinza, seguindo o documento de referência. Foram verificados texto integral, ordem das seções, presença de duas imagens, largura e legibilidade. Essa conferência descreve o documento observado naquela execução; a edição editorial da proposta inicial requer sua própria conferência após publicação.

Os logs brutos daquela execução permanecem nos diretórios históricos `artifacts/horizon-rfc-v2` e `artifacts/design-system/visual`; são artefatos ignorados pelo Git. O nome do diretório histórico não indica a versão editorial desta proposta. Este registro e o preview versionado permitem reproduzir os checks sem publicar dados de sessão do navegador.
