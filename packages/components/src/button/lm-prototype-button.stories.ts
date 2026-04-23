// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore — @storybook/web-components types are resolved at Storybook runtime
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../index.js';
import '@lm-prototype/icons/lm-prototype-icon';

interface ButtonArgs {
    variant: string;
    size: string;
    disabled: boolean;
    loading: boolean;
    label: string;
}

// ─── Shared style helpers ──────────────────────────────────────────────────

const row = 'display:flex;gap:12px;flex-wrap:wrap;align-items:center;';

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

// ─── Meta ─────────────────────────────────────────────────────────────────

const meta: Meta = {
    title: 'Components/Button',
    component: 'lm-prototype-button',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
The primary interactive element in the design system.

- **Variants**: \`primary\` (default), \`secondary\`, \`tertiary\`, \`danger\`
- **Sizes**: \`sm\`, \`md\` (default), \`lg\`
- **States**: \`loading\`, \`disabled\`
- **Slots**: default (label), \`start\` (icon before), \`end\` (icon after)
- **Form**: participates via \`ElementInternals\` — see the _Accessibility_ stories

### Token overrides

All component-level CSS custom properties fall back to semantic design tokens:

\`\`\`css
lm-prototype-button {
  --lm-prototype-button-background: hotpink;
}
\`\`\`
        `.trim(),
            },
        },
    },
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['primary', 'secondary', 'tertiary', 'danger'],
            description: 'Visual style variant',
            table: { defaultValue: { summary: 'primary' } },
        },
        size: {
            control: { type: 'select' },
            options: ['sm', 'md', 'lg'],
            description: 'Button size',
            table: { defaultValue: { summary: 'md' } },
        },
        disabled: {
            control: 'boolean',
            description: 'Prevents interaction and dims the button',
            table: { defaultValue: { summary: 'false' } },
        },
        loading: {
            control: 'boolean',
            description: 'Shows a spinner; interaction is blocked during loading',
            table: { defaultValue: { summary: 'false' } },
        },
        label: {
            control: 'text',
            description: 'Button label (default slot content in the story)',
        },
    },
    args: {
        variant: 'primary',
        size: 'md',
        disabled: false,
        loading: false,
        label: 'Button',
    },
};

export default meta;
type Story = StoryObj;

// ─── Visual stories ────────────────────────────────────────────────────────

/** The default primary call-to-action button. */
export const Primary: Story = {
    render: (args: ButtonArgs) => html`
    <lm-prototype-button variant=${args.variant} size=${args.size}
      ?disabled=${args.disabled} ?loading=${args.loading}>
      ${args.label}
    </lm-prototype-button>
  `,
};

/** Secondary button for supporting actions. */
export const Secondary: Story = {
    args: { variant: 'secondary', label: 'Secondary' },
    render: (args: ButtonArgs) => html`
    <lm-prototype-button variant=${args.variant} size=${args.size}
      ?disabled=${args.disabled} ?loading=${args.loading}>
      ${args.label}
    </lm-prototype-button>
  `,
};

/** Tertiary/ghost button for low-emphasis actions. */
export const Tertiary: Story = {
    args: { variant: 'tertiary', label: 'Tertiary' },
    render: (args: ButtonArgs) => html`
    <lm-prototype-button variant=${args.variant} size=${args.size}
      ?disabled=${args.disabled} ?loading=${args.loading}>
      ${args.label}
    </lm-prototype-button>
  `,
};

/** Danger button for destructive actions (delete, revoke, etc.). */
export const Danger: Story = {
    args: { variant: 'danger', label: 'Delete' },
    render: (args: ButtonArgs) => html`
    <lm-prototype-button variant=${args.variant} size=${args.size}
      ?disabled=${args.disabled} ?loading=${args.loading}>
      ${args.label}
    </lm-prototype-button>
  `,
};

/** All four variants side by side. */
export const AllVariants: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
    <div style=${row}>
      <lm-prototype-button variant="primary">Primary</lm-prototype-button>
      <lm-prototype-button variant="secondary">Secondary</lm-prototype-button>
      <lm-prototype-button variant="tertiary">Tertiary</lm-prototype-button>
      <lm-prototype-button variant="danger">Danger</lm-prototype-button>
    </div>
  `,
};

/** All three sizes side by side. */
export const AllSizes: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
    <div style=${row}>
      <lm-prototype-button size="sm">Small</lm-prototype-button>
      <lm-prototype-button size="md">Medium</lm-prototype-button>
      <lm-prototype-button size="lg">Large</lm-prototype-button>
    </div>
  `,
};

