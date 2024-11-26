module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
  testMatch: ['**/src/**/*.test.ts'],
};