import type { OutputChunk, PluginImpl } from 'rollup';

import { transformString } from 'dts-merge-interface';

function isChunk(val: unknown): val is OutputChunk {
  return (val as any)?.type === 'chunk';
}

export const dtsMergeInterface: PluginImpl = () => {
  return {
    name: 'dts-merge-interface',
    generateBundle(options, bundle) {
      Object.values(bundle).forEach((chunk) => {
        if (isChunk(chunk)) {
          // eslint-disable-next-line no-param-reassign
          chunk.code = transformString(chunk.code);
        }
      });
    },
  };
};

export default dtsMergeInterface;
