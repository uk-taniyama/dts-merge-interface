# dts-merge-interface

Merge the interfaces written in .d.ts.

## Usage

```
import { dtsMergeInterface } from 'dts-merge-interface/rollup-plugin';
import { dts } from 'rollup-plugin-dts';

const config = [
  // …
  {
    input: "src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [
      dts(),
      dtsMergeInterface(),
    ],
  },
];

export default config;
```

## before

```
declare module '.' {
    interface Interface {
        foo: () => void;
    }
}

declare module '.' {
    interface Interface {
        bar: () => void;
    }
}

interface Interface {
}

declare function example(): void;

export { type Interface, example as default };
```

## after

```
interface Interface {
    foo: () => void;
    bar: () => void;
}
declare function example(): void;
export { type Interface, example as default };
```
