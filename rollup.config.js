import withSolid from 'rollup-preset-solid'
import alias from '@rollup/plugin-alias';
import copy from 'rollup-plugin-copy'

export default withSolid({
  targets: ['esm', 'cjs'],
  printInstructions: true,
  input: 'src/index.tsx',
  plugins: [
    alias({
      entries: {
        'solid-moon-toast': './src/styles/index.css',
      },
    }),
    copy({
      targets: [{ src: 'src/styles/index.css', dest: 'dist/source/styles' }],
    }),
  ],
})
