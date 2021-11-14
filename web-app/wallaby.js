module.exports = () => ({
  // tell wallaby to use automatic configuration
  autoDetect: true,

  // provide the configuration file
  testFramework: {
    configFile: './jest.config.js',
  },
});
