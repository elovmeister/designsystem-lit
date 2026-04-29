import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import '@lm-prototype/icons/lm-prototype-icon';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';
export type InputSize = 'sm' | 'md' | 'lg';

/**
 * Input component — text entry field for forms.
 *
 * @slot start — Icon or prefix text before the input field
 * @slot end — Icon or suffix text after the input field
 *
 * ## Accessibility attributes (forwarded to inner <input>)
 *
 * | Host attribute | Use case |
 * |---------------------|----------------------------------------------|
 * | `aria-label` | Replaces visible label (use with caution) |
 * | `aria-labelledby` | Labelled by another element's id(s) |
 * | `aria-describedby` | Points to an external description element |
 * | `aria-invalid` | Indicates if the field has an error |
 */
@customElement('lm-prototype-input')
export class LmPrototypeInput extends LitElement {
    static formAssociated = true;

    static override get observedAttributes(): string[] {
        return [
            ...super.observedAttributes,
            'aria-label',
            'aria-labelledby',
            'aria-describedby',
            'aria-invalid',
        ];
    }

    static styles = css`
        :host {
            display: block;
            width: 100%;

            --_bg: var(--lm-prototype-input-background, var(--lm-prototype-color-surface-default, #ffffff));
            --_color: var(--lm-prototype-input-color, var(--lm-prototype-color-text-primary, #1a1a1a));
            --_border-color: var(--lm-prototype-input-border-color, var(--lm-prototype-color-border-default, #ccc));
            --_border-hover: var(--lm-prototype-input-border-hover, var(--lm-prototype-color-border-hover, #999));
            --_border-focus: var(--lm-prototype-input-border-focus, var(--lm-prototype-color-action-primary, #005A9C));
            --_radius: var(--lm-prototype-input-radius, var(--lm-prototype-radius-md, 4px));
            --_px: var(--lm-prototype-input-padding-x, var(--lm-prototype-space-3, 12px));
            --_py: var(--lm-prototype-input-padding-y, var(--lm-prototype-space-2, 8px));
            --_fs: var(--lm-prototype-input-font-size, var(--lm-prototype-font-size-md, 1rem));
            --_dur: var(--lm-prototype-duration-normal, 200ms);
        }

        :host([size='sm']) {
            --_px: var(--lm-prototype-space-2, 8px);
            --_py: var(--lm-prototype-space-1, 4px);
            --_fs: var(--lm-prototype-font-size-sm, 0.875rem);
        }

        :host([size='lg']) {
            --_px: var(--lm-prototype-space-4, 16px);
            --_py: var(--lm-prototype-space-3, 12px);
            --_fs: var(--lm-prototype-font-size-lg, 1.125rem);
        }

        .form-control {
            display: flex;
            flex-direction: column;
            gap: var(--lm-prototype-space-1, 4px);
        }

        .label {
            font-family: var(--lm-prototype-font-family-sans, inherit);
            font-size: var(--lm-prototype-font-size-sm, 0.875rem);
            font-weight: var(--lm-prototype-font-weight-medium, 500);
            color: var(--lm-prototype-color-text-secondary, #4a4a4a);
        }

        .input-wrapper {
            display: flex;
            align-items: center;
            background: var(--_bg);
            border: 1px solid var(--_border-color);
            border-radius: var(--_radius);
            transition: border-color var(--_dur) ease, box-shadow var(--_dur) ease;
            cursor: text;
        }

        .input-wrapper:hover:not(.input-wrapper--disabled) {
            border-color: var(--_border-hover);
        }

        .input-wrapper--focused {
            border-color: var(--_border-focus);
            outline: 2px solid var(--lm-prototype-color-border-focus, rgba(0, 90, 156, 0.2));
            outline-offset: 1px;
        }

        .input-wrapper--disabled {
            opacity: 0.5;
            cursor: not-allowed;
            background: var(--lm-prototype-color-surface-disabled, #f5f5f5);
        }

        .input {
            flex-grow: 1;
            width: 100%;
            min-width: 0;
            padding: var(--_py) var(--_px);
            border: none;
            background: transparent;
            color: var(--_color);
            font-size: var(--_fs);
            font-family: var(--lm-prototype-font-family-sans, inherit);
            outline: none;
        }

        .input::placeholder {
            color: var(--lm-prototype-color-text-placeholder, #757575);
        }

        .input:disabled {
            cursor: not-allowed;
            pointer-events: none;
        }

        .input__slot {
            display: inline-flex;
            align-items: center;
            color: var(--lm-prototype-color-text-secondary, #4a4a4a);
        }

        slot[name='start']::slotted(*) { margin-left: var(--_px); }
        slot[name='end']::slotted(*) { margin-right: var(--_px); }
    `;

