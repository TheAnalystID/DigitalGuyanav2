module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  testMatch: ['**/*.test.js'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  }
}; 