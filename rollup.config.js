import withSolid from 'rollup-preset-solid'
import postcss from 'rollup-plugin-postcss'
import nodeResolve from '@rollup/plugin-node-resolve'

export default withSolid({
  targets: ['esm', 'cjs'],
  printInstructions: true,
  input: 'src/index.tsx',
  plugins: [
    postcss({
      minimize: true,
      extract: true,
    }),
    nodeResolve(),
  ],
})
