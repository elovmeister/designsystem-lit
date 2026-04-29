import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import '@lm-prototype/icons/lm-prototype-icon';

@customElement('lm-prototype-checkbox')
export class LmPrototypeCheckbox extends LitElement {
    static formAssociated = true;

    static override get observedAttributes(): string[] {
        return [...super.observedAttributes, 'aria-label', 'aria-describedby', 'aria-invalid'];
    }

    static styles = css`
        :host {
            display: inline-block;
            
            --_size: var(--lm-prototype-checkbox-size, 20px);
            --_border-color: var(--lm-prototype-checkbox-border, var(--lm-prototype-color-border-default, #6b7280));
            --_border-hover: var(--lm-prototype-checkbox-border-hover, var(--lm-prototype-color-action-primary, #005A9C));
            --_bg: var(--lm-prototype-checkbox-bg, var(--lm-prototype-color-surface-default, #ffffff));
            --_bg-checked: var(--lm-prototype-checkbox-bg-checked, var(--lm-prototype-color-action-primary, #005A9C));
            --_color-checked: var(--lm-prototype-checkbox-color-checked, var(--lm-prototype-color-text-inverse, #ffffff));
            --_radius: var(--lm-prototype-checkbox-radius, var(--lm-prototype-radius-sm, 4px));
            --_dur: var(--lm-prototype-duration-fast, 150ms);
        }

        :host([disabled]) {
            opacity: 0.5;
            pointer-events: none;
        }

        .checkbox {
            display: inline-flex;
            align-items: flex-start;
            gap: var(--lm-prototype-space-2, 8px);
            cursor: pointer;
            position: relative;
        }

        .checkbox__input {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border-width: 0;
        }

        .checkbox__control {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: var(--_size);
            height: var(--_size);
            flex-shrink: 0;
            background: var(--_bg);
            border: 2px solid var(--_border-color);
            border-radius: var(--_radius);
            transition: all var(--_dur) ease;
            box-sizing: border-box;
            margin-top: 2px; /* Justera mot texten */
        }

        .checkbox:hover .checkbox__control {
            border-color: var(--_border-hover);
        }

        .checkbox__input:focus-visible + .checkbox__control {
            outline: 2px solid var(--lm-prototype-color-border-focus, rgba(0, 90, 156, 0.4));
            outline-offset: 2px;
            border-color: var(--_border-hover);
        }

        .checkbox__input:checked + .checkbox__control {
            background: var(--_bg-checked);
            border-color: var(--_bg-checked);
            color: var(--_color-checked);
        }

        .checkbox__icon {
            opacity: 0;
            transform: scale(0.5);
            transition: all var(--_dur) ease;
            display: flex;
        }

        .checkbox__input:checked + .checkbox__control .checkbox__icon {
            opacity: 1;
            transform: scale(1);
        }

        .checkbox__label {
            font-family: var(--lm-prototype-font-family-sans, inherit);
            font-size: var(--lm-prototype-font-size-md, 16px);
            color: var(--lm-prototype-color-text-primary, #111827);
            user-select: none;
            line-height: 1.5;
        }
    `;

    @property({ type: Boolean, reflect: true }) checked = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean, reflect: true }) required = false;
    @property() label?: string;
    @property() value = 'on';
    @property() name?: string;

    @query('.checkbox__input') private readonly _inputEl!: HTMLInputElement;
    private readonly _internals: ElementInternals;
    private readonly _inputId = `lm-checkbox-${Math.random().toString(36).substring(2, 9)}`;

    constructor() {
        super();
        this._internals = this.attachInternals();
    }

    override attributeChangedCallback(name: string, old: string | null, next: string | null): void {
        super.attributeChangedCallback(name, old, next);
        if (name.startsWith('aria-')) this.requestUpdate();
    }

    override updated(changedProperties: Map<string, any>) {
        if (changedProperties.has('checked') || changedProperties.has('value')) {
            this._internals.setFormValue(this.checked ? this.value : null);
        }
    }

    formDisabledCallback(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    formResetCallback(): void {
        this.checked = this.hasAttribute('checked');
    }

    private _handleChange(e: Event): void {
        const target = e.target as HTMLInputElement;
        this.checked = target.checked;

        this.dispatchEvent(new CustomEvent('change', {
            detail: { checked: this.checked, value: this.value },
            bubbles: true,
            composed: true
        }));
    }

    render() {
        const fwdAriaLabel = this.getAttribute('aria-label');
        const fwdAriaDescribedby = this.getAttribute('aria-describedby');
        const fwdAriaInvalid = this.getAttribute('aria-invalid');

        return html`
            <label class="checkbox" part="base" for="${this._inputId}">
                <input
                    id="${this._inputId}"
                    class="checkbox__input"
                    type="checkbox"
                    .checked=${this.checked}
                    ?disabled=${this.disabled}
                    ?required=${this.required}
                    name=${this.name ?? nothing}
                    value=${this.value}
                    aria-label=${fwdAriaLabel ?? nothing}
                    aria-describedby=${fwdAriaDescribedby ?? nothing}
                    aria-invalid=${fwdAriaInvalid ?? nothing}
                    @change=${this._handleChange}
                />
                <div class="checkbox__control" part="control" aria-hidden="true">
                    <span class="checkbox__icon">
                        <lm-prototype-icon name="check" style="--lm-prototype-icon-size: 14px;"></lm-prototype-icon>
                    </span>
                </div>
                ${this.label ? html`<span class="checkbox__label" part="label">${this.label}</span>` : html`<slot class="checkbox__label" part="label"></slot>`}
            </label>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'lm-prototype-checkbox': LmPrototypeCheckbox;
    }
}