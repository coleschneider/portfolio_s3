jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

// include typings in the framework setup
const jestEnzyme = require('../node_modules/jest-enzyme/lib/index.js')

jasmine.getEnv().afterEach(() => {
  jest.clearAllMocks();
  global.gc();
});