/** Buttons with icons in the start/end slots. */
export const WithIcons: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
    <div style=${row}>
      <lm-prototype-button variant="primary">
        <lm-prototype-icon slot="start" name="arrow-right"></lm-prototype-icon>
        Continue
      </lm-prototype-button>
      <lm-prototype-button variant="secondary">
        Save
        <lm-prototype-icon slot="end" name="check"></lm-prototype-icon>
      </lm-prototype-button>
      <lm-prototype-button variant="danger">
        <lm-prototype-icon slot="start" name="x"></lm-prototype-icon>
        Remove
      </lm-prototype-button>
      <lm-prototype-button variant="tertiary">
        More
        <lm-prototype-icon slot="end" name="chevron-down"></lm-prototype-icon>
      </lm-prototype-button>
    </div>
  `,
};

/** Loading state — aria-busy is set on the inner button; spinner replaces the start-slot icon. */
export const Loading: Story = {
    args: { loading: true, label: 'Saving…' },
    render: ({ label }: ButtonArgs) => html`
    <div style=${row}>
      <lm-prototype-button loading>${label}</lm-prototype-button>
      <lm-prototype-button loading variant="secondary">${label}</lm-prototype-button>
      <lm-prototype-button loading variant="danger">${label}</lm-prototype-button>
    </div>
  `,
};

/** Disabled state across all variants. */
export const Disabled: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
    <div style=${row}>
      <lm-prototype-button disabled>Primary</lm-prototype-button>
      <lm-prototype-button disabled variant="secondary">Secondary</lm-prototype-button>
      <lm-prototype-button disabled variant="tertiary">Tertiary</lm-prototype-button>
      <lm-prototype-button disabled variant="danger">Danger</lm-prototype-button>
    </div>
  `,
};

// ─── Accessibility stories ─────────────────────────────────────────────────
//
// These stories cover the *consumer-facing* accessibility patterns for button.
// For the architectural background — ElementInternals, shadow DOM forwarding,
// how component authors expose ARIA — see Foundations → Accessibility.

/**
 * ## Icon-only button
 *
 * An icon-only button has no visible text, so assistive tech has nothing to
 * announce. Provide an accessible name with `aria-label` on the host.
 *
 * The attribute is forwarded to the inner `<button>` in the shadow root, so
 * screen readers announce "Close dialog, button".
 */
export const A11yIconOnly: Story = {
    name: 'A11y — Icon-only button',
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: `
<!-- Without aria-label an icon-only button has no accessible name (axe violation) -->
<lm-prototype-button aria-label="Close dialog" variant="tertiary">
  <lm-prototype-icon slot="start" name="x"></lm-prototype-icon>
</lm-prototype-button>
        `.trim(),
            },
        },
    },
    render: () => html`
    <div style="font-family:system-ui,sans-serif;max-width:560px;display:flex;flex-direction:column;gap:16px;">
      ${note(`
        Every icon-only button must have aria-label (or aria-labelledby).
        Without it, screen readers announce nothing meaningful and axe-core
        will flag the violation.
      `)}

      <div style=${row}>
        <lm-prototype-button aria-label="Close dialog" variant="tertiary">
          <lm-prototype-icon slot="start" name="x"></lm-prototype-icon>
        </lm-prototype-button>
        <lm-prototype-button aria-label="Confirm" variant="primary">
          <lm-prototype-icon slot="start" name="check"></lm-prototype-icon>
        </lm-prototype-button>
        <lm-prototype-button aria-label="Delete item" variant="danger">
          <lm-prototype-icon slot="start" name="x"></lm-prototype-icon>
        </lm-prototype-button>
      </div>

      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        ${badge('aria-label', '#7c3aed')}
        ${badge('forwarded to inner <button>', '#7c3aed')}
      </div>
    </div>
  `,
};

/**
 * ## Toggle button — `aria-pressed`
 *
 * For buttons that act as an on/off switch (bold, mute, pin), reflect the
 * active state with `aria-pressed="true" | "false"`. Screen readers announce
 * "pressed" / "not pressed".
 *
 * Keep the attribute in sync with the visual state — if the button looks
 * active but `aria-pressed` stays `"false"`, AT users get the wrong picture.
 */
