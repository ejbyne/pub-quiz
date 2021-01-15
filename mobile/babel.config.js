const path = require('path');

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          react: path.join(__dirname, 'node_modules/react'),
          '@apollo/client': path.join(__dirname, 'node_modules/@apollo/client'),
        },
      },
    ],
  ],
};
