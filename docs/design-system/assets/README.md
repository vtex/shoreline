# RFC Horizon — figures

These are editorial illustrations for discussion, not production components,
application screenshots, approved designs or test evidence. Their Portuguese
labels are intended for the RFC.

| Asset | Purpose |
| --- | --- |
| `button-proposal.svg` | Four existing Button variants and five simulated visual states. |
| `button-contexts.svg` | Conceptual usage in AI Workspace, Studio and design templates/prototypes. |
| `button-proposal.html` | Standalone 1200 × 704 preview for PNG capture. |
| `button-contexts.html` | Standalone 1200 × 704 preview for PNG capture. |

Regenerate the SVG and HTML files with:

```sh
python3 docs/design-system/assets/generate-figures.py
```

The generator requires only Python 3 and makes no network requests. Fonts use
the system fallback if Inter is unavailable. SVG text stays editable. HTML embeds
the full SVG and has no external assets. For a Google Docs image, capture the HTML
at 1200 × 704 and insert at the document's text width.

## Provenance and scope

The figures use the current demonstration's source files:

- `packages/shoreline/src/themes/horizon/tokens-foundations.css`: radius 12 px,
  Horizon blue and gray palettes, neutral foregrounds and translucent backgrounds.
- `packages/shoreline/src/themes/sunrise/tokens.css`: inherited semantic aliases,
  critical palette, focus rings and 14 px / 600 action typography.
- `packages/shoreline/src/themes/sunrise/components/button.css`: inherited variant
  styles and heights of 36 px (`normal`) and 44 px (`large`).
- `packages/shoreline/src/components/button/button.tsx`: existing `variant`,
  `size`, `loading` and native `disabled` API. Loading also disables activation.

The matrix enlarges the normal button by 1.5× for legibility in a document. The
footer gives the underlying dimensions, rather than the illustration's pixel
size. It includes `primary`, `secondary`, `tertiary` and `critical`; it is not a
complete Show matrix. The API also supports `criticalTertiary`. Focus and hover
are simulated for illustration. The spinner is a static editorial drawing.

The context panels are fictional compositions. They demonstrate how products
could share an existing Button API and the Horizon theme import; they do not
claim that Studio or AI Workspace already migrated. No new props or variants
are proposed by these figures.

## Existing diagnostic evidence

The local `artifacts/design-system/visual/capture/run.json` receipt reports a
diagnostic run on 2026-10-03 with all 204 cases executed and none skipped, across
Horizon/Sunrise and desktop/mobile. The environment is macOS with Chrome,
`canonicalEnvironment: false`, and human review is pending. Its exit code is 1.

Inspection of the 204 `accessibility.json` attachments found 168 cases with no
axe violations and 36 cases with violations, across nine stories. The Button
Show attachment has no axe violations in the four theme/viewport combinations.
This does not establish full keyboard, screen-reader or interaction coverage,
approved visual baselines, or accessibility acceptance. The figures above are
not substitutes for those checks. The browser matrix was not rerun to author
these documentation assets.
