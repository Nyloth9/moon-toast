import withSolid from 'rollup-preset-solid'
import postcss from 'rollup-plugin-postcss'
import path from 'path'

export default withSolid({
  targets: ['esm', 'cjs'],
  printInstructions: true,
  input: 'src/index.tsx',
  plugins: [
    postcss({
      minimize: true,
      extract: true,
/*       extract: path.resolve('dist/styles/index.css'), */
    }),
  ],
})
