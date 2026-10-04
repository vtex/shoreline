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

### Styleguide

O [AIW Styleguide](https://github.com/vtex/aiw-styleguide) é uma **referência transitória** para inventariar componentes e apoiar a discussão visual. Conforme as capacidades forem incorporadas, a documentação e os exemplos do **Shoreline assumirão a referência visual e de implementação**. A transição deverá preservar os exemplos úteis e encerrar a manutenção paralela dos conteúdos absorvidos.

## Objetivos

- Unificar a linguagem visual das novas interfaces administrativas da VTEX, começando pelos componentes gerais e conversacionais de AI Workspace e Studio.
- Permitir que interfaces exploradas por Design reutilizem a implementação disponível nos produtos.
- Aplicar as boas práticas do Shoreline — tokens, composição, documentação, testes e revisão — para garantir acessibilidade, escalabilidade e manutenção da base compartilhada.
- Facilitar contribuições de pessoas e agentes de IA, com uma experiência de desenvolvimento (DX) que acompanhe a evolução dos componentes e reduza sobrescritas locais.

## Não objetivos

- Construir um design system do zero, criar forks por produto ou migrar todas as interfaces de uma vez.
- Escolher o motor de conversa, como Assistant-UI, ou redesenhar runtime, estado das mensagens e mecanismos de edição e regeneração.
- Definir protocolos, transporte e execução de streaming, autenticação, histórico ou uploads.
- Centralizar regras de negócio e integrações específicas dos produtos.

## Proposta

### Um novo tema: Horizon

Propomos construir **Horizon como um novo tema do [Shoreline](https://github.com/vtex/shoreline)** para as novas interfaces administrativas da VTEX, começando por AI Workspace, Studio e templates e protótipos de Design. Horizon significa horizonte e mantém a referência de paisagem que vem do Shoreline e Sunrise.

O tema reunirá decisões de cor, tipografia, espaçamento, formas, superfícies e estados. **Shoreline será a fonte da verdade visual e de implementação**, reunindo componentes, tokens, exemplos e orientações de uso, com versão e critérios de qualidade compartilhados.

### Ferramental para construir e evoluir

A [branch de referência](https://github.com/vtex/shoreline/tree/feat/horizon-theme-rfc) inclui o [ferramental](../../tools/design-system/README.md) para criar e evoluir componentes, tokens e temas pelos padrões do Shoreline, **com apoio de agentes de IA**. Já reúne instruções de descoberta, criação e revisão; contratos de intenção e impacto; e verificações de tokens, arquitetura, comportamento, aparência e acessibilidade.

Pessoas e agentes seguirão o mesmo fluxo de contribuição: buscar capacidades existentes, propor a mudança, apresentar exemplos e executar as verificações. Design e Engenharia revisarão os resultados; cada contribuição terá um responsável por acompanhá-la até a publicação. A evolução mais rápida das interfaces com IA exige retorno rápido das ferramentas e capacidade de revisão compatível com esse volume.

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
- **Mantenedores do Shoreline:** orientar e revisar contribuições dos times, manter a distribuição e coordenar com os mantenedores do Agentic UI as capacidades conversacionais.
- **Times consumidores:** contribuir com necessidades e melhorias e conduzir a migração de seus produtos e templates, mantendo integrações e jornadas específicas.

| Etapa | Resultado esperado |
| --- | --- |
| Alinhar a linguagem | Inventariar componentes e adaptações e definir critérios visuais e interfaces prioritárias de AI Workspace, Studio e Design. |
| Consolidar a base e o ferramental | Evoluir tema e componentes, incorporando instruções para agentes, contratos e verificações ao fluxo de contribuição. |
| Alinhar componentes conversacionais | Aplicar os padrões de Horizon às capacidades visuais do Agentic UI, em conjunto com seus mantenedores. |
| Migrar consumidores | Adotar Horizon gradualmente em AI Workspace, Studio e templates existentes, validando controles gerais e conversacionais e removendo adaptações substituídas. |
| Consolidar a referência | Incorporar exemplos e orientações aprovados à documentação do Shoreline e retirar as referências duplicadas do Styleguide. |
| Distribuir e ampliar | Publicar versões e ampliar a adoção e a cobertura conforme as prioridades dos consumidores. |

O aceite exige:

- Implementação e exemplos versionados no Shoreline, com estados e interações reproduzíveis, incluindo processamento, resposta parcial e erro nas experiências conversacionais.
- Validação nos produtos e templates migrados, usando a documentação do Shoreline como referência; conteúdos absorvidos do Styleguide devem apontar para essa fonte oficial.
- Testes e revisão visual, incluindo responsividade, contraste, foco, teclado e tecnologias assistivas, pelos critérios do Shoreline.
- Remoção das cópias e sobrescritas substituídas, com possibilidade de retorno à versão anterior em caso de regressão.
- Aprovação de Design e Engenharia, inclusive para contribuições feitas por agentes.

A branch permite explorar o tema e o ferramental. A adoção depende das revisões e pendências do [registro de validação](validacao-rfc.md) e da verificação nos consumidores.

## Alternativas e riscos

### Alternativas consideradas

| Alternativa | Benefício | Limitação |
| --- | --- | --- |
| Manter adaptações nos produtos e templates | Atende necessidades locais com pouca coordenação inicial. | Correções e estados precisam ser replicados; interfaces e orientações tendem a divergir. |
| Compartilhar somente tokens | Alinha parte da aparência com menor esforço inicial. | Não resolve diferenças de composição, comportamento e acessibilidade nem elimina cópias de componentes. |
| Criar uma biblioteca independente do Shoreline ou forks | Dá autonomia para definir APIs e publicar mudanças. | Exige manter componentes, testes, documentação e correções em paralelo, aumentando o custo de convergência. |

**Evoluir o Shoreline com Horizon** permite reutilizar a base existente e distribuir decisões visuais compartilhadas. A contrapartida é o investimento contínuo na manutenção do tema, na validação dos componentes, na documentação e na migração dos consumidores. O resultado depende de adoção e contribuição sustentadas, além da criação do tema.

### Riscos e mitigação

- **Regressões nos consumidores.** Alterações em tokens, estilos e componentes compartilhados podem afetar outras interfaces e temas. Validar os temas afetados em ambientes isolados, testar versões de prévia nos consumidores e manter um caminho de retorno.
- **Consistência visual sem qualidade de uso.** Uma aparência alinhada pode esconder problemas de foco, teclado, responsividade ou estados conversacionais. Revisar interações reais com Design e Engenharia e combinar verificações automáticas com avaliação de acessibilidade.
- **Transição sem conclusão.** Cópias, sobrescritas e referências concorrentes podem continuar sendo necessárias após a adoção inicial. Definir responsáveis e critérios de conclusão por etapa, remover adaptações substituídas e transferir os exemplos úteis do Styleguide para o Shoreline.
- **Proliferação de componentes e variantes.** A produção acelerada por IA pode gerar soluções equivalentes e APIs difíceis de descobrir e manter. Buscar capacidades existentes antes de criar, justificar novas APIs e manter exemplos e instruções versionados junto aos componentes.
- **Contribuições acima da capacidade de revisão.** O acúmulo de mudanças pode atrasar a publicação e incentivar novas soluções locais. Priorizar incrementos pequenos, distribuir a revisão entre os times e automatizar verificações, acompanhando o tempo até revisão e publicação.
- **Acoplamento às integrações dos produtos.** Incorporar componentes com dependências de execução pode limitar seu reuso. Separar apresentação e contratos de interação das integrações e validar as capacidades em contextos representativos dos consumidores.

## Pontos a endereçar

1. **Migração por consumidor.** Mapear versões, componentes, wrappers, sobrescritas e lacunas de AI Workspace, Studio e templates existentes. Definir pilotos, sequência e responsáveis; distinguir adoção em novas interfaces da migração das existentes e decidir quais templates serão atualizados ou descontinuados.
2. **Compatibilidade e distribuição.** Definir a unidade de adoção e verificar o isolamento de estilos antes de permitir a coexistência de temas. Acordar versões de prévia para validação nos consumidores, política de mudanças incompatíveis, depreciações, guias de atualização e retorno à versão anterior.
3. **Contribuição e revisão.** Definir a entrada de demandas, os critérios para reutilizar, estender ou criar componentes e a divisão de revisão entre Design e Engenharia. Acordar prioridades, responsáveis e cadência de publicação para contribuições de diferentes times, inclusive as feitas por agentes.
4. **DX para pessoas e agentes.** Consolidar descoberta de APIs e tokens, exemplos e instruções versionados, geradores, previews e verificações locais e na CI com diagnósticos claros. Facilitar a validação no produto antes da publicação e acompanhar tempo de revisão, retrabalho e regressões para ajustar o processo ao ritmo de evolução com IA.
5. **Conclusão da transição do Styleguide.** Mapear os conteúdos úteis e seus responsáveis, incorporá-los à documentação e aos exemplos do Shoreline e substituir referências locais. Considerar a transição concluída quando as capacidades compartilhadas puderem ser consultadas e adotadas a partir do Shoreline sem depender do catálogo paralelo.

## Referências

- [Shoreline](https://github.com/vtex/shoreline) e [documentação](https://shoreline.vtex.com).
- [AI Workspace no Admin Platform](https://github.com/vtex/admin-platform/tree/7bb6cb122dd5ee45cc1bc0031a84fb8b9a130508/ai-workspace/shell).
- [Template de Design](https://github.com/vtex/ai-workspace-shell-template/tree/a287ee816d06b0b4325da3ea64b22675ff820ce4) e [AIW Styleguide](https://github.com/vtex/aiw-styleguide/tree/baceafacc9e32a863987dad06da5a6654b387d6b), catálogo transitório das interfaces atuais.
- [Agentic UI](https://github.com/vtex/ai-agents/tree/a01d78536e33bedb619abb0743718701f1b865df/building-blocks/agentic-ui).
- [RFC 22 — Shoreline AI](https://docs.google.com/document/d/143oF_o2zd0ZshTpSHODT2nKLd0xrcN_a1CtBafF3wPg/edit?tab=t.z8qccnajlshl): proposta inicial de evolução do design system.
- [RFC 34 — Shoreline AI on Assistant-UI primitives](https://docs.google.com/document/d/143oF_o2zd0ZshTpSHODT2nKLd0xrcN_a1CtBafF3wPg/edit?tab=t.w0e99t24yluz): discussão sobre a base conversacional, ainda em revisão.
- [Development guideline](https://shoreline.vtex.com/guides/code/development-guideline), [Code styleguide](https://shoreline.vtex.com/guides/code/code-styleguide) e [Constituição](https://github.com/vtex/shoreline-specs/blob/main/.specify/memory/constitution.md).
- [Análise dos repositórios](analise-repositorios.md): evidências e propostas anteriores.
- [Branch Horizon](https://github.com/vtex/shoreline/tree/feat/horizon-theme-rfc), [preview](preview/README.md) e [ferramental](../../tools/design-system/README.md).
