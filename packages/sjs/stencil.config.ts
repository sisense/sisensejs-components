import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'sjs',
  outputTargets: [
    reactOutputTarget({
      componentCorePackage: '@sisense/sjs',
      proxiesFile: '../sjs-react/src/components/stencil-generated/index.ts',
      includeDefineCustomElements: true,
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
      dir: '../../docs',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
};
