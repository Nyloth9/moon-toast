import withSolid from 'rollup-preset-solid'
import css from 'rollup-plugin-import-css'

export default withSolid({
  targets: ['esm', 'cjs'],
  printInstructions: true,
  input: 'src/index.tsx',
  plugins: [css()],
})
