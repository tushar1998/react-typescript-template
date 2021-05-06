const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = (envVars) => merge(commonConfig, require(`./webpack.${envVars.env}.js`));
