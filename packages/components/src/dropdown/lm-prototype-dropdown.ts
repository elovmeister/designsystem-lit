import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@lm-prototype/icons/lm-prototype-icon';

export type DropdownVariant = 'primary' | 'secondary' | 'tertiary';
export type DropdownSize = 'sm' | 'md' | 'lg';

@customElement('lm-prototype-dropdown')
export class LmPrototypeDropdown extends LitElement {

    // ─── STATE & PROPERTIES ──────────────────────────────────────────────

    /** Controls whether the dropdown menu is visible. */
    @property({ type: Boolean, reflect: true }) open = false;

    @property({ reflect: true }) variant: DropdownVariant = 'secondary';
    @property({ reflect: true }) size: DropdownSize = 'md';
    @property({ type: Boolean, reflect: true }) disabled = false;

    // ─── STYLES ──────────────────────────────────────────────────────────

    static styles = css`
        :host {
            display: inline-block;
            position: relative; /* Viktigt för att panelen ska positioneras utifrån denna */
            
            /* Token fallbacks från ert system */
            --_bg: var(--lm-prototype-button-background, transparent);
            --_color: var(--lm-prototype-button-color, var(--lm-prototype-color-text-primary, #111827));
            --_border-color: var(--lm-prototype-button-border-color, var(--lm-prototype-color-border-default, #e5e7eb));
            --_radius: var(--lm-prototype-button-radius, var(--lm-prototype-radius-md, 6px));
            --_px: var(--lm-prototype-space-4, 16px);
            --_py: var(--lm-prototype-space-2, 8px);
            --_fs: var(--lm-prototype-font-size-md, 16px);
            --_dur: var(--lm-prototype-duration-normal, 200ms);
            
            /* Specifika tokens för Dropdown Panel */
            --_panel-bg: var(--lm-prototype-color-surface-raised, #ffffff);
            --_panel-shadow: var(--lm-prototype-shadow-md, 0 4px 6px -1px rgb(0 0 0 / 0.1));
            --_panel-radius: var(--lm-prototype-radius-md, 6px);
            --_panel-border: var(--lm-prototype-color-border-default, #e5e7eb);
        }

        /* ── Varianter (Fokuserar på secondary/tertiary för dropdowns) ── */
        :host([variant='primary']) {
            --_bg: var(--lm-prototype-color-action-primary, #d1d5db);
            --_color: var(--lm-prototype-color-text-inverse, #ffffff);
            --_border-color: transparent;
        }
        
        :host([variant='tertiary']) {
            --_border-color: transparent;
        }

        /* ── Storlekar ── */
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

        /* ── Själva knappen (Trigger) ── */
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
        }

        .trigger:focus-visible {
            outline: 2px solid var(--lm-prototype-color-border-focus, #2563eb);
            outline-offset: 2px;
        }

        .trigger:hover {
            background: var(--lm-prototype-color-surface-subtle, #f3f4f6);
        }

        /* Rotera en eventuell ikon (Chevron) när den är öppen */
        .trigger__icon {
            transition: transform var(--_dur) ease;
        }
        :host([open]) .trigger__icon {
            transform: rotate(180deg);
        }

        /* ── Dropdown Panel (Menyn) ── */
        .panel {
            position: absolute;
            top: calc(100% + 4px); /* Placera precis under knappen */
            left: 0;
            min-width: 100%; /* Minst lika bred som knappen */
            background: var(--_panel-bg);
            border: 1px solid var(--_panel-border);
            border-radius: var(--_panel-radius);
            box-shadow: var(--_panel-shadow);
            z-index: 50;
            
            /* Animation & visibility state */
            opacity: 0;
            visibility: hidden;
            transform: translateY(-8px);
            transition: opacity var(--_dur) ease, transform var(--_dur) ease, visibility var(--_dur);
        }

        /* Visa panelen när komponenten har attributet 'open' */
        :host([open]) .panel {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        /* Om det är en lista i panelen, ta bort marginaler */
        ::slotted(ul) {
            list-style: none;
            margin: 0;
            padding: 0;
        }
    `;

    // ─── LIFECYCLE & EVENT LISTENERS ─────────────────────────────────────

    connectedCallback() {
        super.connectedCallback();
        // Lyssna på klick i hela dokumentet för att stänga om man klickar utanför
        document.addEventListener('click', this._handleDocumentClick);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        // Viktigt att städa upp när komponenten tas bort!
        document.removeEventListener('click', this._handleDocumentClick);
    }

    private _toggleDropdown() {
        if (this.disabled) return;
        this.open = !this.open;

        // Dispatar ett event så ramverk (React/Angular) vet att state har ändrats
        this.dispatchEvent(new CustomEvent('lm-change', {
            detail: { open: this.open },
            bubbles: true,
            composed: true
        }));
    }

    // Pilfunktion för att 'this' ska binda rätt till klassen
    private _handleDocumentClick = (e: MouseEvent) => {
        if (!this.open) return;

        // Om klicket INTE kom från den här komponenten (composedPath kollar genom Shadow DOM)
        const path = e.composedPath();
        if (!path.includes(this)) {
            this.open = false;
        }
    };

    private _handleKeyDown(e: KeyboardEvent) {
        // Stäng dropdown om man trycker på Escape
        if (e.key === 'Escape' && this.open) {
            this.open = false;
            // Returnera fokus till knappen
            const trigger = this.shadowRoot?.querySelector('.trigger') as HTMLElement;
            trigger?.focus();
        }
    }

    // ─── RENDER ──────────────────────────────────────────────────────────

    render() {
        return html`
            <div @keydown=${this._handleKeyDown}>
                <button
                    class="trigger"
                    part="trigger"
                    type="button"
                    ?disabled=${this.disabled}
                    aria-haspopup="true"
                    aria-expanded=${this.open ? 'true' : 'false'}
                    @click=${this._toggleDropdown}
                >
                    <span class="trigger__label">
                        <slot name="label"></slot>
                    </span>
                    
                    <slot name="icon" class="trigger__icon">
                        <lm-prototype-icon name="chevron-down"></lm-prototype-icon>
                    </slot>
                </button>

                <div class="panel" part="panel" aria-hidden=${!this.open ? 'true' : 'false'}>
                    <slot></slot>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'lm-prototype-dropdown': LmPrototypeDropdown;
    }
}