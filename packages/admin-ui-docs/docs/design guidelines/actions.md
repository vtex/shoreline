---
title: Actions
path: /design-guidelines/actions/
sidebar_position: 1
---

## Design recommendations for Actions

Follow the set of recommendations below to make the best decisions when designing sleek, clear pages. This page includes recomendations for the following components:
- Buttons
- Links
- Menus

## Components

**When should I use the *link* component instead of the *button*?**
  - When the action only opens a new tab.
  - When the action only changes the address of the page.

  **Every rule has its exception:**
  Choose the button component when it makes sense to place the action in a *group of buttons* or in a context where a button is typically used - such as in the Page Header component.

**When should I use the *menu* component instead of a *group of buttons*?**
  - When the actions are rarely used, yet need to be available.
  - When the actions will be repeated multiple times for each list item.
  - When there are already many actions shown on the screen at a time.


## Variants

**When should an action component have a *primary*, *secondary*, or *tertiary* prominence?**
  The prominence of an action component should vary depending on how frequently it is used, so this answer depends on research applied to your design’s context. Even so, there are patterns you can follow:  
   - **Primary:** there should be only one primary action visible on a screen at a time, and if a screen has only one action it should be a primary one.
   - **Secondary:** there can be a few secondary actions on a screen, but only one per group. In a group, it is usually next to a single primary action or to one or more tertiary actions.
   - **Tertiary:** there can be numerous tertiary actions on a screen. If an action is repeated multiple times, such as for each list item, this is the correct prominence.


**When should an action component use *neutral colors*?**
  - When the action’s background uses the secondary color ($bg.secondary).
  - When the same action is repeated multiple times on a screen, such as for each list item.
  - When the action is part of a group of buttons composed of only tertiary actions.


**When should an action component use *critical colors*?**
  - **Destructive actions:** the critical color must be used when the action is destructive and can’t be undone.
  
  💡Actions should be reversible whenever possible and not require the critical color.
  
  **When not to use:**
  Delete actions with a “restore” interaction: The critical colors should not be used in situations where the content can be restored from a trash can.
    

**What *size* should be used in an action component?**
  - **Normal:** all tertiary actions and most secondary actions should be normal sized. Apply it to actions that are repeated multiple times on a screen or that are not frequently used.
  - **Large:** most primary actions should be large sized. Apply it to actions that should have the most prominence on a screen, such as those in the Page Header component.


## Content

**What *labels* and *icons* should be applied to an action component?**
  Whenever possible, the labels and icons listed below should be adopted. If you need a new label and/or icon please open a request explaining your use case.
    
  | Icon | Label | Use case |
  | --- | --- | --- |
  | DotsThreeVertical | Actions | Menu with all actions related to the context where it is at. |
  | DotsThreeVertical | More | Menu after a group of buttons. |
  | PlusCircle | Create new | Button for creating new entities in a database. |
  | ... | ... | ... |


**When should the *label* in an action component be hidden?**
  - When the same button is repeated multiple times on a screen, usually on lists. An example of this can be found in the Table component, where the “Actions” button is repeated in all rows.
  - When an action is common to a degree where the icon is easily understood by itself. Examples of this include the "Close” button in the Alert component and the "Forward" and "Back” buttons in the Pagination component.
  **What to avoid:**
    - Including actions that are not always easily understood inside space-constrained elements.
    - Using a tooltip to display their label.
    
  💡All actions must have labels to be accessible, even if they are not visible in the interface. The label can be added in the aria-label HTML attribute, so remember to specify what this value should be.
    

**When should an action component use an *icon*?**
  - When the action label is hidden according to our recommendations.
  - When the actions are within the dropdown of the menu component.


## Position

**Where an action component be *positioned*, when next to other actions?**
  Considering left-to-right interfaces, there are three common guidelines related to how actions should be positioned:
  - Actions should be ordered based on prominence from right to left, or from top to bottom. 
    For example, a secondary button should be to the left of a primary button.
  - When a menu is in a horizontal group of buttons, it should be the first one from right to left. 
    For example, when a menu exists in a card header it should be on the top-right.
  - When sensitive actions are inside a menu, they should be last and visually separated from the other actions. 
    For example, a “Delete” action in a menu should be the last one and there should be a divider above it.

**What should be the *alignment* of a tertiary action, when next to other content?**    
  Tertiary actions should be vertically or horizontally aligned based on their content, and not based on the button’s overall size. 
    
  💡Whenever needed, the bleed prop in the button component should be used to guarantee this alignment.
    

**What should be the *alignment* of an action component in a form?**
  - **Right-aligned:** when the action is at the end of the form and will submit the content.
  - **Left-aligned:** when the action will only modify part of the form’s content.


## Behavior

**When should an action component be *disabled* and how?**
  This state should be avoided since it is not visually pleasant and its visual appearance can be mistaken for a neutral action. However, it can be used in rare scenarios where the reason behind the button being disabled is very intuitive for users. 
  For example, a save button can be disabled when no changes have been made.
    
  **What to avoid:**
    - **Don't display a tooltip when hovering a disabled button.** Maintain the button enabled so when it is clicked you can explain why the action is not possible at the moment.
    - **Don't include an interactive element that is always disabled.** Review the information architecture and reconsider using the component to communicate this context.

**When should an action component trigger a confirmation modal?**
  - When the action is irreversible. For example, a delete action where the content cannot be restored from the trash.
  - When the action would take considerable time to undo. For example, a publish action where the publication cannot be canceled while in progress.
