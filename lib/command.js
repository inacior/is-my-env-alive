#!/usr/bin/env node

const check = require('../lib/check.js')
const commander = require('commander');
const packageJSON = require('../package.json');

commander
  .version(packageJSON.version)
  .description(packageJSON.description)
  .option('-e, --env <string>', 'environment to check')
  .option('-f, --file <path>', 'projects JSON file')
  .parse(process.argv)

const { env, file } = commander

check({ env, file })