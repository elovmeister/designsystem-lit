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
            <lm-prototype-dropdown label="Välj kategori" name="category">
                <lm-prototype-dropdown-item value="fel">Felanmälan</lm-prototype-dropdown-item>
                <lm-prototype-dropdown-item value="order">Beställning</lm-prototype-dropdown-item>
            </lm-prototype-dropdown>
        `);
    });


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

    it('displays placeholder text initially', async () => {
        const el = host.querySelector('lm-prototype-dropdown')!;
        await waitForUpdate(el);
        const triggerText = el.shadowRoot?.querySelector('.trigger__text');
        expect(triggerText?.textContent).toBe('Välj alternativ...');
    });


    it('defaults to variant="secondary"', async () => {
        const el = host.querySelector('lm-prototype-dropdown')!;
        await waitForUpdate(el);
        expect(el.getAttribute('variant')).toBe('secondary');
    });

    it('reflects open state to attribute', async () => {
        const w = mount('<lm-prototype-dropdown open></lm-prototype-dropdown>');
        const el = w.querySelector('lm-prototype-dropdown')!;
        await waitForUpdate(el);
        expect(el.hasAttribute('open')).toBe(true);
    });


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

    it('updates value, closes menu and fires change event on item selection', async () => {
        const el = host.querySelector('lm-prototype-dropdown') as any;
        const item = el.querySelector('lm-prototype-dropdown-item') as HTMLElement;

        el.open = true;
        await waitForUpdate(el);

        const spy = vi.fn();
        el.addEventListener('change', spy);

        item.dispatchEvent(new CustomEvent('lm-dropdown-item-select', {
            bubbles: true,
            composed: true
        }));
        await waitForUpdate(el);

        expect(el.hasAttribute('open')).toBe(false);

        expect(el.value).toBe('fel');

        expect(spy).toHaveBeenCalledOnce();
        expect(spy.mock.calls[0][0].detail.value).toBe('fel');
        expect(spy.mock.calls[0][0].detail.label).toBe('Felanmälan');

        const triggerText = el.shadowRoot?.querySelector('.trigger__text');
        expect(triggerText?.textContent).toBe('Felanmälan');
    });

    it('closes when clicking outside', async () => {
        const el = host.querySelector('lm-prototype-dropdown')!;
        el.setAttribute('open', ''); // Öppna manuellt
        await waitForUpdate(el);

        document.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await waitForUpdate(el);

        expect(el.hasAttribute('open')).toBe(false);
    });


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
});