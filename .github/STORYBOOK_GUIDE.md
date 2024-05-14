### Summary

1. `Play`: An interactive playground that allows viewers to control the values of a set of props. A component has only one `Play` story.
2. `Show`: Shows multiple variants of the component side by side on a single page. That's the story we run the visual tests in chromatic. A component has only one `Show` story.
3. `Example`: An example of the use of the component that cannot be achieved on the `Play` or `Show` stories. A component may have multiple `Example` stories.
4. `Test`: Represents an integration(interaction) test case. These are run using the storybook-test-runner.

### File organization

`Play` and `Show` are separate story files. Add a folder for `tests` and `examples`.

```md
components/
└── button/
└── stories/
├── button.play.stories.tsx
├── button.show.stories.tsx
├── examples/
│ ├── button-<example-1>.stories.tsx
│ ├── button-<example-2>.stories.tsx
│ └── button-<example-n>.stories.tsx
└── tests/
├── button-<test-case-1>.stories.tsx
├── button-<test-case-2>.stories.tsx
└── button-<test-case-n>.stories.tsx
```