    @property() label?: string;
    @property() value = '';
    @property() name?: string;
    @property() type: InputType = 'text';
    @property() placeholder = '';
    @property({ reflect: true }) size: InputSize = 'md';
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean, reflect: true }) required = false;
    @property({ type: Boolean, reflect: true }) readonly = false;

    @property({ type: Boolean, state: true }) private _focused = false;

    @query('.input') private readonly _inputEl!: HTMLInputElement;
    private readonly _internals: ElementInternals;
    private readonly _inputId = `lm-input-${Math.random().toString(36).substring(2, 9)}`;

    constructor() {
        super();
        this._internals = this.attachInternals();
    }

    override attributeChangedCallback(name: string, old: string | null, next: string | null): void {
        super.attributeChangedCallback(name, old, next);
        if (name.startsWith('aria-')) this.requestUpdate();
    }

    override updated(changedProperties: Map<string, any>) {
        if (changedProperties.has('value')) {
            this._internals.setFormValue(this.value);
        }
    }

    formDisabledCallback(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    formResetCallback(): void {
        this.value = this.getAttribute('value') || '';
        this._internals.setFormValue(this.value);
    }

    private _handleInput(e: Event): void {
        const target = e.target as HTMLInputElement;
        this.value = target.value;

        this.dispatchEvent(new CustomEvent('input', {
            detail: this.value,
            bubbles: true,
            composed: true
        }));
    }

    private _handleChange(e: Event): void {
        const target = e.target as HTMLInputElement;
        this.value = target.value;

        this.dispatchEvent(new CustomEvent('change', {
            detail: this.value,
            bubbles: true,
            composed: true
        }));
    }

    private _handleFocus(): void {
        this._focused = true;
    }

    private _handleBlur(): void {
        this._focused = false;
    }

    render() {
        const fwdAriaLabel = this.getAttribute('aria-label');
        const fwdAriaLabelledby = this.getAttribute('aria-labelledby');
        const fwdAriaDescribedby = this.getAttribute('aria-describedby');
        const fwdAriaInvalid = this.getAttribute('aria-invalid');

        return html`
            <div class="form-control" part="base">
                ${this.label
            ? html`<label class="label" for="${this._inputId}" part="label">${this.label}</label>`
            : nothing}
                
                <div class="input-wrapper ${this._focused ? 'input-wrapper--focused' : ''} ${this.disabled ? 'input-wrapper--disabled' : ''}" part="wrapper">
                    <slot name="start" class="input__slot"></slot>
                    
                    <input
                        id="${this._inputId}"
                        class="input"
                        part="input"
                        type=${this.type}
                        .value=${this.value}
                        name=${this.name ?? nothing}
                        placeholder=${this.placeholder || nothing}
                        ?disabled=${this.disabled}
                        ?required=${this.required}
                        ?readonly=${this.readonly}
                        aria-label=${fwdAriaLabel ?? nothing}
                        aria-labelledby=${fwdAriaLabelledby ?? nothing}
                        aria-describedby=${fwdAriaDescribedby ?? nothing}
                        aria-invalid=${fwdAriaInvalid ?? nothing}
                        @input=${this._handleInput}
                        @change=${this._handleChange}
                        @focus=${this._handleFocus}
                        @blur=${this._handleBlur}
                    />

                    <slot name="end" class="input__slot"></slot>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'lm-prototype-input': LmPrototypeInput;
    }
}