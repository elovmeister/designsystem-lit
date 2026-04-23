import {LitElement, html, css, nothing} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import '@lm-prototype/icons/lm-prototype-icon';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonType = 'button' | 'submit' | 'reset';

/**
 * Button component — the primary interactive element in the design system.
 *
 * @slot — Button label (required)
 * @slot start — Icon before the label (RTL-safe)
 * @slot end — Icon after the label (RTL-safe)
 *
 * ## Accessibility attributes (forwarded to inner <button>)
 *
 * Place these on the `<ds-button>` host — the component forwards them through
 * the shadow root so the native `<button>` carries them and AT reads them:
 *
 * | Host attribute | Use case |
 * |---------------------|----------------------------------------------|
 * | `aria-label` | Icon-only button — replaces visible text |
 * | `aria-labelledby` | Labelled by another element's id(s) |
 * | `aria-describedby` | Points to an external description element |
 * | `aria-expanded` | Disclosure/toggle — is the controlled area open? |
 * | `aria-pressed` | Toggle button — is the action active? |
 * | `aria-controls` | ID of the element this button controls |
 * | `aria-haspopup` | Button opens menu/listbox/dialog/tree/grid |
 *
 * @cssprop --ds-button-background — Override background
 * @cssprop --ds-button-color — Override text color
 * @cssprop --ds-button-border-color — Override border color
 * @cssprop --ds-button-radius — Override border radius
 * @cssprop --ds-button-padding-x — Override horizontal padding
 * @cssprop --ds-button-padding-y — Override vertical padding
 * @cssprop --ds-button-font-size — Override font size
 * @cssprop --ds-button-font-weight — Override font weight
 * @cssprop --ds-button-gap — Override icon/label gap
 */
@customElement('lm-prototype-button')
export class LmPrototypeButton extends LitElement {
    static formAssociated = true;

    /**
     * Extend Lit's observedAttributes to include the aria-* attributes we
     * forward to the inner <button>. Without this, attributeChangedCallback
     * never fires for them and the shadow DOM button stays stale.
     */
    static override get observedAttributes(): string[] {
        return [
            ...super.observedAttributes,
            'aria-label',
            'aria-labelledby',
            'aria-describedby',
            'aria-expanded',
            'aria-pressed',
            'aria-controls',
            'aria-haspopup',
        ];
    }

    static styles = css`
        /* ── Internal custom properties (with semantic token fallbacks) ─────── */

        :host {
            display: inline-block;

            --_bg: var(--lm-prototype-button-background, var(--lm-prototype-color-action-primary));
            --_color: var(--lm-prototype-button-color, var(--lm-prototype-color-text-inverse));
            --_border-color: var(--lm-prototype-button-border-color, transparent);
            --_radius: var(--lm-prototype-button-radius, var(--lm-prototype-radius-md));
            --_px: var(--lm-prototype-button-padding-x, var(--lm-prototype-space-4));
            --_py: var(--lm-prototype-button-padding-y, var(--lm-prototype-space-2));
            --_fs: var(--lm-prototype-button-font-size, var(--lm-prototype-font-size-md));
            --_fw: var(--lm-prototype-button-font-weight, var(--lm-prototype-font-weight-medium));
            --_gap: var(--lm-prototype-button-gap, var(--lm-prototype-space-2));
            --_dur: var(--lm-prototype-duration-normal, 200ms);
        }

        /* ── Variant overrides ─────────────────────────────────────────────── */

        :host([variant='secondary']) {
            --_bg: transparent;
            --_color: var(--lm-prototype-color-action-primary);
            --_border-color: var(--lm-prototype-color-action-primary);
        }

        :host([variant='tertiary']) {
            --_bg: transparent;
            --_color: var(--lm-prototype-color-text-primary);
            --_border-color: transparent;
        }

        :host([variant='danger']) {
            --_bg: var(--lm-prototype-color-danger-default);
            --_color: var(--lm-prototype-color-text-inverse);
            --_border-color: transparent;
        }

        /* ── Size overrides ────────────────────────────────────────────────── */

        :host([size='sm']) {
            --_px: var(--lm-prototype-space-3);
            --_py: var(--lm-prototype-space-1);
            --_fs: var(--lm-prototype-font-size-sm);
        }

        :host([size='lg']) {
            --_px: var(--lm-prototype-space-6);
            --_py: var(--lm-prototype-space-3);
            --_fs: var(--lm-prototype-font-size-lg);
        }

        /* ── Disabled state ────────────────────────────────────────────────── */

        :host([disabled]) {
            opacity: 0.5;
            cursor: not-allowed;
            pointer-events: none;
        }

        /* ── Base button ───────────────────────────────────────────────────── */

        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: var(--_gap);
            padding: var(--_py) var(--_px);
            background: var(--_bg);
            color: var(--_color);
            border: 1px solid var(--_border-color);
            border-radius: var(--_radius);
            font-size: var(--_fs);
            font-weight: var(--_fw);
            font-family: var(--lm-prototype-font-family-sans, inherit);
            line-height: 1.5;
            cursor: pointer;
            text-decoration: none;
            white-space: nowrap;
            user-select: none;
            box-sizing: border-box;
            width: 100%;
            position: relative;
            transition: background var(--_dur) ease,
            color var(--_dur) ease,
            border-color var(--_dur) ease,
            box-shadow var(--_dur) ease;
        }

        .btn:focus-visible {
            outline: 2px solid var(--lm-prototype-color-border-focus);
            outline-offset: 2px;
        }

        .btn:disabled {
            cursor: not-allowed;
            pointer-events: none;
        }

        /* ── Hover/active states (per variant) ─────────────────────────────── */

        :host([variant='primary']) .btn:not(:disabled):hover {
            background: var(--lm-prototype-color-action-primary-hover);
        }

        :host([variant='primary']) .btn:not(:disabled):active {
            background: var(--lm-prototype-color-action-primary-active);
        }

        :host([variant='secondary']) .btn:not(:disabled):hover,
        :host([variant='tertiary']) .btn:not(:disabled):hover {
            background: var(--lm-prototype-color-surface-subtle);
        }

        :host([variant='danger']) .btn:not(:disabled):hover {
            background: var(--lm-prototype-color-danger-hover);
        }

        /* ── Icon slots ────────────────────────────────────────────────────── */

        .btn__icon {
            display: inline-flex;
            align-items: center;
            flex-shrink: 0;
            font-size: 1em;
        }

        /* ── Loading spinner ───────────────────────────────────────────────── */

        .btn__icon--spinner {
            animation: lm-prototype-spin 0.8s linear infinite;
        }

        @keyframes lm-prototype-spin {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }

        /* ── Loading state ─────────────────────────────────────────────────── */

        :host([loading]) .btn {
            cursor: wait;
        }

        :host([loading]) .btn__label {
            opacity: 0.7;
        }
    `;

