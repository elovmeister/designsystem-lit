import { describe, it, expect } from 'vitest';
import './lm-prototype-button.js';

async function waitForUpdate(el: Element) {
    await (el as any).updateComplete;
}

describe('lm-prototype-button', () => {
    it('renders with default variant', async () => {
        document.body.innerHTML = '<lm-prototype-button>Klick</lm-prototype-button>';
        const el = document.querySelector('lm-prototype-button')!;
        await waitForUpdate(el);
        expect(el.getAttribute('variant')).toBe('primary');
    });

    it('reflects disabled to host attribute', async () => {
        document.body.innerHTML = '<lm-prototype-button disabled>Off</lm-prototype-button>';
        const el = document.querySelector('lm-prototype-button')!;
        await waitForUpdate(el);
        expect(el.hasAttribute('disabled')).toBe(true);
    });
});