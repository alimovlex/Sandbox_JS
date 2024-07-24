#!/usr/bin/env zx

console.log("Hello, World!");
let gitFlags = [
  '--oneline',
  '--decorate',
  '--color',
]

let currentDir = await $`pwd`;
console.log(`Current directory is ${currentDir}.`);
let listFiles = await $`ls`;
console.log(`${listFiles}`);
let response = await fetch('https://recompile.me');
if(response.ok) {
    console.log(await response.text());
}
let gitLog = await $`git log ${gitFlags}`;
console.log(`${gitLog}`);

