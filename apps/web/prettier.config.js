module.exports = {
  trailingComma: 'all',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  printWidth: 60,
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  tailwindConfig: './tailwind.config.js',
};
