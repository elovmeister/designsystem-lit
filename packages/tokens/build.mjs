import StyleDictionary from 'style-dictionary';

async function buildLight() {
    const sd = new StyleDictionary({
        usesDtcg: true,
        source: [
            'src/tokens/primitive.json',
            'src/themes/light.json',
        ],
        platforms: {
            css: {
                transformGroup: 'css',
                prefix: 'ds',
                buildPath: 'dist/themes/',
                files: [{
                    destination: 'light.css',
                    format: 'css/variables',
                    options: { selector: ':root', outputReferences: true },
                }],
            },
            json: {
                buildPath: 'dist/',
                files: [{ destination: 'tokens.json', format: 'json/nested' }],
            },
        },
    });
    await sd.buildAllPlatforms();
}

async function buildDark() {
    const sd = new StyleDictionary({
        usesDtcg: true,
        include: ['src/tokens/primitive.json'],
        source:  ['src/themes/dark.json'],
        platforms: {
            css: {
                transformGroup: 'css',
                prefix: 'ds',
                buildPath: 'dist/themes/',
                files: [{
                    destination: 'dark.css',
                    format: 'css/variables',
                    filter: (token) => token.isSource,
                    options: { selector: '[data-theme="dark"]', outputReferences: false },
                }],
            },
        },
    });
    await sd.buildAllPlatforms();
}

await buildLight();
await buildDark();
console.log('\nTokens built successfully');