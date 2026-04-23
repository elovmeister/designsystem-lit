import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import '@lm-prototype/components/lm-prototype-button';


interface ButtonDemo {
  variant: 'primary' | 'secondary' | 'tertiary' | 'danger';
  label: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="app">
      <header class="app-header">
        <h1>Design System — Angular Test App</h1>
        <lm-prototype-button variant="tertiary" (click)="toggleTheme()">
          {{ darkMode ? '☀️ Light' : '🌙 Dark' }}
        </lm-prototype-button>
      </header>

      <main class="app-main">
        <section class="demo-section">
          <h2 class="demo-title">Variants</h2>
          <div class="demo-row">
            <lm-prototype-button variant="primary">Primary</lm-prototype-button>
            <lm-prototype-button variant="secondary">Secondary</lm-prototype-button>
            <lm-prototype-button variant="tertiary">Tertiary</lm-prototype-button>
            <lm-prototype-button variant="danger">Danger</lm-prototype-button>
          </div>
        </section>

        <section class="demo-section">
          <h2 class="demo-title">Sizes</h2>
          <div class="demo-row">
            <lm-prototype-button size="sm">Small</lm-prototype-button>
            <lm-prototype-button size="md">Medium</lm-prototype-button>
            <lm-prototype-button size="lg">Large</lm-prototype-button>
          </div>
        </section>

        <section class="demo-section">
          <h2 class="demo-title">With Icons</h2>
          <div class="demo-row">
            <lm-prototype-button variant="primary">
              <lm-prototype-icon slot="start" name="arrow-right"></lm-prototype-icon>
              Continue
            </lm-prototype-button>
            <lm-prototype-button variant="secondary">
              Save
              <lm-prototype-icon slot="end" name="check"></lm-prototype-icon>
            </lm-prototype-button>
            <lm-prototype-button variant="danger">
              <lm-prototype-icon slot="start" name="x"></lm-prototype-icon>
              Remove
            </lm-prototype-button>
          </div>
        </section>

        <section class="demo-section">
          <h2 class="demo-title">States</h2>
          <div class="demo-row">
            <lm-prototype-button [attr.loading]="loading || null" (click)="simulateAsync()">
              {{ loading ? 'Saving…' : 'Click to load (2s)' }}
            </lm-prototype-button>
            <lm-prototype-button disabled>Disabled</lm-prototype-button>
            <lm-prototype-button loading>Always loading</lm-prototype-button>
          </div>
        </section>

        <section class="demo-section">
          <h2 class="demo-title">Form Participation</h2>
          <form (submit)="onSubmit($event)" class="demo-form">
            <input
              name="q"
              placeholder="Type something…"
              class="demo-input"
            />
            <lm-prototype-button type="submit">Submit</lm-prototype-button>
            <lm-prototype-button type="reset" variant="tertiary">Reset</lm-prototype-button>
          </form>
        </section>
      </main>
    </div>
  `,
  styles: [`
    .app {
      padding: 40px;
      min-height: 100vh;
    }

    .app-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 1px solid var(--lm-prototype-color-border-default);
    }

    h1 {
      font-size: 24px;
      font-weight: 700;
      margin: 0;
    }

    .demo-section {
      margin-bottom: 32px;
    }

    .demo-title {
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--lm-prototype-color-text-secondary);
      margin: 0 0 12px;
    }

    .demo-row {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      align-items: center;
    }

    .demo-form {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .demo-input {
      padding: 8px 12px;
      border: 1px solid var(--lm-prototype-color-border-default);
      border-radius: var(--lm-prototype-radius-md);
      background: var(--lm-prototype-color-surface-raised);
      color: var(--lm-prototype-color-text-primary);
      font-size: var(--lm-prototype-font-size-md);
      font-family: inherit;
    }

    .demo-input:focus {
      outline: 2px solid var(--lm-prototype-color-border-focus);
      outline-offset: 2px;
    }
  `],
})
export class AppComponent {
  darkMode = false;
  loading = false;

  toggleTheme(): void {
    this.darkMode = !this.darkMode;
    document.documentElement.dataset['theme'] = this.darkMode ? 'dark' : '';
  }

  simulateAsync(): void {
    this.loading = true;
    setTimeout(() => { this.loading = false; }, 2000);
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    alert('Submitted: ' + JSON.stringify(Object.fromEntries(data as any)));
  }
}
