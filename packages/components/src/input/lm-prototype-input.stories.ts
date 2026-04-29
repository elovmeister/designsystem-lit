// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore — @storybook/web-components types are resolved at Storybook runtime
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../index.js';
import '@lm-prototype/icons/lm-prototype-icon';

interface InputArgs {
    label: string;
    placeholder: string;
    value: string;
    type: string;
    size: string;
    disabled: boolean;
    readonly: boolean;
    required: boolean;
    name: string;
}


const row = 'display:flex;gap:16px;flex-wrap:wrap;align-items:flex-end;';
const col = 'display:flex;flex-direction:column;gap:16px;max-width:320px;';

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


const meta: Meta = {
    title: 'Components/Input',
    component: 'lm-prototype-input',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
The standard text entry field for forms in the design system.

- **Types**: \`text\` (default), \`email\`, \`password\`, \`number\`, \`search\`, \`tel\`, \`url\`
- **Sizes**: \`sm\`, \`md\` (default), \`lg\`
- **States**: \`disabled\`, \`readonly\`, \`required\`
- **Slots**: \`start\` (icon/prefix), \`end\` (icon/suffix)
- **Form**: participates natively via \`ElementInternals\`

### Token overrides

\`\`\`css
lm-prototype-input {
  --lm-prototype-input-border-focus: var(--lm-prototype-color-action-primary);
  --lm-prototype-input-background: #ffffff;
}
\`\`\`
        `.trim(),
            },
        },
    },
    argTypes: {
        label: {
            control: 'text',
            description: 'Visible label above the input field',
        },
        placeholder: {
            control: 'text',
            description: 'Placeholder text shown when field is empty',
        },
        value: {
            control: 'text',
            description: 'The current value of the input',
        },
        type: {
            control: { type: 'select' },
            options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
            description: 'Standard HTML input type',
            table: { defaultValue: { summary: 'text' } },
        },
        size: {
            control: { type: 'select' },
            options: ['sm', 'md', 'lg'],
            description: 'Input sizing variant',
            table: { defaultValue: { summary: 'md' } },
        },
        disabled: {
            control: 'boolean',
            description: 'Prevents interaction and dims the field',
            table: { defaultValue: { summary: 'false' } },
        },
        readonly: {
            control: 'boolean',
            description: 'Prevents editing but remains focusable and copyable',
            table: { defaultValue: { summary: 'false' } },
        },
        required: {
            control: 'boolean',
            description: 'Marks the field as required for form submission',
            table: { defaultValue: { summary: 'false' } },
        },
    },
    args: {
        label: 'Username',
        placeholder: 'Enter your username',
        type: 'text',
        size: 'md',
        disabled: false,
        readonly: false,
        required: false,
        value: '',
    },
};

export default meta;
type Story = StoryObj;


export const Default: Story = {
    render: (args: InputArgs) => html`
    <div style=${col}>
      <lm-prototype-input
        label=${ifDefined(args.label || undefined)}
        placeholder=${ifDefined(args.placeholder || undefined)}
        value=${ifDefined(args.value || undefined)}
        type=${args.type}
        size=${args.size}
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        ?required=${args.required}
      ></lm-prototype-input>
    </div>
  `,
};

export const WithoutLabel: Story = {
    args: { label: '' },
    render: (args: InputArgs) => html`
    <div style=${col}>
      <lm-prototype-input
        placeholder="Search..."
        aria-label="Search site content"
        size=${args.size}
      ></lm-prototype-input>
    </div>
  `,
};

export const AllSizes: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
    <div style=${col}>
      <lm-prototype-input size="sm" label="Small (sm)" placeholder="Enter value"></lm-prototype-input>
      <lm-prototype-input size="md" label="Medium (md)" placeholder="Enter value"></lm-prototype-input>
      <lm-prototype-input size="lg" label="Large (lg)" placeholder="Enter value"></lm-prototype-input>
    </div>
  `,
};

export const WithIcons: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
    <div style=${col}>
      <lm-prototype-input label="Search (Start slot)" placeholder="Find a document...">
        <lm-prototype-icon slot="start" name="search"></lm-prototype-icon>
      </lm-prototype-input>
      
      <lm-prototype-input label="Price (Start text slot)" type="number" placeholder="0.00">
        <span slot="start" style="font-weight: 500;">kr</span>
      </lm-prototype-input>

      <lm-prototype-input label="Clearable (End slot)" value="Some text data">
        <lm-prototype-button slot="end" variant="tertiary" size="sm" aria-label="Clear field" style="margin-right: -8px;">
           <lm-prototype-icon slot="start" name="x"></lm-prototype-icon>
        </lm-prototype-button>
      </lm-prototype-input>
    </div>
  `,
};

