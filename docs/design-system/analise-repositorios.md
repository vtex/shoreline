# Evidências para a RFC Horizon

Análise de código e documentação realizada em 04/10/2026. Este registro sustenta as afirmações sobre a origem do Styleguide, a base atual de Agentic UI e as propostas anteriores de evolução do design system.

## Origem e práticas do AIW Styleguide

O checkout analisado foi [`baceafacc9e32a863987dad06da5a6654b387d6b`](https://github.com/vtex/aiw-styleguide/tree/baceafacc9e32a863987dad06da5a6654b387d6b). O histórico começa em 21/09/2026, mesma data do [PR #1 — Publicar styleguide autônomo](https://github.com/vtex/aiw-styleguide/pull/1). O [README](https://github.com/vtex/aiw-styleguide/blob/baceafacc9e32a863987dad06da5a6654b387d6b/README.md) descreve um catálogo visual integrado ao `ai-workspace-shell-template`. Seu caráter de iniciativa conjunta de Design e Engenharia foi informado pelo proponente da RFC.

| Evidência | Implicação para a proposta |
| --- | --- |
| [vendor-workspace.mjs](https://github.com/vtex/aiw-styleguide/blob/baceafacc9e32a863987dad06da5a6654b387d6b/scripts/vendor-workspace.mjs) copia módulos do template; o README descreve reconciliação de imports, propriedades e providers durante atualizações. | O catálogo preserva a implementação explorada, mas sua manutenção ainda depende de sincronização de código. |
| [main.tsx](https://github.com/vtex/aiw-styleguide/blob/baceafacc9e32a863987dad06da5a6654b387d6b/src/main.tsx) carrega os estilos do template depois do Shoreline; [theme.css](https://github.com/vtex/aiw-styleguide/blob/baceafacc9e32a863987dad06da5a6654b387d6b/app/theme.css) redefine tokens globais. | Parte da linguagem visual permanece em adaptações da aplicação, fora de um tema distribuído pelo Shoreline. |
| [Button CSS](https://github.com/vtex/aiw-styleguide/blob/baceafacc9e32a863987dad06da5a6654b387d6b/components/shoreline/button/button.css) implementa extensões locais com altura, espaçamento e tipografia fixos. | As capacidades reutilizáveis precisam ser tratadas como componentes e tokens da biblioteca. |
| [package.json](https://github.com/vtex/aiw-styleguide/blob/baceafacc9e32a863987dad06da5a6654b387d6b/package.json) oferece build, checagem de tipos e um script próprio; [verify-guide.mjs](https://github.com/vtex/aiw-styleguide/blob/baceafacc9e32a863987dad06da5a6654b387d6b/scripts/verify-guide.mjs) define 20 grupos de verificações, incluindo fidelidade à origem. | O catálogo tem validações. Elas não equivalem à contribuição de componentes para Shoreline com histórias de estados, interação, regressão visual e publicação pelo fluxo da biblioteca. |

A referência normativa é a [Development guideline](https://shoreline.vtex.com/guides/code/development-guideline), complementada pelo [Code styleguide](https://shoreline.vtex.com/guides/code/code-styleguide) e pela [Storybook guideline](https://shoreline.vtex.com/guides/code/storybook-guideline). Essas regras orientam contribuições ao Shoreline. A análise não exige que toda aplicação ou catálogo replique a infraestrutura da biblioteca; identifica o trabalho necessário para promover suas adaptações a componentes compartilhados.

Na proposta Horizon, o AIW Styleguide tem papel transitório de inventário e apoio à discussão visual. Os componentes, exemplos e orientações aprovados deverão ser incorporados ao Shoreline, que assumirá a fonte de verdade visual e de implementação. A transição deve encerrar a manutenção paralela dos conteúdos absorvidos, preservando seu histórico como evidência.

Esta rodada foi uma inspeção de código e documentação, sem nova execução dos testes do Styleguide.

## Base atual do Agentic UI

O checkout analisado foi [`a01d78536e33bedb619abb0743718701f1b865df`](https://github.com/vtex/ai-agents/tree/a01d78536e33bedb619abb0743718701f1b865df/building-blocks/agentic-ui). O pacote já depende de Shoreline e reúne componentes visuais, estado conversacional e integração com agentes. Seu [ponto de entrada](https://github.com/vtex/ai-agents/blob/a01d78536e33bedb619abb0743718701f1b865df/building-blocks/agentic-ui/src/index.ts) exporta `components`, `ui-protocol`, `sse` e `agent-integration`.

Todos os caminhos a seguir são relativos a `building-blocks/agentic-ui/src`:

| Grupo | Evidência | Implicação para a revisão |
| --- | --- | --- |
| Apresentação com poucas dependências de execução | `components/markdown/markdown.tsx`, `components/loader/loader.tsx`, `components/artifact/artifact.tsx` e `components/agent-home.tsx`. Artifact recebe arquivo ou metadados, estado e callback de remoção; não executa upload. | Inventariar apresentação, composição e estados a alinhar à linguagem de Horizon. |
| Apresentação acoplada ao estado da conversa | `components/messages/message.tsx`, `components/reasoning/reasoning.tsx` e `components/canvas/canvas-trigger.tsx` consultam hooks de mensagens, raciocínio ou canvas. | O alinhamento visual precisa considerar as dependências atuais de estado e integração. |
| Composição com dependência indireta | `components/message-composer/index.tsx` monta `MessageComposerQueue`; `message-composer-queue.tsx` consulta fila e envio imediato. | Documentar a experiência esperada da fila e das ações; coordenar sua disponibilidade com a base conversacional. |
| Estado e comunicação | `components/chat/chat-provider.tsx`, `components/chat/use-chat/`, `ui-protocol/`, `sse/open-sse.ts` e `agent-integration/`. | Horizon não redefine runtime ou transporte. As necessidades de interface devem ser coordenadas com os mantenedores da base conversacional. |

Esse inventário descreve o checkout atual, anterior à organização explorada nas branches abaixo. Horizon contribui com a linguagem visual e os critérios de UI/UX a aplicar às capacidades reutilizáveis, considerando as propostas relacionadas sem fixar uma organização de pacotes.

## Intenção anterior de evolução do design system

A [RFC 22 — Shoreline AI](https://docs.google.com/document/d/143oF_o2zd0ZshTpSHODT2nKLd0xrcN_a1CtBafF3wPg/edit?tab=t.z8qccnajlshl), na versão 0.1 e com status **Proposal in progress**, já registrava a intenção de evoluir o Shoreline para atender às novas interfaces do AI Workspace. Propunha uma base comum para Design, Engenharia e agentes de IA, com padrões de componentes e composição, documentação estruturada, instruções e skills. O texto previa aproveitar e evoluir a base existente.

Essa versão inicial não teve continuidade, conforme informado pelo proponente de Horizon. Ela documenta o antecedente da necessidade; suas alternativas de arquitetura e compatibilidade não são decisões aprovadas nem premissas desta RFC. Horizon delimita a construção do tema, a linguagem visual compartilhada e o ferramental de contribuição, com o Styleguide como apoio transitório.

## Relação com a RFC 34

A [RFC 34 — Shoreline AI on Assistant-UI primitives](https://docs.google.com/document/d/143oF_o2zd0ZshTpSHODT2nKLd0xrcN_a1CtBafF3wPg/edit?tab=t.w0e99t24yluz), consultada com status **In review**, propõe separar apresentação, renderização, estado e protocolo. Seu desenho inclui `@vtex/shoreline-ai` como superfície pública de componentes e APIs conversacionais, Assistant-UI como motor de estado e mecânicas de conversa, e Agentic UI como integração com os serviços VTEX. Trata-se de uma possibilidade em discussão; a necessidade de criar um novo pacote permanece em aberto para a evolução do Shoreline. A RFC 34 deixa a migração dos consumidores existentes fora de seu escopo e prevê seu acompanhamento separado.

Foram consultadas via GitHub as branches `feat/poc-shoreline-ai` de Shoreline, no commit [`7f3e12fc451d0eb3b8970ef371e8f40ef90537df`](https://github.com/vtex/shoreline/tree/7f3e12fc451d0eb3b8970ef371e8f40ef90537df), e `feat/shoreline-ai-poc` de ai-agents, no commit [`6a483fdfd25efb1030829a015db6de415c9fc0ec`](https://github.com/vtex/ai-agents/tree/6a483fdfd25efb1030829a015db6de415c9fc0ec).

| Evidência | Consequência para Horizon |
| --- | --- |
| O [ponto de entrada de Shoreline AI](https://github.com/vtex/shoreline/blob/7f3e12fc451d0eb3b8970ef371e8f40ef90537df/packages/shoreline-ai/src/index.ts) exporta componentes de conversa, hooks, provider e runtime builder. | O experimento oferece referências de capacidades reutilizáveis. Sua organização em pacote não é uma exigência de Horizon. |
| [useRuntime](https://github.com/vtex/shoreline/blob/7f3e12fc451d0eb3b8970ef371e8f40ef90537df/packages/shoreline-ai/src/runtime/use-runtime.ts) usa `useLocalRuntime` de Assistant-UI. O [adaptador VTEX](https://github.com/vtex/ai-agents/blob/6a483fdfd25efb1030829a015db6de415c9fc0ec/building-blocks/agentic-ui/src/ui-protocol/runtime/provider.tsx) conecta transporte e serviços específicos. | O experimento explora uma divisão de responsabilidades. Horizon mantém essa escolha fora do escopo e trata apenas de seus efeitos na experiência da interface. |
| [AIComposerSend](https://github.com/vtex/shoreline/blob/7f3e12fc451d0eb3b8970ef371e8f40ef90537df/packages/shoreline-ai/src/components/composer/ai-composer-send.tsx) combina primitivas de Assistant-UI com IconButton do Shoreline. | Aproveitar a composição existente e revisar sua aparência, os estados e a acessibilidade junto aos demais controles. |
| O [CSS do composer](https://github.com/vtex/shoreline/blob/7f3e12fc451d0eb3b8970ef371e8f40ef90537df/packages/shoreline-ai/src/styles/components/ai-composer.css) já usa camadas, atributos e tokens de Shoreline, mas também contém dimensões fixas, escolhas diretas de escala de cor e pendências de tokenização. | Alinhar tokens semânticos, dimensões e estados ao Horizon e validar as composições. A presença dos tokens não comprova compatibilidade completa com o tema. |

### Escopo complementar

Horizon propõe um tema e uma linguagem visual compartilhada entre interfaces administrativas gerais e conversacionais, com implementação, documentação e exemplos consolidados no Shoreline. O Styleguide apoia a transição; o ferramental orienta contribuições pelos padrões do design system. As RFCs 22 e 34 são antecedentes e discussões relacionadas. A organização das capacidades visuais será avaliada com os mantenedores; criar um novo pacote não é requisito para evoluir o design system.

Assistant-UI, AG-UI, A2A, A2UI, AI SDK e OpenCode aparecem na discussão arquitetural da RFC 34. Esta revisão não verifica a compatibilidade de cada integração nem a transforma em requisito de Horizon. O recorte de streaming em Horizon é a experiência percebida: apresentação progressiva, processamento, ações disponíveis, interrupção e erro. Contratos de eventos, transporte, persistência e execução permanecem na evolução da base conversacional.

A consulta foi documental e de código. As branches indicam o desenho em exploração; não comprovam publicação, aprovação da RFC ou aplicação automática de Horizon aos componentes. A validação visual das capacidades incorporadas permanece uma entrega a realizar.
