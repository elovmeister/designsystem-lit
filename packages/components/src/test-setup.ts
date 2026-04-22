import 'element-internals-polyfill';
import { afterEach } from 'vitest';

afterEach(() => {
    document.body.innerHTML = '';
});