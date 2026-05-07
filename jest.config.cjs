module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  passWithNoTests: true,
};