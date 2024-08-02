#!/usr/bin/env zx
import { $, argv, cd, chalk, fs, question } from "zx";
import path from "path";

console.log(`${process.argv[1]}`);
let gitFlags = [
  '--all', 
  '--decorate', 
  '--oneline',
  '--graph',
  '--stat',
  '--color',
]

let currentDir = await $`pwd`;
console.log(`Current directory is ${currentDir}.`);
let listFiles = await $`ls`;
console.log(`${listFiles}`);

let response = await fetch('https://raw.githubusercontent.com/AlexLakatos/computer-puns/main/puns.json');
if(response.ok) {
  let puns = await response.json();
  let randomPun = Math.floor(Math.random() * puns.length);
  console.log(puns[randomPun].pun);
  console.log(puns[randomPun].punchline);
}

const branch = await $`git branch --show-current`;
console.log(`Current branch: ${branch}`);

let gitLog = await $`git log ${gitFlags}`;
console.log(`${gitLog}`);

// Create an array
const arr = ["apple", "banana", "cherry"];
// Print the length of the array
console.log(`The length of the array is ${arr.length}`);
// Print all elements of the array
console.log(`All elements of the array are: ${arr}`);
// Loop through the array using a for-of loop
console.log("Looping through the array using a for-of loop:");
for (const element of arr) {
    console.log(element);
}

//verbose logging of shell commands
try {
  const output = await $`command arg1 arg2`;
  console.log(`Output: ${output}`);
} catch (err) {
  console.error(`Error: ${err.message}`);
  console.error(`Exit code: ${err.exitCode}`);
  console.error(`Standard error: ${err.stderr}`);
  console.error(`Command: ${err.originalCommand}`);
}

function exitWithError(errorMessage) {
  console.error(chalk.red(errorMessage));
  process.exit(1);
}
exitWithError("SCRIPT EXITING");