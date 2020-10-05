import check from '../lib/check.js';
import commander from 'commander';
import packageJSON from '../package.json';

commander.
	version(packageJSON.version).
	description(packageJSON.description).
	requiredOption('-e, --env <string>', 'environment to check').
	requiredOption('-f, --file <path>', 'projects JSON file').
	parse(process.argv);

const {env, file} = commander;

check({env, file});
