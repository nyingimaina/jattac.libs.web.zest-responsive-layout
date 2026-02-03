import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';
import cssnano from 'cssnano';
import terser from '@rollup/plugin-terser'; // Correct import for @rollup/plugin-terser

export default [
  {
    input: 'src/UI/ZestResponsiveLayout.tsx',
    output: [
      {
        file: 'dist/ZestResponsiveLayout.js',
        format: 'cjs',
        sourcemap: true,
        plugins: [terser()], // Minify CJS output
      },
      {
        file: 'dist/ZestResponsiveLayout.esm.js',
        format: 'esm',
        sourcemap: true,
        plugins: [terser()], // Minify ESM output
      },
    ],
    plugins: [
      resolve(),
      typescript({
        tsconfig: './tsconfig.json',
        // Removed outDir and declarationDir from here, will be managed by tsconfig.json and Rollup
      }),
      postcss({
        modules: true, // Enable CSS modules
        inject: true, // Inject CSS into the JS bundle
        extract: false, // Do not extract to a separate CSS file
        minimize: true, // Minimize CSS
        plugins: [cssnano()]
      }),
    ],
    external: ['react', 'react-dom'], // Mark React as external to avoid bundling it
  },
  {
    // For type declarations
    input: './dist/ZestResponsiveLayout.d.ts', // Corrected path
    output: [{ file: 'dist/ZestResponsiveLayout.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
];
