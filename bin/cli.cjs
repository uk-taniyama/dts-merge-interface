#!/usr/bin/env node
const { readFileSync, writeFileSync } = require('fs');

const { transformString } = require('../dist/index.cjs');

const input = process.argv[2] || '/dev/stdin';
const output = process.argv[3] || '/dev/stdout';

const text = readFileSync(input, 'utf-8');
const result = transformString(text);
writeFileSync(output, result, 'utf-8');
