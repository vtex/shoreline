# RFC: Shoreline Horizon

| Created | 03/10/2026 | Status | Draft |
| --- | --- | --- | --- |
| Version | 1.0 | Creators | William Cunha |

## Changelog

03/10/2026 · **1.0** — Proposta inicial.

## Contexto e problema

O **Shoreline** é o design system da VTEX e oferece componentes e tokens reutilizáveis para construir interfaces. No AI Workspace, ele é usado junto ao **Agentic UI**, que fornece componentes e recursos para experiências de conversa com agentes, como mensagens, composição de prompts e interação com ferramentas.

Sobre essa base, o AI Workspace vem desenvolvendo uma linguagem visual para novas experiências da VTEX. Hoje, parte dessa aparência depende de **sobrescritas de estilos e tokens do Shoreline e de adaptações visuais do Agentic UI dentro da aplicação**. O Studio precisará de uma interface similar, ampliando a necessidade de consistência entre os produtos.

Ao mesmo tempo, Design explora interfaces no **ai-workspace-shell-template**, enquanto a aplicação oficial evolui no Admin Platform. O template e o produto mantêm adaptações próprias: uma decisão tomada durante a exploração precisa ser reconciliada e implementada novamente para chegar ao produto. O AIW Styleguide reúne exemplos dessa linguagem, mas ainda precisa se consolidar como referência visual compartilhada.

Reproduzir essas adaptações em cada projeto aumenta a duplicação, o retrabalho e o esforço para manter as interfaces consistentes. A mesma decisão pode ter resultados diferentes no protótipo e no produto, e uma correção precisa ser propagada entre bases independentes. **Esse modelo não escala para a evolução conjunta de AI Workspace, Studio e das interfaces exploradas por Design.**

Precisamos conectar a referência visual usada pelo time à implementação consumida pelos produtos, com um processo comum para propor, revisar e distribuir mudanças.

## Objetivos

- Unificar a linguagem visual das novas interfaces da VTEX, começando por AI Workspace e Studio.
- Reutilizar os componentes e tokens do Shoreline e os recursos conversacionais do Agentic UI, mantendo coerência visual nas interfaces que combinam essas bibliotecas.
- Aproximar exploração e entrega, permitindo que interfaces construídas por Design reutilizem a base disponível no projeto oficial.
- Estabelecer referências compartilhadas e um processo de evolução que reduza sobrescritas locais e permita contribuições de pessoas e agentes de IA.

## Não objetivos

Não faz parte desta proposta construir um design system do zero, criar forks de Shoreline ou Agentic UI por produto, reimplementar suas capacidades ou reescrever todas as interfaces em uma única migração. Também não se pretende padronizar todas as jornadas ou centralizar regras de negócio: cada produto continua responsável por suas integrações e experiências específicas.

## Proposta

### Horizon como base para novas interfaces da VTEX

Propomos construir **Horizon como um tema do Shoreline e a fonte da verdade da implementação visual para novas interfaces da VTEX**, começando pela unificação da linguagem de AI Workspace e Studio e pelo uso nos templates e protótipos de Design.

Horizon reunirá as decisões compartilhadas de cor, tipografia, espaçamento, formas, superfícies e estados. A proposta aproveita os componentes, comportamentos e recursos de acessibilidade do Shoreline, evoluindo suas capacidades conforme as necessidades dos consumidores. As decisões aprovadas serão distribuídas pelo pacote, com versão e documentação, para que possam ser reutilizadas nos produtos.

O Agentic UI continuará fornecendo os componentes e recursos das experiências conversacionais. Sua integração visual com Horizon será evoluída em conjunto com os mantenedores da biblioteca, para que as interfaces que combinam as duas bases expressem a mesma linguagem. As mudanças necessárias nos componentes conversacionais serão tratadas no Agentic UI.

### Styleguide como fonte da verdade visual

A expectativa é que o **AIW Styleguide evolua para a fonte da verdade visual** dessa linguagem: o lugar onde Design e Engenharia consultam a aparência esperada, os estados, as composições e as orientações de uso para construir interfaces coerentes.

