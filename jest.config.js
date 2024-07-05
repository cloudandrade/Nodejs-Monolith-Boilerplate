module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/src/tests/**/*.test.ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json',
      },
    },
    moduleNameMapper: {
      '^#application/(.*)$': '<rootDir>/src/application/$1',
      '^#domain/(.*)$': '<rootDir>/src/domain/$1',
      '^#infra/(.*)$': '<rootDir>/src/infra/$1',
      '^#shared/(.*)$': '<rootDir>/src/shared/$1',
      '^#tests/(.*)$': '<rootDir>/src/tests/$1',
      '^#root/(.*)$': '<rootDir>/src/$1'
    },
  };
  