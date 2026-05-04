/**import { useState } from "react";
import { LmPrototypeButton, LmPrototypeDropdown } from "@lm-prototype/components-react";

import "@lm-prototype/tokens/themes/light.css";
import "@lm-prototype/tokens/themes/dark.css";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "lm-prototype-icon": React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement>,
                HTMLElement
            > & {
                name?: string;
                slot?: string;
            };
        }
    }
}

const Section = ({
                     title,
                     children,
                 }: {
    title: string;
    children: React.ReactNode;
}) => (
    <section style={{ marginBottom: 32 }}>
        <h2
            style={{
                fontSize: 14,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: 12,
                color: "var(--lm-prototype-color-text-secondary)",
            }}
        >
            {title}
        </h2>
        <div
            style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                alignItems: "center",
            }}
        >
            {children}
        </div>
    </section>
);

export default function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [loading, setLoading] = useState(false);

    const toggleTheme = () => {
        const next = !darkMode;
        setDarkMode(next);
        document.documentElement.dataset["theme"] = next ? "dark" : "";
    };

    const simulateAsync = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
    };

    const menuItemStyle: React.CSSProperties = {
        padding: "8px 12px",
        borderRadius: 4,
        cursor: "pointer",
        fontSize: 14,
        textDecoration: "none",
        color: "var(--lm-prototype-color-text-primary)",
    };

    return (
        <div
            style={{
                padding: 40,
                minHeight: "100vh",
                background: "var(--lm-prototype-color-surface-default)",
                color: "var(--lm-prototype-color-text-primary)",
                fontFamily: "var(--lm-prototype-font-family-sans, system-ui)",
            }}
        >
            <header
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 40,
                    borderBottom: "1px solid var(--lm-prototype-color-border-default)",
                    paddingBottom: 20,
                }}
            >
                <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>
                    Design System — React Test App
                </h1>
                <LmPrototypeButton variant="tertiary" onClick={toggleTheme}>
                    {darkMode ? "☀️ Light" : "🌙 Dark"}
                </LmPrototypeButton>
            </header>

            <Section title="Variants">
                <LmPrototypeButton variant="primary">Primary</LmPrototypeButton>
                <LmPrototypeButton variant="secondary">Secondary</LmPrototypeButton>
                <LmPrototypeButton variant="tertiary">Tertiary</LmPrototypeButton>
                <LmPrototypeButton variant="danger">Danger</LmPrototypeButton>
            </Section>

            <Section title="Sizes">
                <LmPrototypeButton size="sm">Small</LmPrototypeButton>
                <LmPrototypeButton size="md">Medium</LmPrototypeButton>
                <LmPrototypeButton size="lg">Large</LmPrototypeButton>
            </Section>

            <Section title="With Icons">
                <LmPrototypeButton variant="primary">
                    <lm-prototype-icon slot="start" name="arrow-right" />
                    Continue
                </LmPrototypeButton>
                <LmPrototypeButton variant="secondary">
                    Save
                    <lm-prototype-icon slot="end" name="check" />
                </LmPrototypeButton>
                <LmPrototypeButton variant="danger">
                    <lm-prototype-icon slot="start" name="x" />
                    Remove
                </LmPrototypeButton>
            </Section>

            <Section title="States">
                <LmPrototypeButton loading={loading} onClick={simulateAsync}>
                    {loading ? "Saving…" : "Click to load (2s)"}
                </LmPrototypeButton>
                <LmPrototypeButton disabled>Disabled</LmPrototypeButton>
                <LmPrototypeButton loading>Always loading</LmPrototypeButton>
            </Section>

            <Section title="Form Participation">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        alert("Submitted!");
                    }}
                    style={{ display: "flex", gap: 8, alignItems: "center" }}
                >
                    <input
                        name="q"
                        placeholder="Type something…"
                        style={{
                            padding: "8px 12px",
                            border: "1px solid var(--lm-prototype-color-border-default)",
                            borderRadius: "var(--lm-prototype-radius-md)",
                            background: "var(--lm-prototype-color-surface-raised)",
                            color: "var(--lm-prototype-color-text-primary)",
                            fontSize: "var(--lm-prototype-font-size-md)",
                        }}
                    />
                    <LmPrototypeButton type="submit">Submit</LmPrototypeButton>
                    <LmPrototypeButton type="reset" variant="tertiary">
                        Reset
                    </LmPrototypeButton>
                </form>
            </Section>

            <Section title="Dropdown">
                <div style={{ minHeight: 250 }}>
                    <LmPrototypeDropdown
                        variant="secondary"
                        size="md"
                        onLmChange={(e: any) => console.log("Dropdown open state:", e.detail.open)}
                    >
                        <span slot="label">Options</span>

                        <div style={{ padding: 8, display: "flex", flexDirection: "column", gap: 4, minWidth: 180 }}>
                            <a href="#" style={menuItemStyle}>
                                Account settings
                            </a>
                            <a href="#" style={menuItemStyle}>
                                Support
                            </a>
                            <hr style={{ border: 0, borderTop: "1px solid var(--lm-prototype-color-border-default)", margin: "4px 0" }} />
                            <a href="#" style={{ ...menuItemStyle, color: "var(--lm-prototype-color-danger-default)" }}>
                                Sign out
                            </a>
                        </div>
                    </LmPrototypeDropdown>
                </div>
            </Section>
        </div>
    );
}*/
import { useState } from "react";
import {
    LmPrototypeButton,
    LmPrototypeDropdown,
    LmPrototypeDropdownItem,
    LmPrototypeInput,
    LmPrototypeCheckbox
} from "@lm-prototype/components-react";

