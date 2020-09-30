import check from '../lib/check.js'
import commander from 'commander';

commander.version('0.0.1');

commander
  .option('-e, --env <string>', 'environment to check')
  .option('-f, --file <path>', 'projects JSON file')
  .parse(process.argv)

const { env, file } = commander

check({ env, file })