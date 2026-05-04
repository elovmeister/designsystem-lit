import { createComponent } from '@lit/react';
import * as React from 'react';

import {
    LmPrototypeButton as ButtonElement,
    LmPrototypeDropdown as DropdownElement,
    LmPrototypeDropdownItem as DropdownItemElement,
    LmPrototypeInput as InputElement,
    LmPrototypeCheckbox as CheckboxElement
} from '@lm-prototype/components';

export const LmPrototypeButton = createComponent({
    tagName: 'lm-prototype-button',
    elementClass: ButtonElement,
    react: React,
});

export const LmPrototypeDropdown = createComponent({
    tagName: 'lm-prototype-dropdown',
    elementClass: DropdownElement,
    react: React,
    events: { onLmChange: 'lm-change' }
});

export const LmPrototypeDropdownItem = createComponent({
    tagName: 'lm-prototype-dropdown-item',
    elementClass: DropdownItemElement,
    react: React,
});

export const LmPrototypeInput = createComponent({
    tagName: 'lm-prototype-input',
    elementClass: InputElement,
    react: React,
});

export const LmPrototypeCheckbox = createComponent({
    tagName: 'lm-prototype-checkbox',
    elementClass: CheckboxElement,
    react: React,
});