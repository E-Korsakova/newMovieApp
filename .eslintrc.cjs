module.exports = {
  root: true,
  env: { browser: true, es2020: true, jest: true },
  extends: [
    'eslint:recommended',
    'plugin:react-hooks/recommended',
    "airbnb", 
    "airbnb/hooks", 
    "plugin:react/jsx-runtime", 
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    "prettier",
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', '.eslintrc.cjs', 'build'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    project: './tsconfig.json',
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ['@typescript-eslint', 'react', 'jsx-a11y', 'react-hooks', 'prettier', 'import'],
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "react/state-in-constructor": 0,
    "jsx-a11y/label-has-associated-control": 0,
    "prettier/prettier": "error",
    "linebreak-style": [0, "unix"],
    "quotes": ["error", "single"],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": 0,
    "import/no-unresolved": [2, { "caseSensitive": false }],
    "react/jsx-filename-extension": [1, { "extensions": ['.js', ".jsx", '.ts', '.tsx'] }],
    "import/order": [
      2,
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index"
        ],
        "newlines-between": "always"
        }
      ]
  },
  "settings": {
    "version": "detect",
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"],
        "moduleDirectory": ["node_modules", "src/"]
      }
    }
  }
}
