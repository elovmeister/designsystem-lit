import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@lm-prototype/icons/lm-prototype-icon';

import type { IconName } from '@lm-prototype/icons';

@customElement('lm-prototype-dropdown-item')
export class LmPrototypeDropdownItem extends LitElement {
    static styles = css`
        :host {
            display: block;
        }
        .item {
            display: flex;
            align-items: center;
            padding: var(--lm-prototype-space-2, 8px) var(--lm-prototype-space-4, 16px);
            font-family: var(--lm-prototype-font-family-sans, inherit);
            font-size: var(--lm-prototype-font-size-md, 16px);
            color: var(--lm-prototype-color-text-primary, #111827);
            cursor: pointer;
            transition: background 0.1s ease;
        }
        .item:hover {
            background: var(--lm-prototype-color-surface-subtle, #f3f4f6);
        }
        .item__icon {
            display: flex;
            align-items: center;
            flex-shrink: 0; 
        }

        .item__text {
            flex-grow: 1; 
        }
    `;

    @property() value = '';
    @property() icon?: IconName;
    @property({ attribute: 'icon-end' }) iconEnd?: IconName;

    private _handleSelect() {
        this.dispatchEvent(new CustomEvent('lm-dropdown-item-select', {
            bubbles: true,
            composed: true
        }));
    }

    render() {
        return html`
            <div class="item" role="option" @click=${this._handleSelect}>
                <span class="item__icon">
                    <slot name="start">
                        ${this.icon ? html`<lm-prototype-icon name=${this.icon}></lm-prototype-icon>` : nothing}
                    </slot>
                </span>
                <span class="item__text">
                    <slot></slot>
                </span>

                <span class="item__icon">
                    <slot name="end">
                        ${this.iconEnd ? html`<lm-prototype-icon name=${this.iconEnd}></lm-prototype-icon>` : nothing}
                    </slot>
                </span>
            </div>
        `;
    }
}