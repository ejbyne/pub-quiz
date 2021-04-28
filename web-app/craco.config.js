const path = require('path');
const cracoBabelLoader = require('craco-babel-loader');
const cracoAlias = require('craco-alias');

module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  plugins: [
    {
      plugin: cracoBabelLoader,
      options: {
        includes: [path.resolve(__dirname, '../shared/src')],
      },
    },
    {
      plugin: cracoAlias,
      options: {
        source: 'options',
        baseUrl: './',
        aliases: {
          react: './node_modules/react',
          '@apollo/react-hooks': './node_modules/@apollo/react-hooks',
          '@apollo/client': './node_modules/@apollo/client',
          graphql: './node_modules/graphql',
          '@aws-amplify/ui-components':
            './node_modules/@aws-amplify/ui-components',
          '@aws-amplify/ui-react': './node_modules/@aws-amplify/ui-react',
          'aws-amplify': './node_modules/aws-amplify',
        },
      },
    },
  ],
};
