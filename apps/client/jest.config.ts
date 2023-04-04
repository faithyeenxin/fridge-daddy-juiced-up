export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['./src/setupTests.ts'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.svg$': 'jest-transform-stub',
    '^.+\\.gif$': 'jest-transform-stub',
    '^.+\\.(css|scss)$': 'jest-transform-stub',
    '\\.css$': 'jest-css-modules-transform',
    '^.+\\.png$': 'jest-transform-stub',
  },
  transformIgnorePatterns: ['/node_modules/(?!react-toastify)'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  testEnvironmentOptions: { url: 'http://localhost:5173' },
};
