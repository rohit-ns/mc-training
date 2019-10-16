module.exports = {
  globals: {
  },
  moduleFileExtensions: [ 'ts','js'],
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"],
  testMatch: [ "**/__test__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)" ],
  testEnvironment: 'node'
}