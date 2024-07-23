#!/usr/bin/env zx

console.log("Hello, World!");
let flags = [
  '--oneline',
  '--decorate',
  '--color',
]

let currentDir = await $`pwd`;
echo(`Current directory is ${currentDir}.`);
let listFiles = await `$ls`;
echo(`${listFiles}`);
let resp = await fetch('https://ip-api.com');
echo(`${resp}`);
await $`git log ${flags}`

try {
  await $`exit 1`;
} catch (p) {
  console.log(`Exit code: ${p.exitCode}`); // Exit code: 1
  console.log(`Error: ${p.stderr}`); // Error:
}
