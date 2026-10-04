# RFC: Horizon — um tema do Shoreline

| Criada em | 03/10/2026 | Status | Em revisão |
| --- | --- | --- | --- |
| Versão atual | 0.2 | Proponente | William Cunha |

Revisores propostos: Design System, AI Workspace, Studio e Design. Responsáveis a confirmar.

## Changelog

03/10/2026 · **0.2** — comparação com Sunrise usando Button e IconButton reais; referências de Studio verificadas no Figma; separação entre evidência de Design, adaptações e hipóteses.

03/10/2026 · **0.1** — proposta inicial e inventário da demonstração existente.

## Resumo

Propomos construir **Horizon como um tema adicional do Shoreline**, para o **AI Workspace, o Studio e os templates e protótipos dos times de Design**. A apresentação será definida por tokens e CSS do tema. A API React, o comportamento e os recursos de acessibilidade continuarão compartilhados no Shoreline.

A decisão solicitada é aprovar essa direção e um piloto com Button e IconButton. Sunrise continuará como padrão; a adoção de Horizon será explícita por consumidor. A [branch de referência](https://github.com/vtex/shoreline/tree/feat/horizon-theme-rfc) contém uma **prova de conceito para revisão**, incluindo o trabalho antes não commitado. Aprovar esta RFC não significa aprovar todo o diff, publicar o pacote ou migrar os produtos.

## Não objetivos

Este ciclo não pretende substituir Sunrise, criar outra biblioteca React, migrar todas as telas, homologar dark mode ou incorporar automaticamente todos os wrappers e tokens das aplicações. Composer, Conversation, navegação e regras de negócio permanecem responsabilidades dos produtos. O ferramental experimental apoia a proposta, mas não constitui o objetivo da RFC.

## Motivação

AI Workspace e os templates já adaptam Shoreline por meio de tokens, overrides e wrappers. Design precisa demonstrar a experiência desejada, enquanto os produtos precisam reproduzi-la com comportamento consistente. Manter essas decisões em cada aplicação aumenta a possibilidade de divergência.

Horizon propõe uma fonte versionada para a apresentação reutilizável. O piloto deverá demonstrar redução de overrides e aproximação entre Design e implementação; esses benefícios ainda não foram medidos.

### Evidências e limites das fontes

| Fonte | O que já existe | Consequência para a proposta |
| --- | --- | --- |
| AI Workspace | Wrappers de Button/IconButton, shape rounded e tom success; tema com cinzas azulados e azul #1E4EE5. | Há necessidades compartilháveis, mas não uma especificação final de Horizon. |
| AIW Styleguide | Catálogo do shell template, com toolbarOutline e intenção de tamanho 32 px; versões diferentes de Shoreline e Agentic UI. | Usar como evidência complementar. O arquivo sl-theme.css legado está inativo. |
| Studio no Figma | Botão primário azul #0366DD, raio 12 px, Inter 14/24, peso 550; ações de adicionar e enviar de 36 px, a segunda circular. | Referência visual verificada para os exemplos desta RFC, restrita aos frames consultados. |
| Shoreline | Componentes compartilhados; experimento de Horizon e infraestrutura de temas. | Evoluir a demonstração por contratos e testes, preservando o comportamento padrão de Sunrise. |

As fontes **não são equivalentes nem totalmente convergentes**. O Figma de Studio preserva o azul #0366DD; o tema atual do AI Workspace usa outro azul. A PoC aplica a referência Studio aos controles demonstrados, sem declarar aprovada uma paleta única para todo Horizon. Os snapshots e nós específicos estão nas referências.

## Proposta

### Tema explícito, implementação compartilhada

Horizon pertencerá a `@vtex/shoreline`, em `src/themes/horizon`, usando o motor de CSS existente. Reset e base serão compartilhados. A herança de regras e tokens Sunrise deverá ser revisada por componente: uma mudança compartilhada exige verificar os dois temas.

```tsx
import '@vtex/shoreline/themes/horizon'
import { Button, IconButton, IconArrowUp } from '@vtex/shoreline'

<Button variant="primary" shape="rounded">Criar tarefa</Button>
<IconButton label="Enviar mensagem" variant="primary" shape="rounded">
  <IconArrowUp />
</IconButton>
```

O export de tema existe na branch experimental; não se afirma disponibilidade na versão publicada. `@vtex/shoreline/css` continua selecionando Sunrise. Os estilos usam `:root` e seletores globais: deve haver **um tema completo por documento**. A comparação abaixo usa iframes isolados. Convivência na mesma árvore, incluindo portais, precisa de uma solução própria antes de ser prometida.

### Button: comparação com o que existe

![Button: comparação de Sunrise existente com Horizon proposto.](assets/button-comparison.png)

*Figura 1. Componentes React reais, com o CSS compilado de cada tema. As primeiras linhas comparam os mesmos controles; as seguintes mostram extensões ausentes na API anterior. Ampliação de 1,5× para leitura. A imagem é evidência da implementação experimental, não aceite de Design.*

| Decisão | Sunrise existente | Horizon demonstrado |
| --- | --- | --- |
| Primário | Azul #0366DD; raio 8 px. | Mesmo azul; raio 12 px. A mudança não é uma troca arbitrária de cor. |
| Tipografia padrão | Inter 14/20; peso 600. | Inter 14/24; peso 550; tracking −0,17 px, conforme Studio. |
| Dimensões | Normal 36 px, large 44 px; largura mínima 100 px. | Mantém 36/44 px; largura ajustada ao conteúdo. Acrescenta small de 32 px. |
| Forma | Forma padrão. | Padrão e rounded explícito; rounded não se torna o default. |
| Extensões | Cinco variantes existentes. | Preserva as cinco; propõe success e outline com API tipada. |

A API proposta acrescenta `shape="rounded"`, `size="small"`, `variant="success"` e `variant="outline"` aos componentes compartilhados. As opções funcionam nos dois temas; os defaults existentes continuam `secondary`, `normal` e `default`. O exemplo à esquerda limita-se à API anterior para tornar a evolução visível.

### IconButton: forma e área de interação

![IconButton: comparação de Sunrise existente com Horizon proposto.](assets/icon-button-comparison.png)

*Figura 2. Adicionar compara a forma padrão; Enviar compara a ação existente com a composição circular proposta; Compacto demonstra a extensão de 32 px. Desabilitado e carregando são estados reais, com a animação pausada para captura. Todos os controles têm nome acessível.*

IconButton compartilha variantes, tamanhos, forma e estados de Button. O padrão Horizon é 36 × 36 px com raio 12 px; `shape="rounded"` produz o círculo visto na ação de enviar do Studio. Os ícones continuam com 20 px. O estado loading mantém a área e impede nova ativação. A matriz no Storybook também cobre os tamanhos 32 e 44 px e as variantes críticas.

### O que foi adaptado — e precisa de revisão

O [botão primário de Studio](https://www.figma.com/design/9H5oTQK9dmft7JCoOkSLgx/FastStore-AI-Native-Vision?node-id=4702-3895) mede 37 px, incluindo a borda. A PoC normaliza a altura para 36 px e mantém a implementação sem essa borda, para compatibilidade com o contrato atual. Portanto, não se declara equivalência pixel a pixel.

O contorno compacto vem do **toolbarOutline do styleguide**: 32 px, peso 500 e tracking −0,28 px. Ele não representa o botão de sugestão de Studio, que tem 37 px, peso 450 e sombra. Os controles de canvas de 28 px também não entram no piloto como um tamanho universal.

O sucesso usa verde mais escuro que o wrapper de origem: branco sobre green-9 resulta em aproximadamente 4,10:1; a proposta usa green-10, aproximadamente 5,33:1. O CSS de contorno também corrige usos inválidos de tokens de borda e foco encontrados na referência. O foco de Horizon recebe anéis de maior contraste, preservando o foco existente de Sunrise.

Os frames consultados não especificam a matriz completa de hover, pressionado, foco, disabled e loading. Esses estados são **comportamentos herdados ou propostas de Engenharia**, sujeitos à revisão de Design e acessibilidade. Não constituem uma especificação aprovada pelo Figma.

## Adoção e critérios de aceite

| Etapa | Entrega esperada | Responsabilidade proposta |
| --- | --- | --- |
| Alinhar fundações | Resolver divergência de paleta, validar tokens semânticos e fechar estados do piloto. | Design + Design System. |
| Validar controles | Aprovar Button/IconButton, API e diferenças intencionais; revisar Sunrise e Horizon isoladamente. | Design System + Engenharia. |
| Exercitar consumidores | Um fluxo de AI Workspace com Agentic UI, um fluxo de Studio e um template de Design usando o mesmo pacote. | Cada time confirma fluxo e responsável. |
| Ampliar e distribuir | Incluir um campo e um overlay para testar erro, foco e portais; definir versão, migração gradual e rollback. | Mantenedores e times consumidores. |

O aceite para publicação exige build, tipos, lint, testes de unidade e interação; cobertura mínima constitucional por pacote; todos os Show nos temas e viewports previstos; revisão de contraste, teclado, foco, zoom, nomes acessíveis e tecnologias assistivas; baselines visuais revisadas e aprovação de Design e Engenharia. Capturas locais não substituem esses critérios.

No piloto, registrar versões realmente consumidas, overrides removidos ou mantidos, divergências encontradas e esforço para criar o template. Não definir datas antes da estimativa e da confirmação de responsáveis.

## Alternativas e riscos

Manter wrappers por produto reduz o investimento inicial, mas conserva decisões duplicadas. Criar outra biblioteca duplica API, comportamento e manutenção. Substituir Sunrise amplia o impacto antes de validar os consumidores. Recomendamos o tema adicional por permitir adoção explícita e aproveitar a infraestrutura existente.

Os principais riscos são a cascata de CSS dos produtos, a herança entre temas e as versões distintas de Shoreline/Agentic UI. O piloto precisa verificar imports, overrides, portais e estilos computados em cada integração. Tokens de layout específico de produto não serão promovidos apenas porque aparecem no inventário.

A branch ainda é uma demonstração ampla. Tema, infraestrutura e correções compartilhadas deverão ser separados em mudanças revisáveis após a decisão. O [registro de validação desta revisão](validacao-rfc-v2.md) distingue checks executados de pendências. Acessibilidade completa, regressão visual canônica e integração dos três consumidores permanecem critérios de aceite, não resultados presumidos.

## Questões para revisão

1. Concordamos com Horizon como tema adicional para os três contextos, mantendo Sunrise como padrão?
2. Qual direção resolve a divergência entre a paleta de AI Workspace e os controles de Studio?
3. Aprovamos a geometria, a tipografia e as adaptações de altura, sucesso e foco demonstradas?
4. Rounded, small, success e outline devem integrar a API compartilhada ou alguma necessidade permanece contextual?
5. Quem responde pelos tokens, pelos três pilotos e pelo aceite? Há necessidade real de dois temas no mesmo documento?

## Referências

- [RFC de referência — LLM Assistant: state of the art](https://docs.google.com/document/d/1ORu3Kz_cwYL_yrtI7wx_YAbU-zzjAausQ2Hzcp8FAiY/edit?tab=t.6u2kbvehd5o9): estrutura, metadados, títulos rosa e corpo cinza em formato sem páginas.
- [Studio — botão primário](https://www.figma.com/design/9H5oTQK9dmft7JCoOkSLgx/FastStore-AI-Native-Vision?node-id=4702-3895), [adicionar](https://www.figma.com/design/9H5oTQK9dmft7JCoOkSLgx/FastStore-AI-Native-Vision?node-id=4705-8286) e [enviar](https://www.figma.com/design/9H5oTQK9dmft7JCoOkSLgx/FastStore-AI-Native-Vision?node-id=4705-8027): frames verificados, sem matriz completa de estados.
- [AI Workspace — snapshot 7bb6cb1](https://github.com/vtex/admin-platform/tree/7bb6cb122dd5ee45cc1bc0031a84fb8b9a130508/ai-workspace/shell): tema ativo e wrappers de Button/IconButton.
- [AIW Styleguide — snapshot baceafa](https://github.com/vtex/aiw-styleguide/tree/baceafacc9e32a863987dad06da5a6654b387d6b): catálogo do template, tema ativo e toolbarOutline.
- [Branch experimental](https://github.com/vtex/shoreline/tree/feat/horizon-theme-rfc), [preview reproduzível](preview/README.md) e [fundações Horizon](../../packages/shoreline/src/themes/horizon/README.md).
- [Constituição](https://github.com/vtex/shoreline-specs/blob/main/.specify/memory/constitution.md), [padrões de engenharia](https://github.com/vtex/shoreline-specs/blob/main/docs/patterns.md) e [runbook](../../tools/design-system/README.md).
