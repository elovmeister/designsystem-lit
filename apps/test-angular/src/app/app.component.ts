/**import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import '@lm-prototype/components/lm-prototype-button';
import '@lm-prototype/components/lm-prototype-dropdown';

interface ButtonDemo {
  variant: 'primary' | 'secondary' | 'tertiary' | 'danger';
  label: string;
}

//@Component({
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

        <section class="demo-section">
          <h2 class="demo-title">Dropdown</h2>
          <div style="min-height: 250px;">
            <lm-prototype-dropdown variant="primary" size="lg">
              <span slot="label">Options</span>

              <div style="padding: 8px; display: flex; flex-direction: column; gap: 4px; min-width: 180px;">
                <a href="#"
                   style="padding: 8px 12px; border-radius: 4px; cursor: pointer; font-size: 14px; font-family: system-ui, sans-serif; color: #374151; text-decoration: none;">Account
                  settings</a>
                <a href="#"
                   style="padding: 8px 12px; border-radius: 4px; cursor: pointer; font-size: 14px; font-family: system-ui, sans-serif; color: #374151; text-decoration: none;">Support</a>
                <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 4px 0;">
                <a href="#"
                   style="padding: 8px 12px; border-radius: 4px; cursor: pointer; font-size: 14px; font-family: system-ui, sans-serif; color: #374151; text-decoration: none; color: #dc2626;">Sign
                  out</a>
              </div>

            </lm-prototype-dropdown>
          </div>
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
}*/
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importera hela ert bibliotek
import '@lm-prototype/components/lm-prototype-button';
import '@lm-prototype/components/lm-prototype-input';
import '@lm-prototype/components/lm-prototype-dropdown';
import '@lm-prototype/components/lm-prototype-dropdown-item';
import '@lm-prototype/components/lm-prototype-checkbox';
import '@lm-prototype/icons/lm-prototype-icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="app">
      <header class="app-header">
        <h1>Design System — Angular Test App</h1>
        <lm-prototype-button variant="tertiary" icon="moon" (click)="toggleTheme()">
          {{ darkMode ? 'Light Mode' : 'Dark Mode' }}
        </lm-prototype-button>
      </header>

      <main class="app-main">
        <section class="demo-section">
          <h2 class="demo-title">Testscenario: Konfigurera Strategi</h2>

          <form (submit)="onSubmit($event)" class="demo-form-card">

            <lm-prototype-input
              name="configName"
              label="Konfigurationsnamn"
              placeholder="T.ex. Nattkörning"
              required>
            </lm-prototype-input>

            <lm-prototype-dropdown
              name="strategy"
              label="Aktiv strategi"
              placeholder="Välj en strategi...">

              <lm-prototype-dropdown-item value="print" icon="printer">
                PrintStrategy
              </lm-prototype-dropdown-item>

              <lm-prototype-dropdown-item value="export" icon="upload">
                ExportStrategy
              </lm-prototype-dropdown-item>

              <lm-prototype-dropdown-item value="import" icon="download">
                ImportStrategy
              </lm-prototype-dropdown-item>
            </lm-prototype-dropdown>

            <lm-prototype-checkbox
              name="advanced"
              value="enabled"
              label="Aktivera avancerade inställningar"
              (change)="onAdvancedToggle($event)">
            </lm-prototype-checkbox>

            <div *ngIf="showAdvanced" class="advanced-panel">
              <lm-prototype-input
                name="apiKey"
                label="API-nyckel"
                placeholder="Skriv in din nyckel..."
                icon="lock">
              </lm-prototype-input>
            </div>

            <div class="form-actions">
              <lm-prototype-button type="submit" icon="check">Spara konfiguration</lm-prototype-button>
              <lm-prototype-button type="reset" variant="tertiary">Återställ</lm-prototype-button>
            </div>

          </form>
        </section>
      </main>
    </div>
  `,
  styles: [`
    .app { padding: 40px; min-height: 100vh; font-family: system-ui, sans-serif; }
    .app-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 1px solid #e5e7eb; }
    h1 { font-size: 24px; font-weight: 700; margin: 0; }
    .demo-section { margin-bottom: 32px; max-width: 500px; }
    .demo-title { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin: 0 0 12px; }

    .demo-form-card {
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 24px;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      background: #ffffff;
    }

    .advanced-panel {
      padding: 16px;
      background: #f9fafb;
      border-radius: 6px;
      border-left: 3px solid #005A9C;
    }

    .form-actions {
      display: flex;
      gap: 12px;
      margin-top: 8px;
      padding-top: 16px;
      border-top: 1px solid #e5e7eb;
    }
  `],
})
export class AppComponent {
  darkMode = false;
  showAdvanced = false;

  toggleTheme(): void {
    this.darkMode = !this.darkMode;
    document.documentElement.dataset['theme'] = this.darkMode ? 'dark' : '';
  }

  // Fångar event från er Web Component
  onAdvancedToggle(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.showAdvanced = target.checked;
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);

    // Visar att ElementInternals fungerar perfekt!
    alert('Sparad data från Web Components: \n\n' + JSON.stringify(Object.fromEntries(data as any), null, 2));
  }
}
