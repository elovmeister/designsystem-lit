import { createComponent, type EventName } from '@lit/react';
import React from 'react';
import {
    LmPrototypeButton as LmPrototypeButtonElement,
    LmPrototypeDropdown as LmPrototypeDropdownElement
} from '@lm-prototype/components';

export const LmPrototypeButton = createComponent({
    tagName: 'lm-prototype-button',
    elementClass: LmPrototypeButtonElement,
    react: React,
    events: {
        onClick: 'click' as EventName<MouseEvent>,
        onFocus: 'focus' as EventName<FocusEvent>,
        onBlur:  'blur'  as EventName<FocusEvent>,
    },
    displayName: 'LmPrototypeButton',
});

export const LmPrototypeDropdown = createComponent({
    tagName: 'lm-prototype-dropdown',
    elementClass: LmPrototypeDropdownElement,
    react: React,
    events: {
        // Vi fångar ert custom event och typkodar det så React-utvecklaren får auto-complete
        onLmChange: 'lm-change' as EventName<CustomEvent<{ open: boolean }>>,
        onClick: 'click' as EventName<MouseEvent>,
        onFocus: 'focus' as EventName<FocusEvent>,
        onBlur:  'blur'  as EventName<FocusEvent>,
    },
    displayName: 'LmPrototypeDropdown',
});

export type {
    ButtonVariant,
    ButtonSize,
    ButtonType,
    DropdownVariant,
    DropdownSize
} from '@lm-prototype/components';