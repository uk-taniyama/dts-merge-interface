interface Xxx {
    children(): Xxx;
    findTag(name: string): Xxx;
    findClass(name: string): Xxx;
    eq(index: number): Xxx;
}
interface Yyy {
    foo(xxx: Xxx): number;
    bar(xxx: Xxx): number;
}
declare const from: (name: string) => Xxx;
export { type Xxx, type Yyy, from };
