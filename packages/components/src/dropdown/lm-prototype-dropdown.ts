import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '@lm-prototype/icons/lm-prototype-icon';

import type { IconName } from '@lm-prototype/icons';

export type DropdownVariant = 'primary' | 'secondary' | 'tertiary';
export type DropdownSize = 'sm' | 'md' | 'lg';

@customElement('lm-prototype-dropdown')
export class LmPrototypeDropdown extends LitElement {
    static formAssociated = true;

    static override get observedAttributes(): string[] {
        return [...super.observedAttributes, 'aria-label', 'aria-invalid'];
    }

    static styles = css`
        :host {
            display: block; /* Ändrat till block för bättre formulärlayout */
            position: relative;
            width: 100%;

            --_bg: var(--lm-prototype-button-background, transparent);
            --_color: var(--lm-prototype-color-text-primary, #111827);
            --_border-color: var(--lm-prototype-color-border-default, #e5e7eb);
            --_radius: var(--lm-prototype-button-radius, var(--lm-prototype-radius-md, 6px));
            --_px: var(--lm-prototype-space-4, 16px);
            --_py: var(--lm-prototype-space-2, 8px);
            --_fs: var(--lm-prototype-font-size-md, 16px);
            --_dur: var(--lm-prototype-duration-normal, 200ms);
            
            --_panel-bg: var(--lm-prototype-color-surface-raised, #ffffff);
            --_panel-shadow: var(--lm-prototype-shadow-md, 0 4px 6px -1px rgb(0 0 0 / 0.1));
            --_panel-radius: var(--lm-prototype-radius-md, 6px);
            --_panel-border: var(--lm-prototype-color-border-default, #e5e7eb);
        }

        :host([variant='primary']) {
            --_bg: var(--lm-prototype-color-action-primary, #d1d5db);
            --_color: var(--lm-prototype-color-text-inverse, #ffffff);
            --_border-color: transparent;
        }
        
        :host([size='sm']) {
            --_px: var(--lm-prototype-space-3, 12px);
            --_py: var(--lm-prototype-space-1, 4px);
            --_fs: var(--lm-prototype-font-size-sm, 14px);
        }

        :host([disabled]) {
            opacity: 0.5;
            cursor: not-allowed;
            pointer-events: none;
        }

        .dropdown {
            display: flex;
            flex-direction: column;
            gap: var(--lm-prototype-space-1, 4px);
        }

        .label {
            font-family: var(--lm-prototype-font-family-sans, inherit);
            font-size: var(--lm-prototype-font-size-sm, 14px);
            font-weight: var(--lm-prototype-font-weight-medium, 500);
            color: var(--lm-prototype-color-text-secondary, #4a4a4a);
        }

        .trigger {
            display: inline-flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
            padding: var(--_py) var(--_px);
            background: var(--_bg);
            color: var(--_color);
            border: 1px solid var(--_border-color);
            border-radius: var(--_radius);
            font-size: var(--_fs);
            font-family: var(--lm-prototype-font-family-sans, inherit);
            cursor: pointer;
            width: 100%;
            transition: all var(--_dur) ease;
            box-sizing: border-box;
        }

        .trigger:hover:not(:disabled) {
            background: var(--lm-prototype-color-surface-subtle, #f3f4f6);
            border-color: var(--lm-prototype-color-border-hover, #999);
        }

        :host([open]) .trigger {
            border-color: var(--lm-prototype-color-action-primary, #005A9C);
            box-shadow: 0 0 0 2px rgba(0, 90, 156, 0.2);
        }

        .trigger__icon {
            transition: transform var(--_dur) ease;
            flex-shrink: 0;
            display: flex;
        }

        :host([open]) .trigger__icon {
            transform: rotate(180deg);
        }

        .panel {
            position: absolute;
            top: calc(100% + 4px);
            left: 0;
            width: 100%;
            background: var(--_panel-bg);
            border: 1px solid var(--_panel-border);
            border-radius: var(--_panel-radius);
            box-shadow: var(--_panel-shadow);
            z-index: 100;
            overflow: hidden;
            
            opacity: 0;
            visibility: hidden;
            transform: translateY(-8px);
            transition: opacity var(--_dur) ease, transform var(--_dur) ease, visibility var(--_dur);
        }

        :host([open]) .panel {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        .panel__content {
            max-height: 250px;
            overflow-y: auto;
            padding: var(--lm-prototype-space-1, 4px) 0;
        }
    `;

    @property({ type: Boolean, reflect: true }) open = false;
    @property({ reflect: true }) variant: DropdownVariant = 'secondary';
    @property({ reflect: true }) size: DropdownSize = 'md';
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean, reflect: true }) required = false;

    @property({ reflect: true }) value = '';
    @property() icon?: IconName;
    @property() label?: string;
    @property() placeholder = 'Välj alternativ...';
    @property() name?: string;

    @state() private _selectedLabel = '';

    private readonly _internals: ElementInternals;

    constructor() {
        super();
        this._internals = this.attachInternals();
    }

    override attributeChangedCallback(name: string, old: string | null, next: string | null): void {
        super.attributeChangedCallback(name, old, next);
        if (name.startsWith('aria-')) this.requestUpdate();
    }

    connectedCallback() {
        super.connectedCallback();
        document.addEventListener('click', this._handleDocumentClick);
        this.addEventListener('lm-dropdown-item-select', this._handleItemSelect);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('click', this._handleDocumentClick);
        this.removeEventListener('lm-dropdown-item-select', this._handleItemSelect);
    }

    private _toggleDropdown() {
        if (this.disabled) return;
        this.open = !this.open;
    }

    private _handleDocumentClick = (e: MouseEvent) => {
        if (!this.open) return;
        if (!e.composedPath().includes(this)) {
            this.open = false;
        }
    };

    private _handleItemSelect(e: Event) {
        const item = e.target as any;
        this.value = item.value;
        this._selectedLabel = item.textContent?.trim() || '';
        this.open = false;

        this._internals.setFormValue(this.value);

        this.dispatchEvent(new CustomEvent('change', {
            detail: { value: this.value, label: this._selectedLabel },
            bubbles: true,
            composed: true
        }));
    }

    render() {
        const fwdAriaLabel = this.getAttribute('aria-label');
        const fwdAriaInvalid = this.getAttribute('aria-invalid');
        const displayLabel = this._selectedLabel || this.placeholder;

        return html`
            <div class="dropdown" part="base">
                ${this.label ? html`<label class="label">${this.label}</label>` : nothing}

                <button
                        class="trigger"
                        part="trigger"
                        type="button"
                        ?disabled=${this.disabled}
                        aria-haspopup="listbox"
                        aria-expanded=${this.open ? 'true' : 'false'}
                        aria-label=${fwdAriaLabel ?? nothing}
                        aria-invalid=${fwdAriaInvalid ?? nothing}
                        @click=${this._toggleDropdown}
                >
                    <slot name="start" class="trigger__icon">
                        ${this.icon ? html`<lm-prototype-icon name=${this.icon} style="margin-right: 8px;"></lm-prototype-icon>` : nothing}
                    </slot>
                    <span class="trigger__text">${displayLabel}</span>
                    <span class="trigger__icon trigger__icon--chevron">
                        <lm-prototype-icon name="chevron-down"></lm-prototype-icon>
                    </span>
                </button>

                <div class="panel" part="panel" role="listbox" aria-hidden=${!this.open}>
                    <div class="panel__content">
                        <slot></slot>
                    </div>
                </div>
            </div>
        `;
    }
}