#!/usr/bin/env node

const check = require('../lib/check.js')
const commander = require('commander');
const packageJSON = require('../package.json');

commander
  .version(packageJSON.version)
  .description(packageJSON.description)
  .requiredOption('-e, --env <string>', 'environment to check')
  .requiredOption('-f, --file <path>', 'projects JSON file')
  .parse(process.argv)

const { env, file } = commander

check({ env, file })