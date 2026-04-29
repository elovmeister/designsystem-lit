import { describe, it, expect, beforeEach } from 'vitest';
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

describe('lm-prototype-input', () => {
    let host: HTMLElement;

    beforeEach(() => {
        host = mount('<lm-prototype-input label="Username"></lm-prototype-input>');
    });


    it('is defined', () => {
        expect(customElements.get('lm-prototype-input')).toBeDefined();
    });

    it('renders a native input inside shadow root', async () => {
        const el = host.querySelector('lm-prototype-input')!;
        await waitForUpdate(el);
        const inner = el.shadowRoot?.querySelector('input');
        expect(inner).toBeDefined();
    });

    it('renders a label element when label property is provided', async () => {
        const el = host.querySelector('lm-prototype-input')!;
        await waitForUpdate(el);
        const label = el.shadowRoot?.querySelector('label');
        expect(label).toBeDefined();
        expect(label?.textContent).toBe('Username');
    });

    it('does not render a label element if label property is omitted', async () => {
        const w = mount('<lm-prototype-input></lm-prototype-input>');
        const el = w.querySelector('lm-prototype-input')!;
        await waitForUpdate(el);
        const label = el.shadowRoot?.querySelector('label');
        expect(label).toBeNull();
    });


    it('defaults to size="md" and type="text"', async () => {
        const el = host.querySelector('lm-prototype-input')!;
        await waitForUpdate(el);
        expect(el.getAttribute('size')).toBe('md');
        expect(el.getAttribute('type')).toBe('text'); // Lit reflekterar oftast inte properties som saknar { reflect: true }, men vi kollar host-attributen om de är satta
    });

    it('reflects size to attribute', async () => {
        const w = mount('<lm-prototype-input size="lg"></lm-prototype-input>');
        const el = w.querySelector('lm-prototype-input')!;
        await waitForUpdate(el);
        expect(el.getAttribute('size')).toBe('lg');
    });

    it('reflects disabled to attribute', async () => {
        const w = mount('<lm-prototype-input disabled></lm-prototype-input>');
        const el = w.querySelector('lm-prototype-input')!;
        await waitForUpdate(el);
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    it('reflects required to attribute', async () => {
        const w = mount('<lm-prototype-input required></lm-prototype-input>');
        const el = w.querySelector('lm-prototype-input')!;
        await waitForUpdate(el);
        expect(el.hasAttribute('required')).toBe(true);
    });

    it('reflects readonly to attribute', async () => {
        const w = mount('<lm-prototype-input readonly></lm-prototype-input>');
        const el = w.querySelector('lm-prototype-input')!;
        await waitForUpdate(el);
        expect(el.hasAttribute('readonly')).toBe(true);
    });


    it('forwards value to the inner input', async () => {
        const w = mount('<lm-prototype-input value="Test data"></lm-prototype-input>');
        const el = w.querySelector('lm-prototype-input')!;
        await waitForUpdate(el);
        const inner = el.shadowRoot?.querySelector('input')!;
        expect(inner.value).toBe('Test data');
    });

    it('forwards placeholder to the inner input', async () => {
        const w = mount('<lm-prototype-input placeholder="Enter text"></lm-prototype-input>');
        const el = w.querySelector('lm-prototype-input')!;
        await waitForUpdate(el);
        const inner = el.shadowRoot?.querySelector('input')!;
        expect(inner.getAttribute('placeholder')).toBe('Enter text');
    });

    it('marks inner input disabled when host is disabled', async () => {
        const w = mount('<lm-prototype-input disabled></lm-prototype-input>');
        const el = w.querySelector('lm-prototype-input')!;
        await waitForUpdate(el);
        const inner = el.shadowRoot?.querySelector('input')!;
        expect(inner.disabled).toBe(true);
    });


    it('updates value and dispatches event when typing in native input', async () => {
        const el = host.querySelector('lm-prototype-input')! as any;
        await waitForUpdate(el);
        const inner = el.shadowRoot?.querySelector('input')!;

        let eventFired = false;
        el.addEventListener('input', (e: CustomEvent) => {
            eventFired = true;
            expect(e.detail).toBe('New text');
        });

        inner.value = 'New text';
        inner.dispatchEvent(new Event('input', { bubbles: true, composed: true }));

        expect(eventFired).toBe(true);
        expect(el.value).toBe('New text');
    });


    it('has no a11y violations — default with label', async () => {
        const el = host.querySelector('lm-prototype-input')!;
        await waitForUpdate(el);
        const { violations } = await axe.run(document.body);
        expect(violations).toHaveLength(0);
    });

    it('has no a11y violations — with aria-label instead of prop', async () => {
        const w = mount('<lm-prototype-input aria-label="Search"></lm-prototype-input>');
        await waitForUpdate(w.querySelector('lm-prototype-input')!);
        const { violations } = await axe.run(document.body);
        expect(violations).toHaveLength(0);
    });

    it('has no a11y violations — disabled', async () => {
        const w = mount('<lm-prototype-input label="Disabled field" disabled></lm-prototype-input>');
        await waitForUpdate(w.querySelector('lm-prototype-input')!);
        const { violations } = await axe.run(document.body);
        expect(violations).toHaveLength(0);
    });

    it('has no a11y violations — required', async () => {
        const w = mount('<lm-prototype-input label="Required field" required></lm-prototype-input>');
        await waitForUpdate(w.querySelector('lm-prototype-input')!);
        const { violations } = await axe.run(document.body);
        expect(violations).toHaveLength(0);
    });
});