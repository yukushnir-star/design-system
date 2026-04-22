/**
 * Style Dictionary config — tokens.json is the source of truth.
 *
 * Outputs:
 *   src/tokens.css  — CSS custom properties for runtime (components consume via var(--…))
 *   src/tokens.ts   — typed `tokens` object + `TokenName` type for programmatic use
 *
 * Custom name transform mirrors the project convention:
 *   primitive.color.blue.500       → --primitive-blue-500
 *   primitive.spacing.1            → --primitive-space-1
 *   primitive.radius.sm            → --primitive-radius-sm
 *   primitive.fontSize.16          → --primitive-font-size-16
 *   semantic.color.bg.primary      → --color-bg-primary
 *   semantic.color.error           → --color-error
 *   semantic.space.xs              → --space-xs
 *   semantic.borderRadius.md       → --border-radius-md
 *   semantic.fontSize.body-md      → --font-size-body-md
 *   semantic.fontFamily.sans       → --font-family-sans
 *   component.button.bg.default    → --button-bg-default
 *   component.input.border-default → --input-border-default
 */
import StyleDictionary from 'style-dictionary';

const kebab = (s) =>
  String(s).replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

StyleDictionary.registerTransform({
  name: 'name/design-system',
  type: 'name',
  transform: (token) => {
    const [tier, ...rest] = token.path;

    if (tier === 'primitive') {
      const [category, ...tail] = rest;
      const prefix =
        category === 'color'
          ? 'primitive'
          : category === 'spacing'
            ? 'primitive-space'
            : `primitive-${kebab(category)}`;
      return `${prefix}-${tail.join('-')}`;
    }

    if (tier === 'semantic') {
      const [category, ...tail] = rest;
      const prefix = category === 'color' ? 'color' : kebab(category);
      return tail.length ? `${prefix}-${tail.join('-')}` : prefix;
    }

    if (tier === 'component') {
      return rest.join('-');
    }

    return token.path.join('-');
  },
});

StyleDictionary.registerFormat({
  name: 'typescript/flat-object',
  format: ({ dictionary, file }) => {
    const header = file?.header ?? '';
    const entries = dictionary.allTokens
      .map((t) => `  '${t.name}': ${JSON.stringify(t.value)},`)
      .join('\n');
    return `${header}export const tokens = {\n${entries}\n} as const;\n\nexport type TokenName = keyof typeof tokens;\nexport type TokenValue = (typeof tokens)[TokenName];\n`;
  },
});

export default {
  source: ['src/tokens.json'],
  platforms: {
    css: {
      transforms: ['attribute/cti', 'name/design-system', 'color/css'],
      buildPath: 'src/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: { outputReferences: true },
        },
      ],
    },
    ts: {
      transforms: ['attribute/cti', 'name/design-system', 'color/css'],
      buildPath: 'src/',
      files: [
        {
          destination: 'tokens.ts',
          format: 'typescript/flat-object',
        },
      ],
    },
  },
  log: { verbosity: 'default' },
};
