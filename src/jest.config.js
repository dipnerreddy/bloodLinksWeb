module.exports = {
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Transform JavaScript files with Babel
    },
    transformIgnorePatterns: [
      '/node_modules/(?!axios)/',  // Add axios to the transform regex so Jest can process it
    ],
  };
  