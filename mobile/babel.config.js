const path = require('path');

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          react: path.join(__dirname, 'node_modules/react'),
          '@apollo/react-hooks': path.join(
            __dirname,
            'node_modules/@apollo/react-hooks',
          ),
          '@apollo/client': path.join(__dirname, 'node_modules/@apollo/client'),
        },
      },
    ],
  ],
};
