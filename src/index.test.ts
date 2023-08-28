import { existsSync, readFileSync, writeFileSync } from 'fs';

import { transformString } from '.';

describe('index', () => {
  const dataDir = `${__dirname}/../test-data/`;
  function test(name: string) {
    const inputPath = `${dataDir}/${name}.input.d.ts`;
    const expectedPath = `${dataDir}/${name}.output.d.ts`;
    const actualPath = `${dataDir}/${name}.actual.d.ts`;
    const input = readFileSync(inputPath, 'utf-8');
    const actual = transformString(input);
    if (!existsSync(expectedPath)) {
      writeFileSync(expectedPath, actual, 'utf-8');
      throw new Error(`save the actual data as the expected data.:${expectedPath}`);
    }
    const expected = readFileSync(expectedPath, 'utf-8');
    if (actual !== expected) {
      writeFileSync(actualPath, actual, 'utf-8');
      console.log('save actual', actualPath);
    }
    expect(actual).toEqual(expected);
  }

  it('transform', () => {
    test('test1');
  });
});
