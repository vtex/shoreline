# Comparação executável — RFC Horizon

As figuras da RFC são capturas de componentes **React reais**, importados de `packages/shoreline/src`, com o CSS compilado do tema correspondente. Cada tema roda em um iframe independente. Nenhuma forma de botão foi redesenhada em SVG ou simulada por CSS do preview.

```sh
pnpm build
pnpm exec vite --config docs/design-system/preview/vite.config.mjs
```

Abra `http://127.0.0.1:8765/docs/design-system/preview/index.html?component=button` ou troque o parâmetro por `icon-button`. Os controles respondem a mouse e teclado; a contagem de ativações é anunciada por uma região live oculta visualmente. Disabled/loading não ativam a ação. O spinner real tem sua animação pausada em 0,5 s apenas neste preview, para figuras reproduzíveis.

Capture o elemento `#comparison` (1200 px de largura). Os componentes são ampliados 1,5× por `zoom` do contêiner para leitura na RFC. O preview não muda cores, tipografia, bordas, dimensões ou estados dos componentes. A fonte Inter variável local tem licença SIL OFL em `fonts/OFL.txt`.

A coluna Sunrise usa a implementação compartilhada atual, limitada às opções disponíveis antes da demonstração. Seus defaults são preservados; rótulos de capacidades ausentes se referem à API anterior. As novas opções também são suportadas por Sunrise, embora só apareçam na coluna Horizon nesta comparação.

## Papel na proposta inicial

O preview ilustra capacidades da proposta Horizon v1.0: seleção isolada de tema, tokens semânticos, APIs compartilhadas e preservação dos defaults Sunrise. Button e IconButton são exemplos; a RFC trata da construção de um tema reutilizável para AI Workspace, Studio e templates ou protótipos dos times de Design.

As cores, formas, tipografia e estados apresentados são propostas experimentais registradas nos tokens locais. Rounded e success também aparecem nos wrappers de AI Workspace; outline e small são informados pelo `toolbarOutline` do aiw-styleguide no commit `baceafacc9e32a863987dad06da5a6654b387d6b`. Essa referência não aprova as decisões visuais nem estabelece uma especificação completa do tema.

A comparação demonstra variações com largura conforme conteúdo, formas padrão e arredondada, tamanhos de 32/36/44 px e estados de interação. Os detalhes estão nos contratos dos componentes. A revisão deve avaliar como essas possibilidades se integram ao vocabulário do tema e aos seus diferentes consumidores.

## Documento

`python3 docs/design-system/preview/export-document.py` gera os segmentos HTML de publicação a partir de `../proposta.md`. Eles seguem os estilos observados na RFC de referência: Arial, título 24 pt rosa, seções 18 pt rosa, subtítulos 14 pt cinza, corpo 11 pt cinza, metadados em tabela e status destacado. Insira os segmentos e as duas imagens PNG alternadamente no Google Docs em formato sem páginas. Em uma edição que preserve título, chips e metadados existentes, use `--body-only` e substitua o conteúdo a partir de Changelog. O exportador cria marcadores para os exemplos de código e salva o conteúdo em `artifacts/horizon-rfc-v1/native-code-blocks.json`: substitua cada marcador usando **Insert → Building blocks → Code block → TypeScript** no Google Docs. O bloco precisa ser nativo; `<pre>` ou realce de texto não equivalem à ferramenta de código. A entrelinha HTML de 115% é convertida pelo importador do Google Docs em `line-height:1.38`, como na cópia nativa da referência. O script não publica nem altera documentos remotos.

Consulte [a RFC](../proposta.md) e [o registro de validação](../validacao-rfc.md) para limites e critérios de aceite.