export const A11yTogglePressed: Story = {
    name: 'A11y — Toggle (aria-pressed)',
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: `
const [bold, setBold] = useState(false);

<LmPrototypeButton
  aria-label="Bold"
  aria-pressed={bold ? 'true' : 'false'}
  variant={bold ? 'primary' : 'secondary'}
  onClick={() => setBold(b => !b)}
>
  <lm-prototype-icon slot="start" name="check" />
</LmPrototypeButton>
        `.trim(),
            },
        },
    },
    render: () => {
        const toggle = (e: Event) => {
            const btn = e.currentTarget as HTMLElement;
            const pressed = btn.getAttribute('aria-pressed') === 'true';
            btn.setAttribute('aria-pressed', pressed ? 'false' : 'true');
            btn.setAttribute('variant', pressed ? 'secondary' : 'primary');
        };

        return html`
      <div style="font-family:system-ui,sans-serif;max-width:560px;display:flex;flex-direction:column;gap:16px;">
        ${note(`
          Click to toggle. aria-pressed flips between "true" and "false" so
          screen readers announce the state. The visual variant change is
          purely cosmetic — aria-pressed is what AT users hear.
        `)}

        <div style=${row}>
          <lm-prototype-button aria-label="Bold" aria-pressed="false" variant="secondary" @click=${toggle}>
            <strong>B</strong>
          </lm-prototype-button>
          <lm-prototype-button aria-label="Italic" aria-pressed="false" variant="secondary" @click=${toggle}>
            <em>I</em>
          </lm-prototype-button>
          <lm-prototype-button aria-label="Underline" aria-pressed="false" variant="secondary" @click=${toggle}>
            <u>U</u>
          </lm-prototype-button>
        </div>

        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          ${badge('aria-pressed="true"', '#dc2626')}
          ${badge('aria-pressed="false"', '#dc2626')}
        </div>
      </div>
    `;
    },
};

/**
 * ## Disclosure button — `aria-expanded` + `aria-controls`
 *
 * A button that toggles the visibility of another region (menu, accordion,
 * filter panel) needs two attributes:
 *
 * - `aria-expanded="true" | "false"` — is the region currently open?
 * - `aria-controls="<id of the region>"` — which element does this button open?
 *
 * If the region is a menu, listbox, dialog, tree, or grid, also set
 * `aria-haspopup` with the matching role.
 */
export const A11yDisclosure: Story = {
    name: 'A11y — Disclosure (aria-expanded)',
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: `
const [open, setOpen] = useState(false);

<LmPrototypeButton
  aria-expanded={open ? 'true' : 'false'}
  aria-controls="filter-panel"
  aria-haspopup="true"
  onClick={() => setOpen(o => !o)}
>
  Filters
  <lm-prototype-icon slot="end" name="chevron-down" />
</LmPrototypeButton>

<div id="filter-panel" hidden={!open}>…</div>
        `.trim(),
            },
        },
    },
    render: () => {
        const toggle = (e: Event) => {
            const btn = e.currentTarget as HTMLElement;
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');

            const panelId = btn.getAttribute('aria-controls');
            if (panelId) {
                const panel = document.getElementById(panelId);
                if (panel) panel.hidden = expanded;
            }
        };

        return html`
      <div style="font-family:system-ui,sans-serif;max-width:560px;display:flex;flex-direction:column;gap:16px;">
        ${note(`
          aria-expanded tells AT whether the region is open. aria-controls
          links the button to the region it controls — screen readers offer
          a shortcut to jump directly to it. aria-haspopup hints what kind
          of popup will appear.
        `)}

        <div>
          <lm-prototype-button
            variant="secondary"
            aria-expanded="false"
            aria-controls="filter-panel"
            aria-haspopup="true"
            @click=${toggle}
          >
            Filters
            <lm-prototype-icon slot="end" name="chevron-down"></lm-prototype-icon>
          </lm-prototype-button>

          <div id="filter-panel" hidden
            style="margin-top:12px;padding:16px;border:1px solid #e5e7eb;border-radius:8px;
                   background:#f9fafb;font-size:14px;color:#374151;">
            <strong>Filter panel</strong>
            <p style="margin:8px 0 0;font-size:13px;color:#6b7280;">
              This region is linked to the button above by <code>aria-controls</code>.
              Screen readers let the user jump here directly.
            </p>
          </div>
        </div>

        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          ${badge('aria-expanded', '#059669')}
          ${badge('aria-controls', '#059669')}
          ${badge('aria-haspopup', '#059669')}
        </div>
      </div>
    `;
    },
};

/**
 * ## Extra description — `aria-describedby`
 *
 * Use `aria-describedby` when a button needs a helper message alongside its
 * label. Point at the id of an element that holds the description — screen
 * readers announce it after the label.
 *
 * Good fit: destructive actions, financial actions, anything where the
 * consequences aren't obvious from the label alone.
 */
