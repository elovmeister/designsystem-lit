import { describe, it, expect, beforeEach, vi } from 'vitest';
import '../index.js';

function mount(html: string): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper);
    return wrapper;
}

describe('lm-prototype-dropdown-item', () => {
    it('fires lm-dropdown-item-select when clicked', () => {
        const host = mount('<lm-prototype-dropdown-item value="1">Item</lm-prototype-dropdown-item>');
        const item = host.querySelector('lm-prototype-dropdown-item')!;

        const spy = vi.fn();
        item.addEventListener('lm-dropdown-item-select', spy);

        const innerDiv = item.shadowRoot?.querySelector('.item') as HTMLElement;
        innerDiv.click();

        expect(spy).toHaveBeenCalledOnce();
    });
});