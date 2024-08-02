#!/usr/bin/env zx
import { $, argv, cd, chalk, fs, question, os } from "zx";
import path from "path";

async function verboseErrorMessage(error) {
  console.error(`Error: ${error.message}`);
  console.error(`Exit code: ${error.exitCode}`);
  console.error(`Standard error: ${error.stderr}`);
  console.error(`Command: ${error.originalCommand}`);
}

async function checkRequiredProgramsExist(programs) {
  try {
    for (let program of programs) {
      await $`which ${program}`;
    }
  } catch (error) {
    verboseErrorMessage(error);
    }
}

async function projectInfo() {

  let gitFlags = [
    '--all', 
    '--decorate', 
    '--oneline',
    '--graph',
    '--stat',
    '--color',
  ]
  console.log(`${process.argv[1]}`);
  let currentDir = await $`pwd`;
  console.log(`Current directory is ${currentDir}.`);
  let listFiles = await $`ls`;
  console.log(`${listFiles}`);

  const branch = await $`git branch --show-current`;
  console.log(`Current branch: ${branch}`);

  let gitLog = await $`git log ${gitFlags}`;
  //console.log(`${gitLog}`);

  let logFile = "./git.log";
  fs.createFile(`${logFile}`);
  fs.writeFile(`${logFile}`, gitLog.stdout, err => {
    if (err) {
      verboseErrorMessage(err);
    } else {
      console.log("Logged project history to the file successfully!");
    }
  });
  
}

async function checkWeather(city) {
  
  let BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
  let API_KEY = "dd901d59fd590a54f070075a96812a94";
  let response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
  if(response.ok) {
    let json = await response.text();
    let obj = JSON.parse(json);
    /*
    const obj = JSON.parse(json, function (key, value) {
      console.log(`Key`, key, `->`, value);
    });
    */
   console.log("The weather forecast for:", obj.name);
   console.log("Current weather:", obj.weather[0].description);
   console.log("Current temperature:", obj.main.temp, "C");
   console.log("Current wind speed:", obj.wind.speed, "m/s");
   console.log("Current humidity:", obj.main.humidity, "%");
  }
}

await checkWeather("London");
await checkRequiredProgramsExist(["git", "ls", "node", "npx"]);
await projectInfo();



