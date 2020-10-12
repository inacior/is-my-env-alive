import axios from 'axios';
import chalk from 'chalk';
import fs from 'fs-extra';
import Spinnies from 'spinnies';
import Table from 'cli-table3';

const MAX_PREVIEW_LENGTH = 30;

axios.interceptors.request.use(
  (config) => {
    config.metadata = { startTime: new Date() };

    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => {
    response.config.metadata.endTime = new Date();
    response.duration =
      response.config.metadata.endTime - response.config.metadata.startTime;

    return response;
  },
  (error) => {
    error.config.metadata.endTime = new Date();
    error.duration =
      error.config.metadata.endTime - error.config.metadata.startTime;

    return Promise.reject(error);
  }
);

const spinnies = new Spinnies();
const table = new Table({
  head: ['Status', 'Project', 'URL', 'Response Time', 'Preview'],
  style: {
    head: ['blue'],
  },
});

const _getURLResponse = async (url) => {
  let response;

  try {
    response = await axios.get(url);
  } catch (error) {
    if (error.response) {
      response = error.response;
    } else if (error.code) {
      response = { status: error.code };
    } else {
      response = { status: '?' };
    }

    if (error.duration) {
      response.duration = error.duration;
    }
  }

  return response;
};

const _checkResponse = ({ response, options }) => {
  if (response.status) {
    return response.status === options.status;
  }

  return false;
};

const _getProjects = async ({ file, env }) => {
  const fileExists = await fs.pathExists(file);

  if (!fileExists) {
    throw new Error('INVALID_JSON');
  }

  const allProjects = await fs.readJson(file);

  const projects = allProjects[env];

  if (!projects) {
    throw new Error('INVALID_ENV');
  }

  return projects;
};

const _catchGlobalError = ({ file, error }) => {
  spinnies.fail('global');

  console.log(chalk.yellow('Wrong JSON format!'));
  console.log(chalk.yellow(`Check the ${file} file`));
  console.log(chalk.gray(`\nRaw error:`));
  console.log(error);
};

const getPreview = (data) => {
  let stringifiedData = '';

  if (typeof data === 'string') {
    stringifiedData = data;
  } else if (typeof data === 'object') {
    stringifiedData = JSON.stringify(data);
  }

  return stringifiedData.slice(0, MAX_PREVIEW_LENGTH);
};

const check = async ({ env, detailed = false, file }) => {
  spinnies.add('global', {
    text: 'Buscando APIs... \n',
    color: 'gray',
    succeedColor: 'gray',
  });

  let projects;

  try {
    projects = await _getProjects({ file, env });
  } catch (error) {
    _catchGlobalError({ file, error });
    return;
  }

  const callChain = Object.entries(projects).map(async ([name, options]) => {
    spinnies.add(name, { text: name, color: 'gray' });

    const response = await _getURLResponse(options.url);

    return {
      name,
      options,
      response,
    };
  });

  for await (const call of callChain) {
    const { name, options, response } = call;

    const isUp = _checkResponse({ response, options });
    const spinniesHandler = isUp ? spinnies.succeed : spinnies.fail;

    spinniesHandler.call(spinnies, name, {
      text: `${name} [${response.status}]`,
    });

    if (detailed) {
      const statusColor = isUp ? chalk.green : chalk.red;
      const details = [
        statusColor(response.status),
        name,
        options.url,
        `${response.duration}ms`,
      ];

      if (response.data) {
        details.push(getPreview(response.data));
      }

      table.push(details);
    }
  }

  spinnies.succeed('global');

  if (detailed) {
    console.log(table.toString());
  }
};

export default check;
