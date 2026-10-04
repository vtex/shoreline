# RFC: Shoreline Horizon

| Created | 03/10/2026 | Status | Draft |
| --- | --- | --- | --- |
| Version | 1.0 | Creators | William Cunha |

## Changelog

03/10/2026 · **1.0** — Proposta inicial.

## Contexto e problema

O **[Shoreline](https://github.com/vtex/shoreline)** é um design system voltado à construção de interfaces administrativas e experiências de back-office no VTEX Admin. Sua [documentação](https://shoreline.vtex.com) informa que ele está atualmente disponível para uso interno na VTEX. Ele oferece componentes e tokens reutilizáveis. No [AI Workspace](https://github.com/vtex/admin-platform/tree/7bb6cb122dd5ee45cc1bc0031a84fb8b9a130508/ai-workspace/shell), é usado junto ao **[Agentic UI](https://github.com/vtex/ai-agents/tree/a01d78536e33bedb619abb0743718701f1b865df/building-blocks/agentic-ui)**, que fornece componentes e recursos para experiências de conversa com agentes, como mensagens, composição de prompts e interação com ferramentas.

Sobre essa base, o AI Workspace vem desenvolvendo uma linguagem visual para novas experiências administrativas da VTEX. Hoje, parte dessa aparência depende de **sobrescritas de estilos e tokens do Shoreline e de adaptações visuais do Agentic UI dentro da aplicação**. O Studio precisará de uma interface similar, ampliando a necessidade de consistência entre os produtos.

Recentemente, **Design e Engenharia iniciaram uma proposta de styleguide a partir do [ai-workspace-shell-template](https://github.com/vtex/ai-workspace-shell-template)**, dando origem ao repositório **[aiw-styleguide](https://github.com/vtex/aiw-styleguide)**. A iniciativa torna visíveis os componentes, estados e composições existentes no projeto, para que o time consiga conhecê-los, discutir seu uso e identificar o que precisa evoluir. O template apoia a exploração de interfaces, enquanto o produto oficial é desenvolvido no [Admin Platform](https://github.com/vtex/admin-platform).

A implementação atual do Styleguide ainda carrega adaptações do template e **não segue o processo estabelecido pelo Shoreline para evoluí-las como componentes compartilhados**. Há cópias de componentes, sobrescritas locais de tokens e extensões visuais com valores fixos. O catálogo possui verificações próprias, mas elas têm foco diferente do fluxo de desenvolvimento, documentação, testes, revisão e distribuição descrito na [Development guideline do Shoreline](https://shoreline.vtex.com/guides/code/development-guideline). A lacuna é transformar o que hoje é apresentado pelo catálogo em uma base reutilizável, mantida sob os padrões da biblioteca.

Reproduzir essas adaptações em cada projeto aumenta a duplicação, o retrabalho e o esforço para manter as interfaces consistentes. A mesma decisão pode ter resultados diferentes no protótipo e no produto, e uma correção precisa ser propagada entre bases independentes. **Esse modelo não escala para a evolução conjunta de AI Workspace, Studio e das interfaces exploradas por Design.**

Precisamos conectar a referência visual usada pelo time à implementação consumida pelos produtos, com um processo comum para propor, revisar e distribuir mudanças. A [RFC 34 — Shoreline AI on Assistant-UI primitives](https://docs.google.com/document/d/143oF_o2zd0ZshTpSHODT2nKLd0xrcN_a1CtBafF3wPg/edit?tab=t.w0e99t24yluz) já propõe reorganizar a base conversacional. Esse trabalho cria um ponto de colaboração para alinhar sua interface à linguagem visual dos demais componentes.

## Objetivos

- Unificar a linguagem visual das novas interfaces administrativas da VTEX, começando por AI Workspace e Studio.
- Aplicar uma linguagem visual comum aos componentes gerais do Shoreline e aos componentes conversacionais de Shoreline AI propostos na RFC 34.
- Aplicar as boas práticas do Shoreline — composição, tokens, documentação, testes e revisão — para garantir escalabilidade da base de componentes, acessibilidade, consistência e manutenção entre produtos.
- Aproximar exploração e entrega, permitindo que interfaces construídas por Design reutilizem a base disponível no projeto oficial.
- Ampliar a capacidade de contribuição e dar previsibilidade à evolução da biblioteca, com apoio de agentes de IA e menos sobrescritas locais.

## Não objetivos

Não faz parte desta proposta construir um design system do zero, criar forks por produto ou reescrever todas as interfaces em uma única migração. A escolha do motor de conversa, a organização de runtime e adaptadores e a compatibilidade com protocolos pertencem à discussão da RFC 34. Regras de negócio e integrações específicas continuam sob responsabilidade dos produtos.

## Proposta

### Um novo tema: Horizon

Propomos construir **um novo tema chamado Horizon para o [Shoreline](https://github.com/vtex/shoreline)**. Horizon significa horizonte, em continuidade à referência de paisagem de Shoreline e Sunrise. O nome expressa a busca por uma linguagem visual comum para os produtos.

Horizon será a base visual das novas interfaces administrativas da VTEX, começando por AI Workspace, Studio e pelos templates e protótipos de Design voltados a essas experiências. Shoreline será a fonte da verdade da implementação dos componentes; o tema reunirá as decisões de cor, tipografia, espaçamento, formas, superfícies e estados.

A construção aproveitará as capacidades existentes do Shoreline e seguirá suas boas práticas de desenvolvimento e contribuição. Cada evolução deverá ter API reutilizável, exemplos dos estados relevantes, testes, documentação e revisão. As decisões aprovadas serão distribuídas pelo pacote, com versão, para que cheguem aos consumidores sem precisar ser reproduzidas em cada aplicação.

### Relação com a RFC 34 e Shoreline AI

A [RFC 34](https://docs.google.com/document/d/143oF_o2zd0ZshTpSHODT2nKLd0xrcN_a1CtBafF3wPg/edit?tab=t.w0e99t24yluz), em revisão, **já propõe separar a interface conversacional das integrações do Agentic UI**. Nela, `@vtex/shoreline-ai` oferece componentes conversacionais sob os padrões do Shoreline; Assistant-UI fornece primitivas e mecânicas de conversa, incluindo estado e streaming; Agentic UI mantém a integração específica com os serviços VTEX. As branches de [Shoreline AI](https://github.com/vtex/shoreline/tree/feat/poc-shoreline-ai/packages/shoreline-ai) e do [adaptador VTEX](https://github.com/vtex/ai-agents/tree/feat/shoreline-ai-poc/building-blocks/agentic-ui/src/ui-protocol/runtime) exploram essa separação.

**A contribuição de Horizon é definir e aplicar a linguagem visual compartilhada entre os componentes gerais e conversacionais**, com tokens, padrões de interação, acessibilidade e orientações de uso no Styleguide. A incorporação da interface hoje mantida no Agentic UI será coordenada com a RFC 34, respeitando a organização proposta entre `@vtex/shoreline` e `@vtex/shoreline-ai`. Esses pacotes devem expressar o mesmo design system.

Na branch consultada, Shoreline AI já reutiliza componentes e estilos do Shoreline. A aplicação de Horizon ainda exige alinhar tokens semânticos, dimensões e estados e verificar o resultado nas composições conversacionais. Esse é o trabalho de UI/UX a ser conduzido em conjunto com seus mantenedores.

As tecnologias e integrações citadas na RFC 34 — AG-UI, A2A, A2UI, AI SDK e OpenCode — permanecem naquela discussão. Horizon trata da experiência apresentada ao usuário: por exemplo, como exibir uma resposta parcial, indicar processamento, disponibilizar uma ação de interrupção e apresentar um erro. O transporte do stream e a execução dessas ações seguem os contratos da base conversacional.

### Styleguide como fonte da verdade visual

O **[AIW Styleguide](https://github.com/vtex/aiw-styleguide) é uma iniciativa conjunta de Design e Engenharia para deixar claro quais componentes existem no projeto**, seus estados, composições e possibilidades de uso. A expectativa é consolidá-lo como a fonte da verdade visual da linguagem compartilhada.

Seus exemplos deverão consumir os componentes do Shoreline com Horizon e, conforme sua disponibilização, os componentes conversacionais de Shoreline AI alinhados ao tema. O catálogo documentará aparência, composição, comportamento de interação e acessibilidade, usando dados de exemplo e adaptadores de demonstração para reproduzir os estados de forma previsível. Uma decisão aprovada deve atualizar a implementação e sua referência visual de forma coordenada.

Nas experiências conversacionais, isso inclui estados vazio, de composição, processamento, resposta parcial, conclusão e erro, além das ações disponíveis em cada situação. A revisão deve considerar foco, navegação por teclado, leitura por tecnologias assistivas e adaptação a diferentes tamanhos de tela, junto aos demais controles da interface.

As responsabilidades propostas são:

- **Design:** definir a linguagem visual, os critérios de uso e o resultado esperado nas interfaces.
- **Mantenedores do Shoreline e de Shoreline AI:** alinhar componentes e tema, revisar as capacidades visuais compartilhadas e manter sua distribuição.
- **Responsáveis pela RFC 34 e pela integração Agentic UI:** coordenar a evolução da base conversacional e suas dependências de adoção, preservando a separação entre apresentação e integração.
- **Styleguide:** tornar as decisões visíveis e consultáveis por meio de exemplos e orientações alinhados ao pacote.
- **Template de Design:** consumir essa base, explorar composições e encaminhar novas necessidades para revisão.
- **AI Workspace e Studio:** adotar a base compartilhada e manter suas integrações e jornadas de produto.

### Do protótipo ao projeto oficial

Uma necessidade identificada no template ou em um produto será discutida com Design e Engenharia. Mudanças visuais reutilizáveis evoluirão Horizon ou os componentes do Shoreline e de Shoreline AI e aparecerão no Styleguide. Necessidades que dependam de novas capacidades de conversa serão encaminhadas aos responsáveis pela base conversacional, com o comportamento esperado da interface documentado.

Depois da publicação, o template e as aplicações poderão adotar as versões acordadas das bibliotecas. O trabalho de levar uma interface explorada por Design ao projeto oficial passa a se concentrar nas integrações e nas regras do produto, preservando a apresentação compartilhada. As sobrescritas substituídas pelas bibliotecas serão removidas durante a adoção.

### Ferramental para construir e evoluir Horizon

O trabalho que originou a [branch de referência](https://github.com/vtex/shoreline/tree/feat/horizon-theme-rfc) inclui **construir o [ferramental necessário](../../tools/design-system/README.md) para criar e evoluir componentes, tokens e temas seguindo as boas práticas do Shoreline, com apoio de agentes de IA (AI agents)**.

Essa estrutura já reúne instruções de descoberta, criação e revisão para agentes; contratos que registram a intenção de cada mudança e seus impactos; e verificações automatizadas de tokens, arquitetura, comportamento, aparência e acessibilidade. O objetivo é tornar as práticas do projeto aplicáveis durante a implementação e produzir resultados que o time consiga revisar.

Com esse contexto, agentes poderão encontrar capacidades existentes, apoiar a aplicação do tema e a evolução dos componentes visuais e executar as verificações correspondentes. Design e Engenharia definem os critérios e aprovam o resultado. A consolidação do ferramental acompanhará a construção de Horizon e sua validação nos componentes e nas composições dos consumidores.

Para organizar a evolução, propomos uma fila compartilhada de necessidades, com prioridades e responsáveis pela revisão e publicação. O ferramental e os agentes devem reduzir o trabalho repetitivo, apoiados por revisão de Design e Engenharia.

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

Esse ponto de entrada está disponível na [branch de referência](https://github.com/vtex/shoreline/tree/feat/horizon-theme-rfc). A distribuição aos consumidores seguirá o processo de publicação do Shoreline, permitindo adoção gradual. O consumo dos componentes conversacionais seguirá os pontos de entrada de Shoreline AI discutidos na RFC 34, com a aplicação visual de Horizon validada nas versões adotadas.

## Adoção e critérios de aceite

Propomos as seguintes etapas, com responsáveis e prioridades acordados entre os times:

| Etapa | Resultado esperado |
| --- | --- |
| Alinhar a linguagem | Definir as decisões visuais compartilhadas, os critérios de uso e as interfaces prioritárias de AI Workspace, Studio e Design. |
| Consolidar a base e o ferramental | Evoluir Horizon e os componentes necessários, com instruções para agentes, contratos e verificações incorporados ao fluxo de contribuição. |
| Alinhar componentes conversacionais | Aplicar os tokens e padrões de Horizon aos componentes previstos na RFC 34, em coordenação com seus mantenedores, e validar seus estados e composições. |
| Conectar Styleguide e template | Apresentar a linguagem no Styleguide e usá-la no template, ambos consumindo a base compartilhada. |
| Validar nos produtos | Levar uma interface representativa do template ao AI Workspace e exercitar a mesma base em Studio, combinando controles gerais e conversacionais conforme a disponibilidade das bibliotecas e removendo as sobrescritas substituídas. |
| Distribuir e ampliar | Publicar versões, migrar gradualmente e ampliar a cobertura conforme as necessidades dos consumidores. |

O aceite deve demonstrar que uma decisão visual aprovada aparece de forma consistente no Styleguide, no template e nos produtos, incluindo interfaces que combinam componentes gerais e conversacionais. Os estados e as interações documentados devem ser reproduzíveis no catálogo e validados quanto à acessibilidade e ao comportamento responsivo. As sobrescritas e cópias substituídas pelas bibliotecas devem ser removidas.

As contribuições, inclusive as realizadas por agentes, devem apresentar implementação, verificações e exemplos revisáveis. A publicação de Horizon exige atender aos critérios de qualidade do Shoreline, incluindo testes, revisão visual, acessibilidade e aprovação de Design e Engenharia. A adoção deve permitir retorno à versão anterior caso sejam encontradas regressões.

O trabalho disponível na branch já permite explorar o tema e seu ferramental. Para avançar na adoção, ainda será necessário consolidar a revisão visual, resolver as pendências técnicas registradas e validar a integração com os consumidores. O [registro de validação](validacao-rfc.md) reúne as verificações executadas e as pendências.

## Alternativas e riscos

Manter adaptações locais exige menos investimento imediato, mas aumenta o custo de sincronizar cada evolução. Criar forks ou uma biblioteca independente amplia a manutenção de componentes e comportamentos. Evoluir a base compartilhada no Shoreline permite aproveitar o que já existe e distribuir as mudanças entre os consumidores.

Os principais riscos são a divergência visual entre Shoreline e Shoreline AI, a manutenção de cópias concorrentes no Styleguide e a dependência da evolução da base conversacional para parte da adoção. A proposta reduz esses riscos com tokens e critérios compartilhados, exemplos mantidos junto à implementação e validação de interfaces reais. O tema e os controles gerais podem avançar enquanto a integração visual conversacional é coordenada com a RFC 34. A revisão de Design e Engenharia deve ser planejada junto à implementação.

## Questões para revisão

1. Concordamos com Horizon como linguagem visual compartilhada e novo tema para as interfaces administrativas propostas?
2. Quais componentes, estados e composições de AI Workspace e Studio devem orientar o primeiro ciclo de adoção?
3. Como manter o Styleguide alinhado ao pacote e organizar as contribuições de Design, Engenharia e agentes de IA?
4. Como coordenar os critérios visuais, a revisão e a adoção com os responsáveis pela RFC 34 e os times consumidores?

## Referências

- [Shoreline](https://github.com/vtex/shoreline) e [documentação](https://shoreline.vtex.com): design system para experiências administrativas e de back-office, atualmente disponível para uso interno na VTEX.
- [AI Workspace no Admin Platform](https://github.com/vtex/admin-platform/tree/7bb6cb122dd5ee45cc1bc0031a84fb8b9a130508/ai-workspace/shell): implementação oficial do produto.
- [Template utilizado por Design](https://github.com/vtex/ai-workspace-shell-template/tree/a287ee816d06b0b4325da3ea64b22675ff820ce4): ambiente de exploração de interfaces.
- [AIW Styleguide](https://github.com/vtex/aiw-styleguide/tree/baceafacc9e32a863987dad06da5a6654b387d6b): referência atual para a evolução do catálogo visual.
- [Agentic UI em ai-agents](https://github.com/vtex/ai-agents/tree/a01d78536e33bedb619abb0743718701f1b865df/building-blocks/agentic-ui): base conversacional atual.
- [RFC 34 — Shoreline AI on Assistant-UI primitives](https://docs.google.com/document/d/143oF_o2zd0ZshTpSHODT2nKLd0xrcN_a1CtBafF3wPg/edit?tab=t.w0e99t24yluz): proposta relacionada de evolução da base conversacional.
- [Shoreline AI](https://github.com/vtex/shoreline/tree/7f3e12fc451d0eb3b8970ef371e8f40ef90537df/packages/shoreline-ai) e [adaptador VTEX](https://github.com/vtex/ai-agents/tree/6a483fdfd25efb1030829a015db6de415c9fc0ec/building-blocks/agentic-ui/src/ui-protocol/runtime): versões consultadas das branches de referência da RFC 34.
- [Development guideline](https://shoreline.vtex.com/guides/code/development-guideline) e [Code styleguide](https://shoreline.vtex.com/guides/code/code-styleguide): práticas para desenvolvimento e contribuição no Shoreline.
- [Análise dos repositórios](analise-repositorios.md): origem do Styleguide, diferenças de implementação e relação entre Horizon e a RFC 34.
- [Branch Horizon](https://github.com/vtex/shoreline/tree/feat/horizon-theme-rfc) e [preview executável](preview/README.md).
- [Ferramental de design system](../../tools/design-system/README.md): fluxo de contribuição, instruções para agentes e verificações.
- [Constituição do Shoreline](https://github.com/vtex/shoreline-specs/blob/main/.specify/memory/constitution.md): critérios de contribuição e qualidade.
