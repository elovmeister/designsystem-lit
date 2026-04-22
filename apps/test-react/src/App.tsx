import { LmPrototypeButton } from '@lm-prototype/components-react';
import '@lm-prototype/icons/ds-icon';
import '@lm-prototype/tokens/themes/light.css';

export default function App() {
  return (
      <div style={{ padding: 40 }}>
        <h1>LM Prototype test — React</h1>
        <LmPrototypeButton variant="primary" onClick={() => alert('Hej!')}>
          Klicka här
        </LmPrototypeButton>
      </div>
  );
}