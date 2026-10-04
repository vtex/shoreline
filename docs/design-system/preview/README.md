# Comparação executável — RFC Horizon

As figuras da RFC são capturas de componentes **React reais**, importados de `packages/shoreline/src`, com o CSS compilado do tema correspondente. Cada tema roda em um iframe independente. Nenhuma forma de botão foi redesenhada em SVG ou simulada por CSS do preview.

```sh
pnpm build
pnpm exec vite --config docs/design-system/preview/vite.config.mjs
```

Abra `http://127.0.0.1:8765/docs/design-system/preview/index.html?component=button` ou troque o parâmetro por `icon-button`. Os controles respondem a mouse e teclado; a contagem de ativações é anunciada por uma região live oculta visualmente. Disabled/loading não ativam a ação. O spinner real tem sua animação pausada em 0,5 s apenas neste preview, para figuras reproduzíveis.

Capture o elemento `#comparison` (1200 px de largura). Os componentes são ampliados 1,5× por `zoom` do contêiner para leitura na RFC. O preview não muda cores, tipografia, bordas, dimensões ou estados dos componentes. A fonte Inter variável local tem licença SIL OFL em `fonts/OFL.txt`.

A coluna Sunrise usa a implementação compartilhada atual, limitada às opções disponíveis antes desta revisão. Seus defaults são preservados; rótulos de capacidades ausentes se referem à API anterior. As novas opções também são suportadas por Sunrise, embora só apareçam na coluna Horizon nesta comparação.

## Fontes e interpretação

- Studio Figma, arquivo `9H5oTQK9dmft7JCoOkSLgx`, primário `4702:3895`, adicionar `4705:8286`, enviar `4705:8027`.
- Primário: azul `#0366DD`, raio 12 px, Inter 14/24, peso 550, tracking −0,17 px, largura ajustada ao conteúdo. O frame de 37 px foi normalizado para 36 px, sem sua borda de 0,5 px.
- Adicionar: 36 px, raio 12 px e fundo `#F5F5F5`. Enviar: 36 px circular. Ícones 20 px.
- Rounded/success vêm também dos wrappers AI Workspace; outline/small vêm do `toolbarOutline` do aiw-styleguide em `baceafacc9e32a863987dad06da5a6654b387d6b`. O outline não reproduz a sugestão Studio com sombra.
- Hover, pressionado, foco, disabled e loading são propostas ou comportamento herdado. Os frames consultados não especificam uma matriz completa de estados.

## Documento

`python3 docs/design-system/preview/export-document.py` gera três segmentos HTML em `artifacts/horizon-rfc-v2/google-doc-segments.json`, a partir de `../proposta.md`. Eles seguem os estilos observados na RFC de referência: Arial, título 24 pt rosa, seções 18 pt rosa, subtítulos 14 pt cinza, corpo 11 pt cinza, metadados em tabela e status destacado. Insira os segmentos e as duas imagens PNG alternadamente no Google Docs em formato sem páginas. A entrelinha HTML de 115% é convertida pelo importador do Google Docs em `line-height:1.38`, como na cópia nativa da referência. O script não publica nem altera documentos remotos.

Consulte [a RFC](../proposta.md) e [o registro de validação](../validacao-rfc-v2.md) para limites e critérios de aceite.
