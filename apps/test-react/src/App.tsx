import { useState } from 'react';
import {
    LmPrototypeButton,
    LmPrototypeInput,
    LmPrototypeDropdown,
    LmPrototypeDropdownItem,
    LmPrototypeCheckbox
} from '@lm-prototype/components-react';
import '@lm-prototype/tokens/themes/light.css';
import '@lm-prototype/icons';

export default function EventRegistration() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        ticketType: '',
        foodPreference: 'Ingen',
        newsletter: false,
        terms: false
    });

    const [isLoading, setIsLoading] = useState(false);

    const isFormValid =
        formData.firstName &&
        formData.lastName &&
        formData.email.includes('@') &&
        formData.ticketType &&
        formData.terms;

    const handleRegister = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            alert(`Tack för din anmälan, ${formData.firstName}! En bekräftelse har skickats till ${formData.email}.`);
        }, 2000);
    };

    return (
        <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px' }}>
            <header style={{ marginBottom: '32px' }}>
                <h1>Anmälan: TechConf 2026</h1>
                <p>Säkra din plats på årets största utvecklarkonferens.</p>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <LmPrototypeInput
                        label="Förnamn*"
                        value={formData.firstName}
                        onInput={(e: any) => setFormData({...formData, firstName: e.target.value})}
                    />
                    <LmPrototypeInput
                        label="Efternamn*"
                        value={formData.lastName}
                        onInput={(e: any) => setFormData({...formData, lastName: e.target.value})}
                    />
                </div>

                <LmPrototypeInput
                    label="E-postadress*"
                    placeholder="namn@foretag.se"
                    value={formData.email}
                    onInput={(e: any) => setFormData({...formData, email: e.target.value})}
                />

                <LmPrototypeDropdown label="Biljettyp:" variant="secondary">
                    <LmPrototypeDropdownItem onClick={() => setFormData({...formData, ticketType: 'Standard'})} icon="arrow-right">
                        Standard (2995 kr)
                    </LmPrototypeDropdownItem>
                    <LmPrototypeDropdownItem onClick={() => setFormData({...formData, ticketType: 'VIP'})} icon="check">
                        VIP (4995 kr)
                    </LmPrototypeDropdownItem>
                    <LmPrototypeDropdownItem onClick={() => setFormData({...formData, ticketType: 'Student'})} icon="arrow-right">
                        Student (495 kr)
                    </LmPrototypeDropdownItem>
                </LmPrototypeDropdown>

                <LmPrototypeDropdown
                    label="Välj mat:"
                    variant="secondary"
                    onLmChange={(e: any) => {
                        setFormData({...formData, foodPreference: e.detail.value});
                    }}
                >
                    <LmPrototypeDropdownItem value="Ingen">Ingen särskild</LmPrototypeDropdownItem>
                    <LmPrototypeDropdownItem value="Vegetariskt">Vegetariskt</LmPrototypeDropdownItem>
                    <LmPrototypeDropdownItem value="Veganskt">Veganskt</LmPrototypeDropdownItem>
                    <LmPrototypeDropdownItem onClick={() => setFormData({...formData, foodPreference: 'Annat'})}>Annat (anges vid ankomst)</LmPrototypeDropdownItem>
                </LmPrototypeDropdown>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <LmPrototypeCheckbox
                        checked={formData.newsletter}
                        onChange={(e: any) => setFormData({...formData, newsletter: e.target.checked})}
                    >
                        Jag vill få uppdateringar om framtida events via e-post.
                    </LmPrototypeCheckbox>

                    <LmPrototypeCheckbox
                        checked={formData.terms}
                        onChange={(e: any) => setFormData({...formData, terms: e.target.checked})}
                    >
                        Jag godkänner villkoren.*
                    </LmPrototypeCheckbox>
                </div>

                <footer style={{
                    marginTop: '24px',
                    paddingTop: '24px',
                    borderTop: '1px solid #ccc',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '12px'
                }}>
                    <LmPrototypeButton variant="tertiary" onClick={() => window.location.reload()}>
                        Rensa
                    </LmPrototypeButton>

                    <LmPrototypeButton
                        variant="primary"
                        disabled={!isFormValid}
                        loading={isLoading}
                        onClick={handleRegister}
                        icon="check"
                    >
                        Slutför anmälan
                    </LmPrototypeButton>
                </footer>

            </div>
        </div>
    );
}