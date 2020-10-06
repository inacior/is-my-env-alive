import check from '../lib/check.js';
import commander from 'commander';
import packageJSON from '../package.json';

commander
  .version(packageJSON.version)
  .description(packageJSON.description)
  .requiredOption('-e, --env <string>', 'environment to check')
  .option('-d, --detailed', 'display detailed table view')
  .requiredOption('-f, --file <path>', 'projects JSON file')
  .parse(process.argv)

const { env, detailed, file } = commander

check({ env, detailed, file })
