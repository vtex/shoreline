---
path: /alert/
---

# Alert

Configuration device, where users can input text and choose between anticipated options. Forms include many elements that will be described individually.

Titles
Titles immediately indicate context and possible actions in a given section.

Tone and Voice
We are ecommerce specialists. We are specific, and avoid ambiguity. Our titles must match the industry's jargons, and the users' mental model. Choose titles that seem intuitive, given what we master about ecommerce. Users should instantly recognize the section's purpose, through the title.
Titles are vital aspects of information architecture. Before naming a section, understand its purpose and how it contributes to the bigger picture. Be mindful of how we transmit seriousness and reliability when naming screens.

Do’s

1. Always name sections with titles. They clarify the context, facilitate documentation, and allow users to point out where their troubles are, in support tickets.
2. Always use title case.
3. Titles may be used in the following contexts:
4. Referring to branded names
5. Grouping ambiguous tasks
6. Indicating single tasks

Grammar

1. We encourage the use of possessive adjectives or pronouns in sentences, as long as they don't exceed the limited space for text, in the UI. They reinforce the idea that users should feel connected with their VTEX environment, and feel they belong. It shows the respect we have towards their store.
2. Prefer key words, rather than sentences.
3. Use title case.
4. No punctuation.
5. Maximum of 4 words.

Anatomy
Follow the anatomy described below. Be sure to include:

1. Title
2. Description
3. Labels for each element
4. Text inputs

Description
Descriptions provide further details about a given entity, to help users advance, while reducing liability.

Tone and Voice
We trust to be trusted. We're serious, and we never alarm users, we soothe their anxieties. We add descriptions to deliver transparency, so users are aware of liabilities, and sensitive information. We want to add precision with descriptions, and not trigger doubts. We're reliable, we mean what we say. After reading our descriptions, users should feel confident about what actions they want to take.

Do’s

1. Make descriptions as scannable as possible. Users usually skim through, or skip descriptions entirely.
2. Descriptions should be clear, never ambiguous.
3. They should be present anywhere there's a sensitive action taking place. Make sure the user understands the implications of changing a setting, for example.
4. When adding definitions, always use our Glossary as the source of truth.

Grammar

1. We encourage the use of possessive adjectives or pronouns in sentences, as long as they don't exceed the limited space for text, in the UI. They reinforce the idea that users should feel connected with their VTEX environment, and feel they belong. It shows the respect we have towards their store.
2. Prefer direct sentences, without passive voice.
3. Use sentence case.
4. Add punctuation at the end of sentences. Use exclamation marks carefully.
5. Maximum of 2 sentences. Break down longer sentences if it adds clarity.

Labels
Further clarifies sections and entities.

Tone and Voice
Labels should help users, and not become the text that they skip while skimming through a page. Be specific. We are ecommerce experts, and we master our customer's diverse contexts. Make sure to always use ecommerce jargons.

Do’s

1. Make it as brief and clear as possible.
2. Meet the user's mental model, use ecommerce vocabulary.
3. If you think a label should have more clarification about its meaning, you can use a tooltip.

Grammar

1. We encourage the use of possessive adjectives or pronouns in sentences, as long as they don't exceed the limited space for text, in the UI. They reinforce the idea that users should feel connected with their VTEX environment, and feel they belong. It shows the respect we have towards their store.
2. Prefer key words, rather than sentences.
3. Use sentence case.
4. No punctuation.
5. Maximum of 3 words.

## Behavior

```jsx
import { ThemeProvider, Alert } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Alert visible>Some alert with info</Alert>
    </ThemeProvider>
  )
}
```

## Installation

```static
yarn add @vtex/admin-ui
```

```jsx static
import { Alert } from '@vtex/admin-ui'
```

Learn more in [Get started](/docs/get-started/).

## Types

### Info (default)

TODO

#### ✅ Do's:

- TODO

#### 🚫 Dont's:

- TODO

#### Example

```jsx
import { ThemeProvider, Alert } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Alert visible>Some alert with info</Alert>
    </ThemeProvider>
  )
}
```

## Props

<propdetails heading="Alert" component="Alert"></propdetails>
