import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import '@lm-prototype/components/lm-prototype-button';
import '@lm-prototype/components/lm-prototype-input';
import '@lm-prototype/components/lm-prototype-dropdown';
import '@lm-prototype/components/lm-prototype-dropdown-item';
import '@lm-prototype/components/lm-prototype-checkbox';

import '@lm-prototype/tokens/themes/light.css';
import '@lm-prototype/icons';

@Component({
  selector: 'app-root',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="container">
      <header class="header">
        <h1>Anmälan: TechConf 2026</h1>
        <p>Säkra din plats på årets största utvecklarkonferens.</p>
      </header>

      <div class="form-layout">
        <div class="name-grid">
          <lm-prototype-input
            label="Förnamn*"
            [attr.value]="formData.firstName"
            (input)="updateInput('firstName', $event)">
          </lm-prototype-input>

          <lm-prototype-input
            label="Efternamn*"
            [attr.value]="formData.lastName"
            (input)="updateInput('lastName', $event)">
          </lm-prototype-input>
        </div>

        <lm-prototype-input
          label="E-postadress*"
          placeholder="namn@foretag.se"
          [attr.value]="formData.email"
          (input)="updateInput('email', $event)">
        </lm-prototype-input>

        <lm-prototype-dropdown label="Biljettyp:" variant="secondary">
          <lm-prototype-dropdown-item (click)="setTicketType('Standard')" icon="arrow-right">
            Standard (2995 kr)
          </lm-prototype-dropdown-item>
          <lm-prototype-dropdown-item (click)="setTicketType('VIP')" icon="check">
            VIP (4995 kr)
          </lm-prototype-dropdown-item>
          <lm-prototype-dropdown-item (click)="setTicketType('Student')" icon="arrow-right">
            Student (495 kr)
          </lm-prototype-dropdown-item>
        </lm-prototype-dropdown>

        <lm-prototype-dropdown label="Välj mat:" variant="secondary">
          <lm-prototype-dropdown-item (click)="setFoodPreference('Ingen')">Ingen särskild</lm-prototype-dropdown-item>
          <lm-prototype-dropdown-item (click)="setFoodPreference('Vegetariskt')">Vegetariskt</lm-prototype-dropdown-item>
          <lm-prototype-dropdown-item (click)="setFoodPreference('Veganskt')">Veganskt</lm-prototype-dropdown-item>
          <lm-prototype-dropdown-item (click)="setFoodPreference('Annat')">Annat (anges vid ankomst)</lm-prototype-dropdown-item>
        </lm-prototype-dropdown>

        <div class="checkbox-group">
          <lm-prototype-checkbox
            [attr.checked]="formData.newsletter"
            (change)="updateCheckbox('newsletter', $event)">
            Jag vill få uppdateringar om framtida events via e-post.
          </lm-prototype-checkbox>

          <lm-prototype-checkbox
            [attr.checked]="formData.terms"
            (change)="updateCheckbox('terms', $event)">
            Jag godkänner villkoren.*
          </lm-prototype-checkbox>
        </div>

        <footer class="footer">
          <lm-prototype-button variant="tertiary" (click)="resetForm()">
            Rensa
          </lm-prototype-button>

          <!-- Dynamiska boolean-attribut i Angular -->
          <lm-prototype-button
            variant="primary"
            icon="check"
            [attr.disabled]="!isFormValid"
            [attr.loading]="isLoading"
            (click)="handleRegister()">
            Slutför anmälan
          </lm-prototype-button>
        </footer>
      </div>
    </div>
  `,
  styles: [`
    .container { max-width: 600px; margin: 40px auto; padding: 20px; }
    .header { margin-bottom: 32px; }
    .form-layout { display: flex; flex-direction: column; gap: 24px; }
    .name-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .checkbox-group { display: flex; flex-direction: column; gap: 12px; }
    .footer { margin-top: 24px; padding-top: 24px; border-top: 1px solid #ccc; display: flex; justify-content: flex-end; gap: 12px; }
  `]
})
export class AppComponent {
  // 1. Angulars version av "State" är bara vanliga klass-variabler
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    ticketType: '',
    foodPreference: 'Ingen',
    newsletter: false,
    terms: false
  };

  isLoading = false;

  // 2. Computed values löses oftast som TypeScript "getters"
  get isFormValid(): boolean {
    return !!(
      this.formData.firstName &&
      this.formData.lastName &&
      this.formData.email.includes('@') &&
      this.formData.ticketType &&
      this.formData.terms
    );
  }

  // 3. Helper-funktioner för att fånga Lit-events och uppdatera state
  updateInput(field: keyof typeof this.formData, event: Event) {
    const target = event.target as HTMLInputElement;
    (this.formData[field] as string) = target.value;
  }

  updateCheckbox(field: keyof typeof this.formData, event: Event) {
    const target = event.target as HTMLInputElement;
    (this.formData[field] as boolean) = target.checked;
  }

  setTicketType(type: string) {
    this.formData.ticketType = type;
  }

  setFoodPreference(pref: string) {
    this.formData.foodPreference = pref;
  }

  // 4. Själva affärslogiken
  handleRegister() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      alert(`Tack för din anmälan, \${this.formData.firstName}! En bekräftelse har skickats till \${this.formData.email}.`);
    }, 2000);
  }

  resetForm() {
    window.location.reload();
  }
}
