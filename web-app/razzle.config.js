const path = require("path");

module.exports = {
  experimental: {
    reactRefresh: true,
  },

  modifyWebpackConfig({ webpackConfig }) {
    const babelLoaderRule = webpackConfig.module.rules.find(
      (rule) => rule.test.toString() === /\.(js|jsx|mjs|ts|tsx)$/.toString()
    );

    return {
      ...webpackConfig,
      module: {
        ...webpackConfig.module,
        rules: [
          ...webpackConfig.module.rules,
          {
            ...babelLoaderRule,
            // We also want to transpile local shared code
            include: path.resolve(__dirname, "../shared/src"),
          },
        ],
      },
      resolve: {
        ...webpackConfig.resolve,
        alias: {
          ...webpackConfig.resolve.alias,
          // Only use one instance of react to avoid hooks errors
          react: path.resolve(__dirname, "node_modules/react"),
        },
      },
    };
  },

  modifyPaths({ paths }) {
    return {
      ...paths,
      appBabelRc: path.resolve(__dirname, 'babel.config.js')
    }
  }
};