export const A11yDescribedBy: Story = {
    name: 'A11y — Described-by',
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: `
<LmPrototypeButton variant="danger" aria-describedby="delete-hint">
  Delete account
</LmPrototypeButton>
<p id="delete-hint" className="hint">
  This action cannot be undone.
</p>
        `.trim(),
            },
        },
    },
    render: () => html`
    <div style="font-family:system-ui,sans-serif;max-width:560px;display:flex;flex-direction:column;gap:16px;">
      ${note(`
        Screen readers read "Delete account, button. This action cannot be
        undone." The button gets the warning baked into its announcement.
      `)}

      <div>
        <lm-prototype-button variant="danger" aria-describedby="delete-hint">
          Delete account
        </lm-prototype-button>
        <p id="delete-hint"
          style="margin:8px 0 0;font-size:13px;color:#6b7280;">
          This action cannot be undone.
        </p>
      </div>

      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        ${badge('aria-describedby', '#2563eb')}
        ${badge('id on helper text', '#2563eb')}
      </div>
    </div>
  `,
};

/**
 * ## In a form — submit, reset, and fieldset propagation
 *
 * `<lm-prototype-button>` participates in forms via `ElementInternals`. This story
 * combines three behaviours in one live demo:
 *
 * - `type="submit"` triggers native form validation and submission.
 * - `type="reset"` clears the form without any event listener wiring.
 * - A disabled `<fieldset>` disables every `<lm-prototype-button>` inside it
 *   automatically — no JS required.
 *
 * See **Foundations → Accessibility** for how this is implemented.
 */
export const A11yInAForm: Story = {
    name: 'A11y — In a form',
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: `
<form onSubmit={handleSubmit}>
  <fieldset disabled={isSubmitting}>
    <label htmlFor="email">Email</label>
    <input id="email" name="email" type="email" required />

    <LmPrototypeButton type="submit">Subscribe</LmPrototypeButton>     {/* requestSubmit() */}
    <LmPrototypeButton type="reset" variant="tertiary">      {/* form.reset() */}
      Clear
    </LmPrototypeButton>
  </fieldset>
</form>
        `.trim(),
            },
        },
    },
    render: () => {
        let fieldsetEl: HTMLFieldSetElement | null = null;

        const toggle = (e: Event) => {
            const cb = e.target as HTMLInputElement;
            if (fieldsetEl) fieldsetEl.disabled = cb.checked;
        };

        return html`
      <div style="font-family:system-ui,sans-serif;max-width:560px;display:flex;flex-direction:column;gap:16px;">
        ${note(`
          Submit runs native validation (try submitting empty). Reset clears
          without any JS wiring. Toggle the fieldset checkbox and every
          lm-prototype-button inside disables at once.
        `)}

        <label style="display:flex;align-items:center;gap:8px;font-size:14px;font-weight:500;cursor:pointer;">
          <input type="checkbox" @change=${toggle}
            style="width:16px;height:16px;cursor:pointer;" />
          Disable the fieldset
        </label>

        <form
          @submit=${(e: Event) => {
            e.preventDefault();
            const data = new FormData(e.target as HTMLFormElement);
            alert('Submitted: ' + JSON.stringify(Object.fromEntries(data)));
        }}
          style="display:flex;flex-direction:column;gap:16px;"
        >
          <fieldset
            ${(el: HTMLFieldSetElement) => { fieldsetEl = el; }}
            style="border:2px solid #e5e7eb;border-radius:8px;padding:20px;margin:0;
                   display:flex;flex-direction:column;gap:16px;"
          >
            <legend style="font-size:13px;font-weight:600;color:#374151;padding:0 8px;">
              Subscribe
            </legend>

            <div style="display:flex;flex-direction:column;gap:6px;">
              <label for="sb-email" style="font-size:13px;font-weight:500;color:#374151;">
                Email (required)
              </label>
              <input id="sb-email" name="email" type="email" required
                placeholder="you@example.com"
                style="padding:8px 12px;border:1px solid #d1d5db;border-radius:6px;
                       font-size:14px;width:100%;box-sizing:border-box;" />
            </div>

            <div style=${row}>
              <lm-prototype-button type="submit">Subscribe</lm-prototype-button>
              <lm-prototype-button type="reset" variant="tertiary">Clear</lm-prototype-button>
            </div>
          </fieldset>
        </form>

        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          ${badge('type="submit"', '#d97706')}
          ${badge('type="reset"', '#d97706')}
          ${badge('fieldset disabled propagates', '#d97706')}
        </div>
      </div>
    `;
    },
};