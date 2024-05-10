import withSolid from 'rollup-preset-solid'
import postcss from 'rollup-plugin-postcss'
import copy from 'rollup-plugin-copy'

export default withSolid({
  targets: ['esm', 'cjs'],
  printInstructions: true,
  input: 'src/index.tsx',
  plugins: [
    postcss({
      minimize: true,
      extract: true,
    }),
    copy({
      targets: [{ src: 'src/styles/index.css', dest: 'dist/source/styles' }],
    }),
  ],
})