Os exemplos do Styleguide deverão usar Shoreline com Horizon e, nas experiências conversacionais, composições com Agentic UI, refletindo a implementação disponível para os produtos. Assim, o Styleguide apresenta e explica a linguagem visual, e as bibliotecas fornecem sua implementação reutilizável. Uma decisão aprovada deve atualizar a implementação e sua referência visual de forma coordenada.

As responsabilidades propostas são:

- **Design:** definir a linguagem visual, os critérios de uso e o resultado esperado nas interfaces.
- **Mantenedores do Shoreline:** consolidar essas decisões em Horizon, revisar as capacidades compartilhadas e manter sua distribuição.
- **Mantenedores do Agentic UI:** evoluir os componentes conversacionais e sua integração com a linguagem visual compartilhada.
- **Styleguide:** tornar as decisões visíveis e consultáveis por meio de exemplos e orientações alinhados ao pacote.
- **Template de Design:** consumir essa base, explorar composições e encaminhar novas necessidades para revisão.
- **AI Workspace e Studio:** adotar a base compartilhada e manter suas integrações e jornadas de produto.

### Do protótipo ao projeto oficial

Uma necessidade identificada no template ou em um produto será discutida com Design e Engenharia. Quando for reutilizável, deverá evoluir Horizon, os componentes do Shoreline ou os recursos do Agentic UI, conforme a responsabilidade afetada, e aparecer no Styleguide. As composições específicas permanecem com os produtos.

Depois da publicação, o template e as aplicações poderão adotar as versões acordadas das bibliotecas. O trabalho de levar uma interface explorada por Design ao projeto oficial passa a se concentrar nas integrações e nas regras do produto, preservando a apresentação compartilhada. As sobrescritas substituídas pelas bibliotecas serão removidas durante a adoção.

### Ferramental para construir e evoluir Horizon

O trabalho que originou a branch de referência inclui **construir o ferramental necessário para criar e evoluir componentes, tokens e temas seguindo as boas práticas do Shoreline, com apoio de agentes de IA (AI agents)**.

Essa estrutura já reúne instruções de descoberta, criação e revisão para agentes; contratos que registram a intenção de cada mudança e seus impactos; e verificações automatizadas de tokens, arquitetura, comportamento, aparência e acessibilidade. O objetivo é tornar as práticas do projeto aplicáveis durante a implementação e produzir resultados que o time consiga revisar.

Com esse contexto, agentes poderão encontrar capacidades existentes, implementar alterações e executar as verificações correspondentes no Shoreline. Design e Engenharia definem os critérios e aprovam o resultado. A consolidação do ferramental acompanhará a construção de Horizon, incluindo a avaliação de contribuições feitas por agentes e a integração das verificações ao fluxo de revisão. Esse fluxo também deverá identificar demandas para o Agentic UI e validar as composições que combinam as duas bibliotecas.

### Exemplos visuais

As imagens comparam Button e IconButton em Sunrise e Horizon.

![Comparação de Button nos temas Sunrise e Horizon.](assets/button-comparison.png)

*Figura 1. Button: raios, tipografia, largura conforme conteúdo, forma arredondada, contorno e sucesso. As novas opções são compartilhadas pelos dois temas.*

![Comparação de IconButton nos temas Sunrise e Horizon.](assets/icon-button-comparison.png)

*Figura 2. IconButton: forma padrão ou circular, opção compacta e estados desabilitado e carregando.*

A cobertura de Horizon avançará por formulários, navegação, conteúdo e dados, feedback e sobreposições, conforme as necessidades dos consumidores.

### Consumo nos projetos

O tema será selecionado na entrada da aplicação, mantendo o uso dos componentes do Shoreline:

```tsx
import '@vtex/shoreline/themes/horizon'
import { Button } from '@vtex/shoreline'

export function Example() {
  return <Button variant="primary">Continuar</Button>
}
```

Esse ponto de entrada está disponível na branch de referência. A distribuição aos consumidores seguirá o processo de publicação do Shoreline, permitindo adoção gradual.

## Adoção e critérios de aceite

Propomos as seguintes etapas, com responsáveis e prioridades acordados entre os times:

