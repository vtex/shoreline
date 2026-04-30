# Figma Code Connect

This folder contains the repo-side setup for connecting Shoreline React components to Figma Dev Mode with Code Connect.

## How it works

- `shoreline-components.json` is the source manifest for Shoreline component mappings.
- `scripts/generate-code-connect.mjs` reads that manifest and writes publishable `.figma.ts` Code Connect template files into `generated/`.
- Components without a `nodeId` or `figmaUrl` are skipped, so the repo can keep a full mapping checklist without breaking `figma connect publish`.

## Adding a missing component

1. In Figma, select the main component or component set.
2. Copy its node URL.
3. Paste the node ID into the matching `nodeId` field in `shoreline-components.json`. Use `figmaUrl` only when a component lives in a different Figma file from `figmaFileUrl`.
4. Adjust `props`, `children`, `selfClosing`, `imports`, or `example` if the default snippet should be richer.
5. Run:

```sh
pnpm figma:connect:build
```

6. Publish with a shell that has Figma CLI access:

```sh
FIGMA_ACCESS_TOKEN=<token> pnpm figma:connect:publish
```

The token needs permission to publish Code Connect data for the Shoreline Figma library.

## Notes

- Leave `nodeId` and `figmaUrl` blank for components that are already connected through Code Connect UI unless you intend to replace that connection with the CLI version.
- `figmaFileUrl` is safe to commit for a public/open-source repo; the sensitive value is `FIGMA_ACCESS_TOKEN`, which should stay in local or CI secrets.
- Keep `source` pointed at the implementation file, but keep examples importing from `@vtex/shoreline`.
- Use `example` for composed snippets that cannot be represented as a single root component, like `TabProvider` wrapping `TabList`.
- Prefer mapping high-level public components first. Smaller composition primitives can be connected later when they appear as reusable Figma components.
- Once a component has real Figma property names, add a dedicated template for it if the generic snippet is not expressive enough.
- Prefer one mapping per Figma component set. Use `figmaProps` for code-relevant Figma properties and `figmaChildren` for text content instead of creating separate entries for visual variants.
- `figmaProps` supports `enum`, `boolean`, and `string` mappings. Enum defaults are omitted from the snippet, so a Figma `variant=informational` can render `<Alert>...` while `variant=critical` renders `<Alert variant="critical">...`.
