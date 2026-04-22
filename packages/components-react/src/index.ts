import { createComponent, type EventName } from '@lit/react';
import React from 'react';
import { LmPrototypeButton as LmPrototypeButtonElement } from '@lm-prototype/components';

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

export type { ButtonVariant, ButtonSize, ButtonType } from '@lm-prototype/components';