import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../index.js';

const meta: Meta = {
    title: 'Components/Button',
    component: 'lm-prototype-button',
    tags: ['autodocs'],
};
export default meta;

type Story = StoryObj;

export const Primary: Story = {
    render: () => html`<lm-prototype-button variant="primary">Klicka här</lm-prototype-button>`,
};