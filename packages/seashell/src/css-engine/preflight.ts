export const preflight = `
@layer sl-reset, sl-base, sl-tokens, sl-components;

@layer sl-reset {
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  * {
    margin: 0;
  }
  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }
  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }
  input,
  button,
  textarea,
  select {
    font: inherit;
  }
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }
  #root,
  #__next {
    isolation: isolate;
  }
}

@layer sl-base {
  body {
    background: var(--sl-bg-primary);
    color: var(--sl-fg-primary);
    font: var(--sl-text-body);
  }

  p {
    font: var(--sl-text-body);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font: var(--sl-text-title-1);
  }

  pre,
  code {
    font: var(--sl-text-code);
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
}
`