import "@lm-prototype/tokens/themes/light.css";
import "@lm-prototype/tokens/themes/dark.css";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section style={{ marginBottom: 32, maxWidth: 500 }}>
        <h2 style={{ fontSize: 14, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12, color: "var(--lm-prototype-color-text-secondary)" }}>
            {title}
        </h2>
        <div>{children}</div>
    </section>
);

export default function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);

    const toggleTheme = () => {
        const next = !darkMode;
        setDarkMode(next);
        document.documentElement.dataset["theme"] = next ? "dark" : "";
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        alert('Sparad data från Web Components: \n\n' + JSON.stringify(Object.fromEntries(data as any), null, 2));
    };

    return (
        <div style={{ padding: 40, minHeight: "100vh", background: "var(--lm-prototype-color-surface-default)", color: "var(--lm-prototype-color-text-primary)", fontFamily: "var(--lm-prototype-font-family-sans, system-ui)" }}>
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40, borderBottom: "1px solid var(--lm-prototype-color-border-default)", paddingBottom: 20, maxWidth: 800 }}>
                <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Design System — React Test App</h1>
                <LmPrototypeButton variant="tertiary" icon="chevron-down" onClick={toggleTheme}>
                    {darkMode ? "Light Mode" : "Dark Mode"}
                </LmPrototypeButton>
            </header>

            <Section title="Testscenario: Konfigurera Strategi">
                <form
                    onSubmit={handleSubmit}
                    style={{ display: "flex", flexDirection: "column", gap: 20, padding: 24, border: "1px solid var(--lm-prototype-color-border-default)", borderRadius: 8, background: "var(--lm-prototype-color-surface-raised)" }}
                >
                    <LmPrototypeInput
                        name="configName"
                        label="Konfigurationsnamn"
                        placeholder="T.ex. Nattkörning"
                        required
                    />

                    <LmPrototypeDropdown
                        name="strategy"
                        label="Aktiv strategi"
                        placeholder="Välj en strategi..."
                    >
                        <LmPrototypeDropdownItem value="print" icon="x">
                            PrintStrategy
                        </LmPrototypeDropdownItem>

                        <LmPrototypeDropdownItem value="export" icon="loader">
                            ExportStrategy
                        </LmPrototypeDropdownItem>

                        <LmPrototypeDropdownItem value="import" icon="x">
                            ImportStrategy
                        </LmPrototypeDropdownItem>
                    </LmPrototypeDropdown>

                    <LmPrototypeCheckbox
                        name="advanced"
                        value="enabled"
                        label="Aktivera avancerade inställningar"
                        onChange={(e: any) => setShowAdvanced(e.target.checked)}
                    />

                    {showAdvanced && (
                        <div style={{ padding: 16, background: "var(--lm-prototype-color-surface-subtle)", borderRadius: 6, borderLeft: "3px solid var(--lm-prototype-color-action-primary)" }}>
                            <LmPrototypeInput
                                name="apiKey"
                                label="API-nyckel"
                                placeholder="Skriv in din nyckel..."
                                icon="check"
                            />
                        </div>
                    )}

                    <div style={{ display: "flex", gap: 12, marginTop: 8, paddingTop: 16, borderTop: "1px solid var(--lm-prototype-color-border-default)" }}>
                        <LmPrototypeButton type="submit" icon="check">Spara konfiguration</LmPrototypeButton>
                        <LmPrototypeButton type="reset" variant="tertiary">Återställ</LmPrototypeButton>
                    </div>
                </form>
            </Section>
        </div>
    );
}