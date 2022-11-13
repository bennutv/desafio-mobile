module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    './jest.setup.js',
  ],
  testMatch: ['**/__tests__/**/*.(spec|test).[jt]s?(x)?'],
  moduleNameMapper: {
    'styled-components':
      '<rootDir>/node_modules/styled-components/native/dist/styled-components.native.cjs.js',
    '.svg': '<rootDir>/__tests__/mocks/react-native-svg-transformer.mock.js',
  },
};
