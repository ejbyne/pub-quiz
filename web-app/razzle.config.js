const path = require("path");

module.exports = {
  modifyWebpackConfig({ webpackConfig }) {
    return {
      ...webpackConfig,
      resolve: {
        ...webpackConfig.resolve,
        alias: {
          ...webpackConfig.resolve.alias,
          react: path.resolve(__dirname, "node_modules/react"),
        },
      },
    };
  },

  modifyPaths({ paths }) {
    return {
      ...paths,
      appSrc: [paths.appSrc, path.resolve(__dirname, "../shared/src")],
    };
  },
};
