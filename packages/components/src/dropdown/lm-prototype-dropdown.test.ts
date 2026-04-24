import { describe, it, expect, beforeEach, vi } from 'vitest';
import axe from 'axe-core';
import '../index.js';

function mount(html: string): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper);
    return wrapper;
}

async function waitForUpdate(el: Element): Promise<void> {
    if ('updateComplete' in el) {
        await (el as { updateComplete: Promise<unknown> }).updateComplete;
    }
}

describe('lm-prototype-dropdown', () => {
    let host: HTMLElement;

    beforeEach(() => {
        host = mount(`
            <lm-prototype-dropdown>
                <span slot="label">Options</span>
                <div>Menu Item 1</div>
            </lm-prototype-dropdown>
        `);
    });

    // ── Rendering ────────────────────────────────────────────────────────────

    it('is defined', () => {
        expect(customElements.get('lm-prototype-dropdown')).toBeDefined();
    });

    it('renders a trigger and a panel inside shadow root', async () => {
        const el = host.querySelector('lm-prototype-dropdown')!;
        await waitForUpdate(el);
        const trigger = el.shadowRoot?.querySelector('.trigger');
        const panel = el.shadowRoot?.querySelector('.panel');
        expect(trigger).toBeDefined();
        expect(panel).toBeDefined();
    });

    // ── Attribute reflection ────────────────────────────────────────────────

    it('defaults to variant="secondary"', async () => {
        const el = host.querySelector('lm-prototype-dropdown')!;
        await waitForUpdate(el);
        expect(el.getAttribute('variant')).toBe('secondary');
    });

    it('reflects explicit variant to attribute', async () => {
        const w = mount('<lm-prototype-dropdown variant="primary"></lm-prototype-dropdown>');
        const el = w.querySelector('lm-prototype-dropdown')!;
        await waitForUpdate(el);
        expect(el.getAttribute('variant')).toBe('primary');
    });

    it('reflects size to attribute', async () => {
        const w = mount('<lm-prototype-dropdown size="lg"></lm-prototype-dropdown>');
        const el = w.querySelector('lm-prototype-dropdown')!;
        await waitForUpdate(el);
        expect(el.getAttribute('size')).toBe('lg');
    });

    it('reflects open state to attribute', async () => {
        const w = mount('<lm-prototype-dropdown open></lm-prototype-dropdown>');
        const el = w.querySelector('lm-prototype-dropdown')!;
        await waitForUpdate(el);
        expect(el.hasAttribute('open')).toBe(true);
    });

    // ── Interaction & State ──────────────────────────────────────────────────

    it('toggles open state on trigger click', async () => {
        const el = host.querySelector('lm-prototype-dropdown')!;
        await waitForUpdate(el);
        const trigger = el.shadowRoot?.querySelector('.trigger') as HTMLElement;

        trigger.click();
        await waitForUpdate(el);
        expect(el.hasAttribute('open')).toBe(true);

        trigger.click();
        await waitForUpdate(el);
        expect(el.hasAttribute('open')).toBe(false);
    });

    it('fires lm-change event when toggled', async () => {
        const el = host.querySelector('lm-prototype-dropdown')!;
        await waitForUpdate(el);
        const trigger = el.shadowRoot?.querySelector('.trigger') as HTMLElement;

        const spy = vi.fn();
        el.addEventListener('lm-change', spy);

        trigger.click();
        await waitForUpdate(el);

        expect(spy).toHaveBeenCalledOnce();
        expect(spy.mock.calls[0][0].detail.open).toBe(true);
    });

    it('closes when clicking outside', async () => {
        const el = host.querySelector('lm-prototype-dropdown')!;
        el.setAttribute('open', ''); // Öppna manuellt
        await waitForUpdate(el);

        // Simulera klick på body
        document.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await waitForUpdate(el);

        expect(el.hasAttribute('open')).toBe(false);
    });

    it('closes on Escape key', async () => {
        const el = host.querySelector('lm-prototype-dropdown')!;
        el.setAttribute('open', '');
        await waitForUpdate(el);

        const innerWrapper = el.shadowRoot?.querySelector('div');
        innerWrapper?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        await waitForUpdate(el);

        expect(el.hasAttribute('open')).toBe(false);
    });

    // ── Accessibility: ARIA & axe-core ─────────────────────────────────────

    it('updates aria-expanded on trigger based on state', async () => {
        const el = host.querySelector('lm-prototype-dropdown')!;
        await waitForUpdate(el);
        const trigger = el.shadowRoot?.querySelector('.trigger')!;

        expect(trigger.getAttribute('aria-expanded')).toBe('false');

        el.setAttribute('open', '');
        await waitForUpdate(el);
        expect(trigger.getAttribute('aria-expanded')).toBe('true');
    });

    it('has no a11y violations — closed', async () => {
        const el = host.querySelector('lm-prototype-dropdown')!;
        await waitForUpdate(el);
        const { violations } = await axe.run(document.body);
        expect(violations).toHaveLength(0);
    });

    it('has no a11y violations — open', async () => {
        const el = host.querySelector('lm-prototype-dropdown')!;
        el.setAttribute('open', '');
        await waitForUpdate(el);
        const { violations } = await axe.run(document.body);
        expect(violations).toHaveLength(0);
    });
});