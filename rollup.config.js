import withSolid from 'rollup-preset-solid'
import copy from 'rollup-plugin-copy'

export default withSolid({
  targets: ['esm', 'cjs'],
  printInstructions: true,
  input: 'src/index.tsx',
  plugins: [
    copy({
      targets: [{ src: 'src/styles/index.css', dest: 'dist' }],
    }),
  ],
})
