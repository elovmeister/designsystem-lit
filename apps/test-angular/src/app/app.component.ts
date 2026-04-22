// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@lm-prototype/components/lm-prototype-button';
import '@lm-prototype/icons/lm-prototype-icon';

@Component({
  standalone: true,
  selector: 'app-root',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <h1>LM Prototype test — Angular</h1>
    <lm-prototype-button variant="primary" (click)="onClick()">Klicka här</lm-prototype-button>
  `,
})
export class AppComponent {
  onClick() { alert('Hej!'); }
}