export const States: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
    <div style=${row}>
      <div style="width: 250px;">
        <lm-prototype-input label="Disabled field" disabled value="Uneditable data"></lm-prototype-input>
      </div>
      <div style="width: 250px;">
        <lm-prototype-input label="Readonly field" readonly value="Copyable data"></lm-prototype-input>
      </div>
    </div>
  `,
};


/**
 * ## Required and Invalid states
 *
 * Use the `required` property to visually mark the field and enforce native validation.
 * Use `aria-invalid="true"` to tell screen readers that the current input is erroneous.
 */
export const A11yValidation: Story = {
    name: 'A11y — Validation (Required & Invalid)',
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: `
<lm-prototype-input
  label="Email address"
  required
  aria-invalid={hasError ? 'true' : 'false'}
  aria-describedby="email-error"
></lm-prototype-input>
<p id="email-error" class="error-msg">Please enter a valid format.</p>
        `.trim(),
            },
        },
    },
    render: () => {
        const handleInput = (e: Event) => {
            const input = e.target as HTMLElement;
            const value = (e as CustomEvent).detail;
            const errorMsg = document.getElementById('a11y-error-msg');

            if (value && !value.includes('@')) {
                input.setAttribute('aria-invalid', 'true');
                if (errorMsg) errorMsg.hidden = false;
            } else {
                input.removeAttribute('aria-invalid');
                if (errorMsg) errorMsg.hidden = true;
            }
        };

        return html`
      <div style="font-family:system-ui,sans-serif;max-width:560px;display:flex;flex-direction:column;gap:16px;">
        ${note(`
          Type an invalid email (without '@'). The component will set aria-invalid="true", 
          and the error message is linked via aria-describedby.
        `)}

        <div style=${col}>
          <lm-prototype-input 
            label="Email address (Required)" 
            type="email"
            required
            aria-describedby="a11y-error-msg"
            @input=${handleInput}
          ></lm-prototype-input>
          <p id="a11y-error-msg" hidden
             style="margin:-12px 0 0;font-size:13px;color:#dc2626;">
             Please include an '@' in the email address.
          </p>
        </div>

        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          ${badge('required', '#dc2626')}
          ${badge('aria-invalid', '#dc2626')}
          ${badge('aria-describedby', '#dc2626')}
        </div>
      </div>
    `;
    },
};

/**
 * ## In a form — Live Events and Submission
 *
 * `<lm-prototype-input>` participates natively in forms via `ElementInternals`.
 * It correctly passes its value on submit and dispatches native-feeling `input` and `change`
 * events through the Shadow DOM for easy state management in React/Angular.
 */
export const A11yInAForm: Story = {
    name: 'A11y — In a form (Events)',
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: `
<form onSubmit={handleSubmit}>
  <LmPrototypeInput name="username" label="Username" required />
  <LmPrototypeInput name="title" label="Title" onInput={handleLivePreview} />
  <LmPrototypeButton type="submit">Save Profile</LmPrototypeButton>
</form>
        `.trim(),
            },
        },
    },
    render: () => {
        const handlePreview = (e: CustomEvent) => {
            const previewEl = document.getElementById('form-preview-val');
            if (previewEl) previewEl.textContent = e.detail || '...';
        };

        return html`
      <div style="font-family:system-ui,sans-serif;max-width:560px;display:flex;flex-direction:column;gap:16px;">
        ${note(`
          Try typing in the Job Title to see the live event firing through the Shadow DOM.
          Hit 'Save' to see native form submission pick up the values.
        `)}

        <div style="padding:12px 16px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;font-size:14px;color:#1e3a8a;">
          <strong>Live Preview:</strong> <span id="form-preview-val">...</span>
        </div>

        <form
          @submit=${(e: Event) => {
            e.preventDefault();
            const data = new FormData(e.target as HTMLFormElement);
            alert('Submitted form data: \n' + JSON.stringify(Object.fromEntries(data), null, 2));
        }}
          style="display:flex;flex-direction:column;gap:16px;border:2px solid #e5e7eb;border-radius:8px;padding:20px;margin:0;"
        >
          <lm-prototype-input name="username" label="Username" required></lm-prototype-input>
          
          <lm-prototype-input 
            name="jobTitle" 
            label="Job Title" 
            placeholder="Type to test events..."
            @input=${handlePreview}
          ></lm-prototype-input>

          <div style=${row}>
            <lm-prototype-button type="submit">Save Profile</lm-prototype-button>
            <lm-prototype-button type="reset" variant="tertiary">Reset</lm-prototype-button>
          </div>
        </form>

        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          ${badge('ElementInternals form value', '#059669')}
          ${badge('composed CustomEvent("input")', '#059669')}
        </div>
      </div>
    `;
    },
};