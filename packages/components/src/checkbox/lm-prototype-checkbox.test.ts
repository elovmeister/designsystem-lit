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

describe('lm-prototype-checkbox', () => {
    let host: HTMLElement;

    beforeEach(() => {
        host = mount('<lm-prototype-checkbox label="Acceptera villkor"></lm-prototype-checkbox>');
    });

    it('is defined', () => {
        expect(customElements.get('lm-prototype-checkbox')).toBeDefined();
    });

    it('renders native checkbox and custom control', async () => {
        const el = host.querySelector('lm-prototype-checkbox')!;
        await waitForUpdate(el);
        const input = el.shadowRoot?.querySelector('input[type="checkbox"]');
        const control = el.shadowRoot?.querySelector('.checkbox__control');
        expect(input).toBeDefined();
        expect(control).toBeDefined();
    });

    it('reflects checked state', async () => {
        const w = mount('<lm-prototype-checkbox checked label="Aktiv"></lm-prototype-checkbox>');
        const el = w.querySelector('lm-prototype-checkbox')!;
        await waitForUpdate(el);
        expect(el.hasAttribute('checked')).toBe(true);

        const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;
        expect(input.checked).toBe(true);
    });

    it('dispatches change event and updates state on click', async () => {
        const el = host.querySelector('lm-prototype-checkbox') as any;
        await waitForUpdate(el);

        const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;
        const spy = vi.fn();
        el.addEventListener('change', spy);

        input.click();
        await waitForUpdate(el);

        expect(el.checked).toBe(true);
        expect(spy).toHaveBeenCalledOnce();
        expect(spy.mock.calls[0][0].detail.checked).toBe(true);
    });

    it('has no a11y violations — unchecked', async () => {
        const el = host.querySelector('lm-prototype-checkbox')!;
        await waitForUpdate(el);
        const { violations } = await axe.run(document.body);
        expect(violations).toHaveLength(0);
    });

    it('has no a11y violations — checked', async () => {
        const el = host.querySelector('lm-prototype-checkbox')!;
        el.setAttribute('checked', '');
        await waitForUpdate(el);
        const { violations } = await axe.run(document.body);
        expect(violations).toHaveLength(0);
    });
});