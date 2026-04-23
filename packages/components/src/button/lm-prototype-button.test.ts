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

describe('lm-prototype-button', () => {
    let host: HTMLElement;

    beforeEach(() => {
        host = mount('<lm-prototype-button>Click me</lm-prototype-button>');
    });

    // ── Rendering ────────────────────────────────────────────────────────────

    it('is defined', () => {
        expect(customElements.get('lm-prototype-button')).toBeDefined();
    });

    it('renders a native button inside shadow root', async () => {
        const el = host.querySelector('lm-prototype-button')!;
        await waitForUpdate(el);
        const inner = el.shadowRoot?.querySelector('button');
        expect(inner).toBeDefined();
    });

    // ── Attribute reflection ────────────────────────────────────────────────

    it('defaults to variant="primary"', async () => {
        const el = host.querySelector('lm-prototype-button')!;
        await waitForUpdate(el);
        expect(el.getAttribute('variant')).toBe('primary');
    });

    it('reflects explicit variant to attribute', async () => {
        const w = mount('<lm-prototype-button variant="danger">Delete</lm-prototype-button>');
        const el = w.querySelector('lm-prototype-button')!;
        await waitForUpdate(el);
        expect(el.getAttribute('variant')).toBe('danger');
    });

    it('reflects size to attribute', async () => {
        const w = mount('<lm-prototype-button size="lg">Big</lm-prototype-button>');
        const el = w.querySelector('lm-prototype-button')!;
        await waitForUpdate(el);
        expect(el.getAttribute('size')).toBe('lg');
    });

    it('reflects disabled to attribute', async () => {
        const w = mount('<lm-prototype-button disabled>Off</lm-prototype-button>');
        const el = w.querySelector('lm-prototype-button')!;
        await waitForUpdate(el);
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    it('reflects loading to attribute', async () => {
        const w = mount('<lm-prototype-button loading>Wait</lm-prototype-button>');
        const el = w.querySelector('lm-prototype-button')!;
        await waitForUpdate(el);
        expect(el.hasAttribute('loading')).toBe(true);
    });

    // ── Inner button state ──────────────────────────────────────────────────

    it('marks inner button disabled when host is disabled', async () => {
        const w = mount('<lm-prototype-button disabled>Off</lm-prototype-button>');
        const el = w.querySelector('lm-prototype-button')!;
        await waitForUpdate(el);
        const inner = el.shadowRoot?.querySelector('button');
        expect(inner?.disabled).toBe(true);
    });

    it('sets aria-busy when loading', async () => {
        const w = mount('<lm-prototype-button loading>Wait</lm-prototype-button>');
        const el = w.querySelector('lm-prototype-button')!;
        await waitForUpdate(el);
        const inner = el.shadowRoot?.querySelector('button');
        expect(inner?.getAttribute('aria-busy')).toBe('true');
    });

    it('does not set aria-busy when not loading', async () => {
        const el = host.querySelector('lm-prototype-button')!;
        await waitForUpdate(el);
        const inner = el.shadowRoot?.querySelector('button');
        expect(inner?.getAttribute('aria-busy')).toBeNull();
    });

    // ── Accessibility: axe-core ────────────────────────────────────────────

    it('has no a11y violations — primary (default)', async () => {
        const el = host.querySelector('lm-prototype-button')!;
        await waitForUpdate(el);
        const { violations } = await axe.run(document.body);
        expect(violations).toHaveLength(0);
    });

    it('has no a11y violations — secondary', async () => {
        const w = mount('<lm-prototype-button variant="secondary">Action</lm-prototype-button>');
        await waitForUpdate(w.querySelector('lm-prototype-button')!);
        const { violations } = await axe.run(document.body);
        expect(violations).toHaveLength(0);
    });

    it('has no a11y violations — danger', async () => {
        const w = mount('<lm-prototype-button variant="danger">Delete</lm-prototype-button>');
        await waitForUpdate(w.querySelector('lm-prototype-button')!);
        const { violations } = await axe.run(document.body);
        expect(violations).toHaveLength(0);
    });

    it('has no a11y violations — disabled', async () => {
        const w = mount('<lm-prototype-button disabled>Disabled</lm-prototype-button>');
        await waitForUpdate(w.querySelector('lm-prototype-button')!);
        const { violations } = await axe.run(document.body);
        expect(violations).toHaveLength(0);
    });

    it('has no a11y violations — loading', async () => {
        const w = mount('<lm-prototype-button loading>Loading…</lm-prototype-button>');
        await waitForUpdate(w.querySelector('lm-prototype-button')!);
        const { violations } = await axe.run(document.body);
        expect(violations).toHaveLength(0);
    });
});