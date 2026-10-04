# RFC: Shoreline Horizon

| Created | 03/10/2026 | Status | Draft |
| --- | --- | --- | --- |
| Version | 1.0 | Creators | William Cunha |

## Changelog

03/10/2026 · **1.0** — Proposta inicial.

## Contexto e problema

O **[Shoreline](https://github.com/vtex/shoreline)** fornece componentes e tokens para interfaces administrativas da VTEX. O [AI Workspace](https://github.com/vtex/admin-platform/tree/7bb6cb122dd5ee45cc1bc0031a84fb8b9a130508/ai-workspace/shell) o combina com **[Agentic UI](https://github.com/vtex/ai-agents/tree/a01d78536e33bedb619abb0743718701f1b865df/building-blocks/agentic-ui)** nas experiências conversacionais, mas mantém **sobrescritas de estilos e tokens e adaptações visuais dentro da aplicação**. O Studio precisará de uma interface similar.

Design explora interfaces no [ai-workspace-shell-template](https://github.com/vtex/ai-workspace-shell-template), que já diverge da aplicação oficial no [Admin Platform](https://github.com/vtex/admin-platform). Recentemente, Design e Engenharia criaram o [AIW Styleguide](https://github.com/vtex/aiw-styleguide) a partir desse template para catalogar seus componentes. O catálogo preserva cópias e adaptações locais que ainda precisam seguir o [fluxo de contribuição do Shoreline](https://shoreline.vtex.com/guides/code/development-guideline) para se tornarem componentes compartilhados.

**Manter essas adaptações em cada projeto não escala:** duplica implementação, dificulta correções e exige reconstruir no produto decisões já exploradas por Design. Precisamos de uma base visual reutilizável entre AI Workspace, Studio e os templates, com implementação e referência visual alinhadas.

A [RFC 22](https://docs.google.com/document/d/143oF_o2zd0ZshTpSHODT2nKLd0xrcN_a1CtBafF3wPg/edit?tab=t.z8qccnajlshl) já apontava a evolução do Shoreline como base comum para Design, Engenharia e agentes de IA. A [RFC 34](https://docs.google.com/document/d/143oF_o2zd0ZshTpSHODT2nKLd0xrcN_a1CtBafF3wPg/edit?tab=t.w0e99t24yluz) discute a separação da interface conversacional das integrações do Agentic UI. Ambas são referências para esta proposta.

### Papel do Styleguide

A expectativa é que o [AIW Styleguide](https://github.com/vtex/aiw-styleguide) se consolide como **fonte da verdade visual** de componentes, estados, composições e orientações de uso. Como referência para Design e Engenharia, seus exemplos precisam refletir a implementação distribuída pelo design system e acompanhar sua evolução.

## Objetivos

- Unificar a linguagem visual das novas interfaces administrativas da VTEX, começando pelos componentes gerais e conversacionais de AI Workspace e Studio.
- Permitir que interfaces exploradas por Design reutilizem a implementação disponível nos produtos.
- Aplicar as boas práticas do Shoreline — tokens, composição, documentação, testes e revisão — para garantir acessibilidade, escalabilidade e manutenção da base compartilhada.
- Facilitar contribuições de pessoas e agentes de IA, reduzindo sobrescritas locais.

## Não objetivos

- Construir um design system do zero, criar forks por produto ou migrar todas as interfaces de uma vez.
- Escolher o motor de conversa, como Assistant-UI, ou redesenhar runtime, estado das mensagens e mecanismos de edição e regeneração.
- Definir protocolos, transporte e execução de streaming, autenticação, histórico ou uploads.
- Centralizar regras de negócio e integrações específicas dos produtos.

As questões de arquitetura conversacional são discutidas na [RFC 34](https://docs.google.com/document/d/143oF_o2zd0ZshTpSHODT2nKLd0xrcN_a1CtBafF3wPg/edit?tab=t.w0e99t24yluz), ainda em revisão. Nas experiências conversacionais, Horizon trata da apresentação dos estados e ações, dos padrões de interação e da acessibilidade.

## Proposta

### Um novo tema: Horizon

Propomos construir **Horizon como um novo tema do [Shoreline](https://github.com/vtex/shoreline)** para as novas interfaces administrativas da VTEX, começando por AI Workspace, Studio e templates e protótipos de Design. Horizon significa horizonte e mantém a referência de paisagem de Shoreline e Sunrise.

O tema reunirá decisões de cor, tipografia, espaçamento, formas, superfícies e estados. **Shoreline será a fonte da verdade da implementação**, distribuindo componentes e tema com versão, documentação e critérios de qualidade compartilhados.

A evolução inclui incorporar ao design system as capacidades visuais reutilizáveis hoje mantidas no Agentic UI. Sua organização será definida com os mantenedores, **sem pressupor a criação de um novo pacote**.

### Do protótipo ao projeto oficial

Necessidades identificadas no template ou nos produtos serão revisadas por Design e Engenharia. As mudanças visuais reutilizáveis entrarão na biblioteca e no Styleguide; após a publicação, os consumidores atualizarão suas versões e removerão as adaptações substituídas. Levar uma interface do protótipo ao produto passa a se concentrar nas integrações e regras de negócio, preservando a apresentação compartilhada.

### Ferramental para construir e evoluir Horizon

A [branch de referência](https://github.com/vtex/shoreline/tree/feat/horizon-theme-rfc) inclui o [ferramental](../../tools/design-system/README.md) para criar e evoluir componentes, tokens e temas pelos padrões do Shoreline, **com apoio de agentes de IA**. Já reúne instruções de descoberta, criação e revisão; contratos de intenção e impacto; e verificações de tokens, arquitetura, comportamento, aparência e acessibilidade.

Os agentes poderão apoiar a implementação e executar as verificações. Design e Engenharia definirão os critérios e aprovarão os resultados. Uma fila compartilhada organizará prioridades e responsáveis pela revisão e publicação.

### Exemplos visuais

As imagens comparam Button e IconButton em Sunrise e Horizon.

![Comparação de Button nos temas Sunrise e Horizon.](assets/button-comparison.png)

*Figura 1. Button: raios, tipografia, largura conforme conteúdo, forma arredondada, contorno e sucesso. As novas opções são compartilhadas pelos dois temas.*

![Comparação de IconButton nos temas Sunrise e Horizon.](assets/icon-button-comparison.png)

*Figura 2. IconButton: forma padrão ou circular, opção compacta e estados desabilitado e carregando.*

A cobertura avançará por formulários, navegação, conteúdo e dados, feedback e sobreposições, conforme as prioridades dos consumidores.

### Consumo nos projetos

A aplicação selecionará o tema na entrada e continuará usando os componentes do Shoreline:

```tsx
import '@vtex/shoreline/themes/horizon'
import { Button } from '@vtex/shoreline'

export function Example() {
  return <Button variant="primary">Continuar</Button>
}
```

Esse ponto de entrada está disponível na [branch de referência](https://github.com/vtex/shoreline/tree/feat/horizon-theme-rfc). A distribuição seguirá o processo de publicação do Shoreline, com adoção gradual.

## Adoção e critérios de aceite

- **Design:** definir a linguagem visual e os critérios de uso.
- **Mantenedores do Shoreline:** implementar, revisar e distribuir a base compartilhada, em colaboração com os mantenedores do Agentic UI nas capacidades conversacionais.
- **Times consumidores:** adotar essa base no template e nos produtos, mantendo suas integrações e jornadas específicas.

| Etapa | Resultado esperado |
| --- | --- |
| Alinhar a linguagem | Definir decisões visuais, critérios de uso e interfaces prioritárias de AI Workspace, Studio e Design. |
| Consolidar a base e o ferramental | Evoluir tema e componentes, incorporando instruções para agentes, contratos e verificações ao fluxo de contribuição. |
| Alinhar componentes conversacionais | Aplicar os padrões de Horizon às capacidades visuais do Agentic UI, em conjunto com seus mantenedores. |
| Conectar Styleguide e template | Usar a implementação compartilhada no catálogo e nas explorações de Design. |
| Validar nos produtos | Levar uma interface do template ao AI Workspace e exercitar a mesma base em Studio, combinando controles gerais e conversacionais. |
| Distribuir e ampliar | Publicar versões e ampliar a adoção e a cobertura conforme as prioridades dos consumidores. |

O aceite exige:

- Consistência entre Styleguide, template e produtos, com estados e interações reproduzíveis no catálogo, incluindo processamento, resposta parcial e erro nas experiências conversacionais.
- Testes e revisão visual, incluindo responsividade, contraste, foco, teclado e tecnologias assistivas, pelos critérios do Shoreline.
- Remoção das cópias e sobrescritas substituídas, com possibilidade de retorno à versão anterior em caso de regressão.
- Aprovação de Design e Engenharia, inclusive para contribuições feitas por agentes.

A branch permite explorar o tema e o ferramental. A adoção depende das revisões e pendências do [registro de validação](validacao-rfc.md) e da verificação nos consumidores.

## Alternativas e riscos

Manter adaptações locais reduz o investimento inicial, mas perpetua a duplicação. Forks ou uma biblioteca independente ampliam a manutenção. Evoluir o Shoreline permite reutilizar componentes e distribuir mudanças aos consumidores.

Os principais riscos são divergências entre produtos e defasagem do catálogo. Tokens compartilhados, atualização conjunta da implementação e dos exemplos e validação em interfaces reais devem orientar a adoção gradual.

## Questões para revisão

1. Concordamos com Horizon como tema e linguagem visual compartilhada para essas interfaces?
2. Quais componentes, estados e composições devem orientar o primeiro ciclo de adoção?
3. Como dividir prioridades, revisão e publicação entre Design, mantenedores e times consumidores, mantendo o Styleguide alinhado?

## Referências

- [Shoreline](https://github.com/vtex/shoreline) e [documentação](https://shoreline.vtex.com).
- [AI Workspace no Admin Platform](https://github.com/vtex/admin-platform/tree/7bb6cb122dd5ee45cc1bc0031a84fb8b9a130508/ai-workspace/shell).
- [Template de Design](https://github.com/vtex/ai-workspace-shell-template/tree/a287ee816d06b0b4325da3ea64b22675ff820ce4) e [AIW Styleguide](https://github.com/vtex/aiw-styleguide/tree/baceafacc9e32a863987dad06da5a6654b387d6b).
- [Agentic UI](https://github.com/vtex/ai-agents/tree/a01d78536e33bedb619abb0743718701f1b865df/building-blocks/agentic-ui).
- [RFC 22 — Shoreline AI](https://docs.google.com/document/d/143oF_o2zd0ZshTpSHODT2nKLd0xrcN_a1CtBafF3wPg/edit?tab=t.z8qccnajlshl): proposta inicial de evolução do design system.
- [RFC 34 — Shoreline AI on Assistant-UI primitives](https://docs.google.com/document/d/143oF_o2zd0ZshTpSHODT2nKLd0xrcN_a1CtBafF3wPg/edit?tab=t.w0e99t24yluz): discussão sobre a base conversacional, ainda em revisão.
- [Development guideline](https://shoreline.vtex.com/guides/code/development-guideline), [Code styleguide](https://shoreline.vtex.com/guides/code/code-styleguide) e [Constituição](https://github.com/vtex/shoreline-specs/blob/main/.specify/memory/constitution.md).
- [Análise dos repositórios](analise-repositorios.md): evidências e propostas anteriores.
- [Branch Horizon](https://github.com/vtex/shoreline/tree/feat/horizon-theme-rfc), [preview](preview/README.md) e [ferramental](../../tools/design-system/README.md).
