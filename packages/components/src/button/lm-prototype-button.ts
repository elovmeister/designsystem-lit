import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@lm-prototype/icons/lm-prototype-icon';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonType = 'button' | 'submit' | 'reset';

@customElement('lm-prototype-button')
export class LmPrototypeButton extends LitElement {
    static formAssociated = true;

    static override get observedAttributes(): string[] {
        return [
            ...super.observedAttributes,
            'aria-label', 'aria-labelledby', 'aria-describedby',
            'aria-expanded', 'aria-pressed', 'aria-controls', 'aria-haspopup',
        ];
    }

    static styles = css`
    :host { display: inline-block; }
    /* … full stil som i repot … */
  `;

    @property({ reflect: true }) variant: ButtonVariant = 'primary';
    @property({ reflect: true }) size: ButtonSize = 'md';
    @property() type: ButtonType = 'button';
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean, reflect: true }) loading = false;

    private readonly _internals: ElementInternals;

    constructor() {
        super();
        this._internals = this.attachInternals();
    }

    override attributeChangedCallback(name: string, old: string | null, next: string | null) {
        super.attributeChangedCallback(name, old, next);
        if (name.startsWith('aria-')) this.requestUpdate();
    }

    formDisabledCallback(isDisabled: boolean) {
        this.disabled = isDisabled;
    }

    private _handleClick() {
        if (this.disabled || this.loading) return;
        if (this.type === 'submit') this._internals.form?.requestSubmit();
        if (this.type === 'reset')  this._internals.form?.reset();
    }

    override render() {
        return html`<button @click=${this._handleClick}><slot></slot></button>`;
    }
}

declare global {
    interface HTMLElementTagNameMap { 'lm-prototype-button': LmPrototypeButton; }
}