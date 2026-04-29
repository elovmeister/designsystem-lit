import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

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
    `;

    @property() value = '';

    private _handleSelect() {
        this.dispatchEvent(new CustomEvent('lm-dropdown-item-select', {
            bubbles: true,
            composed: true
        }));
    }

    render() {
        return html`
            <div class="item" role="option" @click=${this._handleSelect}>
                <slot></slot>
            </div>
        `;
    }
}