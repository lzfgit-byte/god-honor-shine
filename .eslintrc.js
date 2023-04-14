module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  globals: {
    defineEmits: 'readonly',
    defineProps: 'readonly',
    defineExpose: 'readonly',
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
    'plugin:vue/essential',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    'prettier/prettier': 'error',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'no-debugger': 'off',
    'no-unused-vars': 1,
    'vue/no-multiple-template-root': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'vue/require-default-prop': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'vue/no-v-model-argument': 'off',
    'prefer-const': 'off',
  },
};
