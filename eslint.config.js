import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

// Las dependencias de ESLint ya estaban en package.json, pero faltaba el
// archivo de config: `npm run lint` fallaba con "couldn't find
// eslint.config.js" desde que ESLint 9 dejó de leer el formato .eslintrc.
export default tseslint.config(
  // .claude/worktrees: worktrees de git de sesiones viejas, no son fuente.
  { ignores: ['dist', 'node_modules', '.vite-react-ssg-temp', '.claude'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  {
    // Archivos de config: corren en Node, no en el navegador.
    files: ['*.config.{js,ts}'],
    languageOptions: { globals: globals.node },
  },
)
