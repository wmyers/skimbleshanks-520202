import jestConfig from 'next/jest.js';

const createJestConfig = jestConfig({
  dir: './',
});

/** @type {import ("jest").Config} */
const config = {
  collectCoverage: false,
  testEnvironment: 'node',
};

export default createJestConfig(config);
