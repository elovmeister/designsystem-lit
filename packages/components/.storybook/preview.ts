import type { Preview } from '@storybook/web-components';
import '@lm-prototype/tokens/themes/light.css';
import '@lm-prototype/tokens/themes/dark.css';

const preview: Preview = {
    globalTypes: {
        theme: {
            defaultValue: 'light',
            toolbar: {
                title: 'Theme',
                items: [
                    { value: 'light', title: 'Light' },
                    { value: 'dark',  title: 'Dark' },
                ],
            },
        },
    },
    decorators: [
        (story, context) => {
            const theme = context.globals['theme'] ?? 'light';
            document.documentElement.dataset['theme'] = theme === 'dark' ? 'dark' : '';
            return story();
        },
    ],
};

export default preview;