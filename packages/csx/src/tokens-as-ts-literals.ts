function asLiterals<T extends string>(array: T[]): T[] {
  return array
}

export const colorTokens = asLiterals([
  '$color-white',
  '$color-black',
  '$color-blue-05',
  '$color-blue-10',
  '$color-blue-20',
  '$color-blue-30',
  '$color-blue-40',
  '$color-blue-50',
  '$color-blue-60',
  '$color-light-blue-05',
  '$color-light-blue-10',
  '$color-light-blue-20',
  '$color-light-blue-30',
  '$color-light-blue-40',
  '$color-light-blue-50',
  '$color-light-blue-60',
  '$color-red-05',
  '$color-red-10',
  '$color-red-20',
  '$color-red-30',
  '$color-red-40',
  '$color-red-50',
  '$color-red-60',
  '$color-green-05',
  '$color-green-10',
  '$color-green-20',
  '$color-green-30',
  '$color-green-40',
  '$color-green-50',
  '$color-green-60',
  '$color-orange-05',
  '$color-orange-10',
  '$color-orange-20',
  '$color-orange-30',
  '$color-orange-40',
  '$color-orange-50',
  '$color-orange-60',
  '$color-cyan-05',
  '$color-cyan-10',
  '$color-cyan-20',
  '$color-cyan-30',
  '$color-cyan-40',
  '$color-cyan-50',
  '$color-cyan-60',
  '$color-purple-05',
  '$color-purple-10',
  '$color-purple-20',
  '$color-purple-30',
  '$color-purple-40',
  '$color-purple-50',
  '$color-purple-60',
  '$color-pink-05',
  '$color-pink-10',
  '$color-pink-20',
  '$color-pink-30',
  '$color-pink-40',
  '$color-pink-50',
  '$color-pink-60',
  '$color-teal-05',
  '$color-teal-10',
  '$color-teal-20',
  '$color-teal-30',
  '$color-teal-40',
  '$color-teal-50',
  '$color-teal-60',
  '$color-gray-05',
  '$color-gray-10',
  '$color-gray-20',
  '$color-gray-30',
  '$color-gray-40',
  '$color-gray-50',
  '$color-gray-60',
  '$color-gray-transparent-05',
  '$color-gray-transparent-10',
  '$color-gray-transparent-20',
  '$color-gray-transparent-30',
  '$color-gray-transparent-40',
  '$color-gray-transparent-50',
  '$color-gray-transparent-60',
  '$color-gray-transparent-70',
  '$color-gray-transparent-80',
  '$color-gray-transparent-90',
])

export const bgTokens = asLiterals([
  '$bg-primary',
  '$bg-secondary',
  '$bg-disabled',
  '$bg-positive',
  '$bg-critical',
  '$bg-warning',
  '$bg-info',
  '$bg-inverted',
  '$bg-overlay',
  '$bg-skeleton',
  '$bg-action-neutral-tertiary',
  '$bg-action-neutral-tertiary-hover',
  '$bg-action-neutral-tertiary-pressed',
  '$bg-action-main-primary',
  '$bg-action-main-primary-hover',
  '$bg-action-main-primary-pressed',
  '$bg-action-main-secondary',
  '$bg-action-main-secondary-hover',
  '$bg-action-main-secondary-pressed',
  '$bg-action-main-tertiary',
  '$bg-action-main-tertiary-hover',
  '$bg-action-main-tertiary-pressed',
  '$bg-action-main-tertiary-selected',
  '$bg-action-critical-primary',
  '$bg-action-critical-primary-hover',
  '$bg-action-critical-primary-pressed',
  '$bg-action-critical-secondary',
  '$bg-action-critical-secondary-hover',
  '$bg-action-critical-secondary-pressed',
  '$bg-action-critical-tertiary',
  '$bg-action-critical-tertiary-hover',
  '$bg-action-critical-tertiary-pressed',
  '$bg-action-critical-tertiary-selected',
  '$bg-form-neutral',
  '$bg-form-neutral-hover',
  '$bg-form-neutral-pressed',
  '$bg-form-neutral-checked',
  '$bg-form-neutral-checked-hover',
  '$bg-form-neutral-checked-pressed',
  '$bg-form-neutral-inactive',
  '$bg-form-neutral-inactive-hover',
  '$bg-form-neutral-inactive-pressed',
  '$bg-form-neutral-active',
  '$bg-form-neutral-active-hover',
  '$bg-form-neutral-active-pressed',
  '$bg-form-control-hover',
  '$bg-form-control-checked',
  '$bg-form-control-checked-hover',
  '$bg-form-control-active',
  '$bg-form-control-active-hover',
  '$bg-form-control-inactive',
  '$bg-form-control-inactive-hover',
])

