import type { Preview } from '@storybook/web-components';
import '@lm-prototype/tokens/themes/light.css';
import '@lm-prototype/tokens/themes/dark.css';

const preview: Preview = {
    globalTypes: {
        theme: {
            description: 'Color theme',
            defaultValue: 'light',
            toolbar: {
                title: 'Theme',
                icon: 'circlehollow',
                items: [
                    { value: 'light', title: 'Light', icon: 'sun' },
                    { value: 'dark',  title: 'Dark',  icon: 'moon' },
                ],
                dynamicTitle: true,
            },
        },
    },
    decorators: [
        (story, context) => {
            const theme = context.globals['theme'] as string ?? 'light';
            document.documentElement.dataset['theme'] = theme === 'dark' ? 'dark' : '';
            document.body.style.background =
                theme === 'dark' ? 'var(--lm-prototype-color-surface-default)' : '';
            document.body.style.color =
                theme === 'dark' ? 'var(--lm-prototype-color-text-primary)' : '';
            return story();
        },
    ],
    parameters: {
        backgrounds: { disable: true },
        layout: 'centered',
    },
};

export default preview;