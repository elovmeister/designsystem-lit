import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { iconRegistry, type IconName } from './registry.js';

@customElement('lm-prototype-icon')
export class LmPrototypeIcon extends LitElement {
    static styles = css`
    :host {
      display: inline-flex;
      width: var(--lm-prototype-icon-size, 1em);
      height: var(--lm-prototype-icon-size, 1em);
      color: inherit;
      flex-shrink: 0;
    }
    svg {
      width: 100%; height: 100%;
      stroke-width: var(--lm-prototype-icon-stroke-width, 2);
    }
  `;

    @property() name: IconName | '' = '';

    /** När satt: role="img" + aria-label. Annars: aria-hidden. */
    @property() label?: string;

    override render() {
        const paths = this.name ? iconRegistry[this.name as IconName] : undefined;
        if (!paths) return html`<slot></slot>`;
        return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden=${this.label ? nothing : 'true'}
        aria-label=${this.label ?? nothing}
        role=${this.label ? 'img' : nothing}
      >
        ${unsafeSVG(paths)}
      </svg>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap { 'lm-prototype-icon': LmPrototypeIcon; }
}