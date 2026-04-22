export const iconRegistry = {
    'arrow-right':  '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    'check':        '<path d="M20 6 9 17l-5-5"/>',
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    'loader':       '<path d="M21 12a9 9 0 1 1-6.219-8.56"/>',
    'x':            '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
} as const;

export type IconName = keyof typeof iconRegistry;