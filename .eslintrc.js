module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ["plugin:prettier/recommended"],
  rules: {
    "prettier/prettier": "error",
  },
};
