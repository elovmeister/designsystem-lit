// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../index.js';
import '@lm-prototype/icons/lm-prototype-icon';

interface CheckboxArgs {
    label: string;
    checked: boolean;
    disabled: boolean;
    required: boolean;
}

const row = 'display:flex;gap:16px;flex-wrap:wrap;align-items:center;';
const col = 'display:flex;flex-direction:column;gap:16px;max-width:320px;';

const meta: Meta = {
    title: 'Components/Checkbox',
    component: 'lm-prototype-checkbox',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
A custom checkbox element for boolean choices. Integrates natively with forms.
        `.trim(),
            },
        },
    },
    argTypes: {
        label: { control: 'text' },
        checked: { control: 'boolean' },
        disabled: { control: 'boolean' },
        required: { control: 'boolean' },
    },
    args: {
        label: 'I accept the terms and conditions',
        checked: false,
        disabled: false,
        required: false,
    },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: (args: CheckboxArgs) => html`
        <lm-prototype-checkbox 
            label=${args.label} 
            ?checked=${args.checked} 
            ?disabled=${args.disabled}
            ?required=${args.required}
        ></lm-prototype-checkbox>
    `,
};

export const States: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
    <div style=${col}>
        <lm-prototype-checkbox label="Unchecked"></lm-prototype-checkbox>
        <lm-prototype-checkbox label="Checked" checked></lm-prototype-checkbox>
        <lm-prototype-checkbox label="Disabled unchecked" disabled></lm-prototype-checkbox>
        <lm-prototype-checkbox label="Disabled checked" disabled checked></lm-prototype-checkbox>
    </div>
  `,
};

export const InAForm: Story = {
    name: 'Form Integration',
    parameters: { controls: { disable: true } },
    render: () => html`
    <div style="font-family:system-ui,sans-serif;max-width:400px;">
      <form
          @submit=${(e: Event) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);
        alert('Submitted form data: \n' + JSON.stringify(Object.fromEntries(data), null, 2));
    }}
          style="display:flex;flex-direction:column;gap:16px;border:1px solid #e5e7eb;border-radius:8px;padding:20px;"
        >
        
        <h4 style="margin: 0;">Configuration</h4>
        <lm-prototype-checkbox name="printStrategy" value="active" label="Enable PrintStrategy"></lm-prototype-checkbox>
        <lm-prototype-checkbox name="exportStrategy" value="active" label="Enable ExportStrategy" checked></lm-prototype-checkbox>
        <lm-prototype-checkbox name="terms" value="accepted" label="Accept terms" required></lm-prototype-checkbox>

        <div style="margin-top: 8px;">
            <lm-prototype-button type="submit">Save</lm-prototype-button>
        </div>
      </form>
    </div>
  `,
};