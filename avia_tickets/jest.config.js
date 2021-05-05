module.exports = {
  clearMocks: true,
  collectCoverageFrom: ['src/**/*.js'],
  coverageDirectory: 'coverage',
  moduleFileExtentions: ['js'],
  testMatch: ['**/__test__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  testPathIgnorePatterns: ['\\\\node_modules\\\\'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  transform: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|jpeg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.(js|jsx|ts|tsx)?$': 'babel-jest',
  },
  // verbose: false,
};