| Etapa | Resultado esperado |
| --- | --- |
| Alinhar a linguagem | Definir as decisões visuais compartilhadas, os critérios de uso e as interfaces prioritárias de AI Workspace, Studio e Design. |
| Consolidar a base e o ferramental | Evoluir Horizon e os componentes necessários, com instruções para agentes, contratos e verificações incorporados ao fluxo de contribuição. |
| Conectar Styleguide e template | Apresentar a linguagem no Styleguide e usá-la no template, ambos consumindo a base compartilhada. |
| Validar nos produtos | Levar uma interface representativa do template ao AI Workspace e exercitar a mesma base em Studio, incluindo uma experiência conversacional com Agentic UI e removendo as sobrescritas substituídas. |
| Distribuir e ampliar | Publicar versões, migrar gradualmente e ampliar a cobertura conforme as necessidades dos consumidores. |

O aceite deve demonstrar que uma decisão visual aprovada aparece de forma consistente no Styleguide, no template e nos produtos, incluindo as composições que combinam Shoreline e Agentic UI. O time deve conseguir rastrear essa decisão até os componentes e tokens compartilhados e compreender as diferenças específicas de cada produto.

As contribuições, inclusive as realizadas por agentes, devem apresentar implementação, verificações e exemplos revisáveis. A publicação de Horizon exige atender aos critérios de qualidade do Shoreline, incluindo testes, revisão visual, acessibilidade e aprovação de Design e Engenharia. A adoção deve permitir retorno à versão anterior caso sejam encontradas regressões.

O trabalho disponível na branch já permite explorar o tema e seu ferramental. Para avançar na adoção, ainda será necessário consolidar a revisão visual, resolver as pendências técnicas registradas e validar a integração com os consumidores. O [registro de validação](validacao-rfc.md) reúne as verificações executadas e as pendências.

## Alternativas e riscos

Manter adaptações locais exige menos investimento imediato, mas aumenta o custo de sincronizar cada evolução. Criar forks ou uma biblioteca independente amplia a manutenção de componentes e comportamentos. Evoluir a base compartilhada no Shoreline permite aproveitar o que já existe e distribuir as mudanças entre os consumidores.

Os principais riscos são o Styleguide se afastar da implementação, as bibliotecas evoluírem com diferenças visuais nas interfaces que as combinam e sobrescritas antigas continuarem competindo com Horizon. A proposta reduz esses riscos com responsabilidades claras, exemplos compartilhados e validação de interfaces reais nos produtos. Necessidades específicas de produto devem ser separadas das capacidades reutilizáveis. O apoio de agentes depende de critérios explícitos e revisão do resultado visual e funcional pelo time.

## Questões para revisão

1. Concordamos com Horizon como base de implementação para novas interfaces da VTEX e com o Styleguide como sua referência visual compartilhada?
2. Quais decisões visuais e interfaces de AI Workspace, Studio e do template devem orientar o primeiro ciclo de adoção?
3. Como organizar a contribuição de Design e Engenharia e o uso de agentes para evoluir essa base?
4. Quem mantém o Styleguide, Horizon e o ferramental, e como coordenar sua evolução com os mantenedores do Agentic UI e os times consumidores?

## Referências

- [AI Workspace no Admin Platform](https://github.com/vtex/admin-platform/tree/7bb6cb122dd5ee45cc1bc0031a84fb8b9a130508/ai-workspace/shell): implementação oficial do produto.
- [Template utilizado por Design](https://github.com/vtex/ai-workspace-shell-template/tree/a287ee816d06b0b4325da3ea64b22675ff820ce4): ambiente de exploração de interfaces.
- [AIW Styleguide](https://github.com/vtex/aiw-styleguide/tree/baceafacc9e32a863987dad06da5a6654b387d6b): referência atual para a evolução do catálogo visual.
- [Branch Horizon](https://github.com/vtex/shoreline/tree/feat/horizon-theme-rfc) e [preview executável](preview/README.md).
- [Ferramental de design system](../../tools/design-system/README.md): fluxo de contribuição, instruções para agentes e verificações.
- [Constituição do Shoreline](https://github.com/vtex/shoreline-specs/blob/main/.specify/memory/constitution.md): critérios de contribuição e qualidade.