    /** Visual variant. Reflected as an attribute for CSS targeting. */
    @property({reflect: true}) variant: ButtonVariant = 'primary';

    /** Size variant. Reflected as an attribute for CSS targeting. */
    @property({reflect: true}) size: ButtonSize = 'md';

    /** Maps to the native button `type` attribute. */
    @property() type: ButtonType = 'button';

    /** Passed to ElementInternals for form submission. */
    @property() name?: string;

    /** Passed to ElementInternals for form submission. */
    @property() value?: string;

    /** Disables the button and prevents interaction. */
    @property({type: Boolean, reflect: true}) disabled = false;

    /** Shows a spinner and prevents interaction while an async action runs. */
    @property({type: Boolean, reflect: true}) loading = false;

    private readonly _internals: ElementInternals;

    constructor() {
        super();
        this._internals = this.attachInternals();
    }

    /**
     * Trigger a re-render when forwarded aria-* attributes change.
     * Lit only knows about attributes declared with @property(); for the rest
     * we manually call requestUpdate() here.
     */
    override attributeChangedCallback(
        name: string,
        old: string | null,
        next: string | null,
    ): void {
        super.attributeChangedCallback(name, old, next);
        if (name.startsWith('aria-')) this.requestUpdate();
    }

    /** Called by the browser when the form's disabled state changes. */
    formDisabledCallback(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    /** Called on form reset; clear any internal state here if needed. */
    formResetCallback(): void {
        this._internals.setFormValue(null);
    }

    private _handleClick(): void {
        if (this.disabled || this.loading) return;
        if (this.type === 'submit') this._internals.form?.requestSubmit();
        if (this.type === 'reset') this._internals.form?.reset();
    }

    render() {
        const isBlocked = this.disabled || this.loading;

// Read host aria-* attributes and forward them into the shadow <button>.
// Screen readers focus on the inner <button>, not the host, so this is
// the only way they can see these attributes.
        const fwdAriaLabel = this.getAttribute('aria-label');
        const fwdAriaLabelledby = this.getAttribute('aria-labelledby');
        const fwdAriaDescribedby = this.getAttribute('aria-describedby');
        const fwdAriaExpanded = this.getAttribute('aria-expanded');
        const fwdAriaPressed = this.getAttribute('aria-pressed');
        const fwdAriaControls = this.getAttribute('aria-controls');
        const fwdAriaHaspopup = this.getAttribute('aria-haspopup');

        return html`
            <button
                    class="btn"
                    part="base"
                    type=${this.type}
                    ?disabled=${this.disabled}
                    aria-busy=${this.loading ? 'true' : nothing}
                    aria-disabled=${isBlocked ? 'true' : nothing}
                    aria-label=${fwdAriaLabel ?? nothing}
                    aria-labelledby=${fwdAriaLabelledby ?? nothing}
                    aria-describedby=${fwdAriaDescribedby ?? nothing}
                    aria-expanded=${fwdAriaExpanded ?? nothing}
                    aria-pressed=${fwdAriaPressed ?? nothing}
                    aria-controls=${fwdAriaControls ?? nothing}
                    aria-haspopup=${fwdAriaHaspopup ?? nothing}
                    @click=${this._handleClick}
            >
                ${this.loading
                        ? html`
                            <span class="btn__icon btn__icon--spinner" aria-hidden="true">
<lm-prototype-icon name="loader" style="--lm-prototype-icon-size: 1em;"></lm-prototype-icon>
</span>
                        `
                        : html`
                            <slot name="start" class="btn__icon"></slot>`}

                <span class="btn__label">
<slot></slot>
</span>

                <slot name="end" class="btn__icon"></slot>
            </button>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'lm-prototype-button': LmPrototypeButton;
    }
}