const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = exports = {
  "extends": [
    "eslint:recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react/recommended",
  ],
  env: {
      'es6': true,        // We are writing ES6 code
      'browser': true,    // for the browser
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module",
    "allowImportExportEverywhere": false,  // import/export must happen at the top level.
  },
  "plugins": [
    "jsx-a11y", // https://www.npmjs.com/package/eslint-plugin-jsx-a11y
  ],
  "globals": {
    "$": true,
  },
  "rules": {
    // Overrides/additions to eslint:recommended:
    "no-console": OFF,
    "no-else-return": ERROR,
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "semi": ["error", "always"],
    "no-debugger": WARN,
    
    // Overrides of react/recommended:
    "react/no-unescaped-entities": ["error", {"forbid": [`"`, ">", "}"]}], // permit ' in jsx html,
    "react/prop-types": [OFF], // disabled so we can use composed prop-types
  }
}
