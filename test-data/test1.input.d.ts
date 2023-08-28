declare module '.' {
  interface Xxx {
    children(): Xxx;
  }
}

declare const from: (name: string) => Xxx;
declare module '.' {
  interface Xxx {
    findTag(name: string): Xxx;
    findClass(name: string): Xxx;
  }
}

interface Yyy {
  foo(xxx: Xxx): number;
  bar(xxx: Xxx): number;
}
declare module '.' {
  interface Xxx {
    eq(index: number): Xxx;
  }
}

interface Xxx {
}

export { type Xxx, type Yyy, from };
