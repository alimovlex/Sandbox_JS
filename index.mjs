#!/usr/bin/env zx

console.log("Hello, World!");
let gitFlags = [
  '--oneline',
  '--decorate',
  '--color',
]

let currentDir = await $`pwd`;
echo(`Current directory is ${currentDir}.`);
let listFiles = await $`ls`;
echo(`${listFiles}`);
let resp = await fetch('https://ip-api.com/json');
echo(`${resp}`);
let gitLog = await $`git log ${gitFlags}`;
echo(`${gitLog}`);


