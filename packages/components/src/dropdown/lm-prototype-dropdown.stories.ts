// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../index.js';
import '@lm-prototype/icons/lm-prototype-icon';

interface DropdownArgs {
    variant: string;
    size: string;
    disabled: boolean;
    open: boolean;
    label: string;
    placeholder: string;
}


const row = 'display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start;min-height:200px;';
const col = 'display:flex;flex-direction:column;gap:16px;max-width:320px;min-height:250px;';

const note = (text: string) => html`
    <p style="
    margin: 0 0 16px;
    padding: 12px 16px;
    background: #f3f4f6;
    border-left: 3px solid #6b7280;
    border-radius: 0 6px 6px 0;
    font-size: 13px;
    line-height: 1.6;
    color: #374151;
    font-family: system-ui, sans-serif;
  ">${text}</p>
`;

const badge = (label: string, color = '#2563eb') => html`
    <span style="
    display:inline-block;
    padding:2px 8px;
    background:${color}18;
    color:${color};
    border:1px solid ${color}44;
    border-radius:4px;
    font-size:11px;
    font-weight:600;
    font-family:monospace;
    vertical-align:middle;
  ">${label}</span>
`;

const renderItems = () => html`
    <lm-prototype-dropdown-item value="option1">Account Settings</lm-prototype-dropdown-item>
    <lm-prototype-dropdown-item value="option2">Support & Help</lm-prototype-dropdown-item>
    <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 4px 0;" />
    <lm-prototype-dropdown-item value="logout">Sign out</lm-prototype-dropdown-item>
`;


const meta: Meta = {
    title: 'Components/Dropdown (Select)',
    component: 'lm-prototype-dropdown',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
A form-associated select component used to choose one value from a list of options.

- **Usage**: Used together with \`<lm-prototype-dropdown-item>\`.
- **Variants**: \`secondary\` (default), \`primary\`, \`tertiary\`
- **Form**: Participates natively via \`ElementInternals\`.
- **Accessibility**: Automatically handles \`aria-expanded\`, \`aria-haspopup="listbox"\`, and clicking outside.
        `.trim(),
            },
        },
    },
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['primary', 'secondary', 'tertiary'],
            description: 'Visual style of the trigger button',
        },
        size: {
            control: { type: 'select' },
            options: ['sm', 'md', 'lg'],
        },
        disabled: {
            control: 'boolean',
        },
        open: {
            control: 'boolean',
            description: 'Forces the dropdown to be open',
        },
        label: {
            control: 'text',
            description: 'Label shown above the dropdown',
        },
        placeholder: {
            control: 'text',
            description: 'Text shown when no option is selected',
        },
    },
    args: {
        variant: 'secondary',
        size: 'md',
        disabled: false,
        open: false,
        label: 'Select Category',
        placeholder: 'Choose an option...',
    },
};

export default meta;
type Story = StoryObj;


export const Default: Story = {
    render: (args: DropdownArgs) => html`
        <div style=${col}>
            <lm-prototype-dropdown
                    variant=${args.variant}
                    size=${args.size}
                    ?disabled=${args.disabled}
                    ?open=${args.open}
                    label=${ifDefined(args.label || undefined)}
                    placeholder=${ifDefined(args.placeholder || undefined)}
            >
                ${renderItems()}
            </lm-prototype-dropdown>
        </div>
    `,
};

export const Variants: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <div style=${row}>
            <lm-prototype-dropdown variant="primary" placeholder="Primary variant">
                ${renderItems()}
            </lm-prototype-dropdown>

            <lm-prototype-dropdown variant="secondary" placeholder="Secondary variant">
                ${renderItems()}
            </lm-prototype-dropdown>

            <lm-prototype-dropdown variant="tertiary" placeholder="Tertiary variant">
                ${renderItems()}
            </lm-prototype-dropdown>
        </div>
    `,
};

export const Sizes: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <div style=${row}>
            <lm-prototype-dropdown size="sm" placeholder="Small">
                ${renderItems()}
            </lm-prototype-dropdown>

            <lm-prototype-dropdown size="md" placeholder="Medium">
                ${renderItems()}
            </lm-prototype-dropdown>

            <lm-prototype-dropdown size="lg" placeholder="Large">
                ${renderItems()}
            </lm-prototype-dropdown>
        </div>
    `,
};


export const InAForm: Story = {
    name: 'A11y — Form Integration',
    parameters: { controls: { disable: true } },
    render: () => {
        const handleChange = (e: CustomEvent) => {
            const output = document.getElementById('dropdown-output');
            if (output) output.textContent = `Selected Value: ${e.detail.value} (Label: ${e.detail.label})`;
        };

        return html`
            <div style="font-family:system-ui,sans-serif;max-width:560px;display:flex;flex-direction:column;gap:16px;min-height:350px;">
                ${note(`
        The dropdown communicates with forms via ElementInternals and dispatches a standard "change" event
        when an item is selected. It updates its trigger text automatically.
      `)}

            <form
            @submit=${(e: Event) => {
                e.preventDefault();
                const data = new FormData(e.target as HTMLFormElement);
                alert('Submitted form data: \n' + JSON.stringify(Object.fromEntries(data), null, 2));
            }}
            style="display:flex;flex-direction:column;gap:16px;border:2px solid #e5e7eb;border-radius:8px;padding:20px;margin:0;"
                >

                <lm-prototype-dropdown
            name="systemRole"
            label="User Role"
            placeholder="Select a role..."
            required
        @change=${handleChange}
        >
            <lm-prototype-dropdown-item value="admin">Administrator</lm-prototype-dropdown-item>
                <lm-prototype-dropdown-item value="editor">Editor</lm-prototype-dropdown-item>
                <lm-prototype-dropdown-item value="viewer">Viewer</lm-prototype-dropdown-item>
                </lm-prototype-dropdown>

                <p id="dropdown-output" style="margin: 0; font-size: 13px; color: #059669; font-weight: 600;">
                Selected Value: (none)
            </p>

            <div style="margin-top: 16px;">
                <lm-prototype-button type="submit">Save Form</lm-prototype-button>
            </div>
            </form>

            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:16px;">
                ${badge('ElementInternals form value', '#059669')}
            ${badge('composed CustomEvent("change")', '#059669')}
            ${badge('role="listbox" & role="option"', '#7c3aed')}
            </div>
            </div>
                `;
    },
};