export const fgTokens = asLiterals([
  '$fg-primary',
  '$fg-secondary',
  '$fg-disabled',
  '$fg-inverted',
  '$fg-positive',
  '$fg-info',
  '$fg-critical',
  '$fg-warning',
  '$fg-action-neutral-tertiary',
  '$fg-action-neutral-tertiary-hover',
  '$fg-action-neutral-tertiary-pressed',
  '$fg-action-main-primary',
  '$fg-action-main-primary-hover',
  '$fg-action-main-primary-pressed',
  '$fg-action-main-secondary',
  '$fg-action-main-secondary-hover',
  '$fg-action-main-secondary-pressed',
  '$fg-action-main-tertiary',
  '$fg-action-main-tertiary-hover',
  '$fg-action-main-tertiary-pressed',
  '$fg-action-main-tertiary-selected',
  '$fg-action-critical-primary',
  '$fg-action-critical-primary-hover',
  '$fg-action-critical-primary-pressed',
  '$fg-action-critical-secondary',
  '$fg-action-critical-secondary-hover',
  '$fg-action-critical-secondary-pressed',
  '$fg-action-critical-tertiary',
  '$fg-action-critical-tertiary-hover',
  '$fg-action-critical-tertiary-pressed',
  '$fg-action-critical-tertiary-selected',
  '$fg-form-neutral',
  '$fg-form-neutral-checked',
  '$fg-form-control-checked',
])

export const borderTokens = asLiterals([
  '$border-neutral',
  '$border-main-selected',
  '$border-positive',
  '$border-info',
  '$border-critical',
  '$border-warning',
  '$border-disabled',
  '$border-form-neutral',
  '$border-form-neutral-hover',
  '$border-form-neutral-focus',
  '$border-form-neutral-pressed',
  '$border-form-neutral-checked',
  '$border-form-neutral-checked-hover',
  '$border-form-neutral-checked-pressed',
  '$border-form-critical',
  '$border-form-critical-hover',
  '$border-form-critical-focus',
  '$border-form-control',
  '$border-form-control-hover',
  '$border-form-control-checked',
  '$border-form-control-checked-hover',
])

export const shadowTokens = asLiterals([
  '$shadow-ring-critical',
  '$shadow-ring-neutral',
  '$shadow-ring-main',
  '$shadow-overlay-center',
  '$shadow-overlay-bottom',
])

export const textTokens = asLiterals([
  '$pageTitle',
  '$title1',
  '$title2',
  '$action1',
  '$action2',
  '$display',
  '$body',
  '$detail',
])

export const spaceTokens = asLiterals([
  '$space-0',
  '$space-05',
  '$space-1',
  '$space-2',
  '$space-3',
  '$space-4',
  '$space-5',
  '$space-6',
  '$space-7',
  '$space-8',
  '$space-10',
  '$space-12',
  '$space-16',
  '$space-20',
  '$space-24',
  '$space-28',
  '$space-32',
])

export const zTokens = asLiterals([
  '$z-1',
  '$z-2',
  '$z-3',
  '$z-4',
  '$z-5',
  '$z-6',
  '$z-7',
  '$z-8',
  '$z-9',
  '$z-10',
])

export const radiiTokens = asLiterals([
  '$radii-none',
  '$radii-pill',
  '$radii-base',
])