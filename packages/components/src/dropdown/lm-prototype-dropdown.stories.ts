// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../index.js';
import '@lm-prototype/icons/lm-prototype-icon';

interface DropdownArgs {
    variant: string;
    size: string;
    disabled: boolean;
    open: boolean;
    label: string;
}

// ─── Shared style helpers ──────────────────────────────────────────────────

const row = 'display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start;min-height:200px;';

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

// Helper for realistic menu items
const menuStyle = "padding: 8px; display: flex; flex-direction: column; gap: 4px; min-width: 180px;";
const itemStyle = "padding: 8px 12px; border-radius: 4px; cursor: pointer; font-size: 14px; font-family: system-ui, sans-serif; color: #374151; text-decoration: none;";
const itemHover = "onmouseover=\"this.style.backgroundColor='#f3f4f6'\" onmouseout=\"this.style.backgroundColor='transparent'\"";

const sampleMenu = html`
    <div style=${menuStyle}>
        <a href="#" style=${itemStyle} ${itemHover}>Account settings</a>
        <a href="#" style=${itemStyle} ${itemHover}>Support</a>
        <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 4px 0;" />
        <a href="#" style="${itemStyle} color: #dc2626;" ${itemHover}>Sign out</a>
    </div>
`;

// ─── Meta ─────────────────────────────────────────────────────────────────

const meta: Meta = {
    title: 'Components/Dropdown',
    component: 'lm-prototype-dropdown',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
A structural component used to display a hidden panel of choices or actions.

- **Variants**: \`secondary\` (default), \`primary\`, \`tertiary\`
- **Sizes**: \`sm\`, \`md\` (default), \`lg\`
- **States**: \`open\`, \`disabled\`
- **Slots**: \`label\` (the trigger text), \`icon\` (overrides default chevron), default (panel content)
- **Accessibility**: Automatically handles \`aria-expanded\`, \`aria-hidden\`, Escape-key to close, and clicking outside.
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
        },
    },
    args: {
        variant: 'secondary',
        size: 'md',
        disabled: false,
        open: false,
        label: 'Options',
    },
};

export default meta;
type Story = StoryObj;

// ─── Visual stories ────────────────────────────────────────────────────────

/** Default dropdown. Secondary is the standard variant for dropdown triggers. */
export const Default: Story = {
    render: (args: DropdownArgs) => html`
    <div style="min-height: 250px;">
        <lm-prototype-dropdown variant=${args.variant} size=${args.size} ?disabled=${args.disabled} ?open=${args.open}>
            <span slot="label">${args.label}</span>
            ${sampleMenu}
        </lm-prototype-dropdown>
    </div>
  `,
};

/** The three supported variants for dropdown triggers. */
export const Variants: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
    <div style=${row}>
        <lm-prototype-dropdown variant="primary">
            <span slot="label">Primary Dropdown</span>
            ${sampleMenu}
        </lm-prototype-dropdown>
        
        <lm-prototype-dropdown variant="secondary">
            <span slot="label">Secondary Dropdown</span>
            ${sampleMenu}
        </lm-prototype-dropdown>
        
        <lm-prototype-dropdown variant="tertiary">
            <span slot="label">Tertiary Dropdown</span>
            ${sampleMenu}
        </lm-prototype-dropdown>
    </div>
  `,
};

/** Dropdowns in different sizes. */
export const Sizes: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
    <div style=${row}>
        <lm-prototype-dropdown size="sm">
            <span slot="label">Small</span>
            ${sampleMenu}
        </lm-prototype-dropdown>
        
        <lm-prototype-dropdown size="md">
            <span slot="label">Medium</span>
            ${sampleMenu}
        </lm-prototype-dropdown>
        
        <lm-prototype-dropdown size="lg">
            <span slot="label">Large</span>
            ${sampleMenu}
        </lm-prototype-dropdown>
    </div>
  `,
};

/** * ## Custom Content
 * You can put anything inside the dropdown panel, not just lists.
 */
export const CustomContent: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
    <div style="min-height: 300px;">
        <lm-prototype-dropdown>
            <span slot="label">Filter by Date</span>
            
            <div style="padding: 16px; width: 250px; font-family: system-ui;">
                <h4 style="margin: 0 0 12px; color: #111827;">Select Date Range</h4>
                <input type="date" style="width: 100%; padding: 8px; margin-bottom: 8px; box-sizing: border-box;" />
                <input type="date" style="width: 100%; padding: 8px; margin-bottom: 16px; box-sizing: border-box;" />
                <lm-prototype-button style="width: 100%;">Apply Filter</lm-prototype-button>
            </div>
        </lm-prototype-dropdown>
    </div>
  `,
};

// ─── Accessibility stories ─────────────────────────────────────────────────

export const A11yDetails: Story = {
    name: 'A11y — Keyboard & ARIA',
    parameters: { controls: { disable: true } },
    render: () => html`
    <div style="font-family:system-ui,sans-serif;max-width:560px;display:flex;flex-direction:column;gap:16px;min-height:300px;">
      ${note(`
        The dropdown automatically handles the required ARIA states. Screen readers 
        announce it as a popup button, and will inform the user when it expands or collapses.
        Try opening it and pressing the Escape key!
      `)}

      <div>
        <lm-prototype-dropdown variant="primary">
            <span slot="label">Accessible Menu</span>
            ${sampleMenu}
        </lm-prototype-dropdown>
      </div>

      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:16px;">
        ${badge('aria-haspopup="true"', '#059669')}
        ${badge('aria-expanded="true/false"', '#059669')}
        ${badge('Closes on outside click', '#7c3aed')}
        ${badge('Closes on Escape key', '#7c3aed')}
      </div>
    </div>
  `,
};