#!/usr/bin/env node

import axios from 'axios';
import Spinnies from 'spinnies'

const _getURLResponse = async (url) => {
  let response;

  try {
    response = await axios.get(url);
  } catch (error) {
    response = error.response;
  }

  return response;
}

const _checkResponse = ({ response, options }) => {
  if (response.status) {
    return response.status === options.status;
  }

  return false;
}

export default async ({ env, file }) => {
  const spinnies = new Spinnies();

  spinnies.add('global', { text: 'Buscando APIs...', color: 'gray', succeedColor: 'gray' });

  const environmentParsed = {
    stage: {
      'bacon-ipsum': {
        url: 'https://baconipsum.com/api/?type=all-meat&paras=1',
        status: 200
      },
      'bacon-ipsum-fail': {
        url: 'https://baconipsum.com.fail/api/?type=all-meat&paras=1',
        status: 200
      },
      'loripsum': {
        url: 'https://loripsum.net/api/1/short',
        status: 200
      },
      'yes-or-no': {
        url: 'https://yesno.wtf/api',
        status: 200
      }
    }
  }

  const callChain = Object.entries(environmentParsed[env]).map(async ([ name, options]) => {
    spinnies.add(name, { text: name, color: 'gray' });

    const response = await _getURLResponse(options.url);

    return {
      name,
      options,
      response
    };
  })

  for await (const call of callChain) {
    const { name, options, response } = call;

    const isUp = _checkResponse({ response, options });

    if (isUp) {
      spinnies.succeed(name, { text: `${name} [${response.status}]` });
    } else {
      spinnies.fail(name, { text: `${name} [${response.status}]` });
    }
  }

  spinnies.succeed('global');
}