const axios = require('axios');
const check = require('../../lib/check');

const MOCK_JSON_FILE = './tests/mocks/mock.json';
const MOCK_ENV = 'MOCK';
const ERROR_CODE_JSON = 'INVALID_JSON';
const ERROR_CODE_ENV = 'INVALID_ENV';

const mockConsoleLog = jest.fn();

jest.mock(
  'spinnies',
  () =>
    class MockSpinnies {
      add = jest.fn();

      fail = jest.fn();

      succeed = jest.fn();
    }
);

jest.mock('axios', () => {
  return {
    get: jest.fn(),
    interceptors: {
      request: {
        use: jest.fn(),
      },
      response: {
        use: jest.fn(),
      },
    },
  };
});

describe('check.js', () => {
  console = {
    log: mockConsoleLog,
  };

  beforeEach(() => {
    mockConsoleLog.mockClear();
    axios.get.mockClear();
  });

  it('Return a instance of async function', () => {
    expect(check).toHaveProperty('default');
    expect(check.default).toBeInstanceOf(Function);
  });

  it('Missing ENV', async () => {
    await check.default({ env: null, file: MOCK_JSON_FILE });

    expect(mockConsoleLog).toHaveBeenCalledWith(new Error(ERROR_CODE_ENV));
  });

  it('Missing JSON', async () => {
    await check.default({ env: MOCK_ENV, file: null });

    expect(mockConsoleLog).toHaveBeenCalledWith(new Error(ERROR_CODE_JSON));
  });

  it('Request URLs', async () => {
    axios.get.mockImplementation(
      jest.fn(() => {
        return { status: '1234' };
      })
    );

    await check.default({ env: MOCK_ENV, file: MOCK_JSON_FILE });

    expect(mockConsoleLog).not.toHaveBeenCalledWith(ERROR_CODE_JSON);
    expect(mockConsoleLog).not.toHaveBeenCalledWith(ERROR_CODE_ENV);

    // TODO: Assert all URLs here
  });
});
