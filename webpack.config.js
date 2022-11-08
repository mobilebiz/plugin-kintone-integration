const DotEnvWebpack = require('dotenv-webpack');
module.exports = (config, { isProd, isDev, isTest }) => {
  /**
   * Customize the webpack by modifying the config object.
   * Consult https://webpack.js.org/configuration for more information
   */

  const envPath = '.env';
  config.plugins.push(
    new DotEnvWebpack({
      path: envPath,
    }),
  );
  return config;
};
