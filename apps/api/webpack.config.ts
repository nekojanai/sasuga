const path = require('path');
const webpack = require('webpack');
const ts = require('typescript');

/**
 * Extend the default Webpack configuration from nx / ng.
 * this webpack.config is used w/ node:build builder
 * see angular.json greenroom-rest-api
 */
module.exports = (config, context) => {
  // Install additional plugins
  console.log('loading plugins')

  addSwagger(config);

  config.plugins = [
    ...(config.plugins || []),
    new webpack.ProvidePlugin({
      'openapi': '@nestjs/swagger',
      'transpileOnly': false
    })
  ]  

  return config;
};

/**
 * Adds nestjs swagger plugin 
 * 
 * nestjs swagger: https://docs.nestjs.com/recipes/swagger#plugin
 * ts-loader: https://github.com/Igorbek/typescript-plugin-styled-components#ts-loader
 * getCustomTransformers: https://github.com/TypeStrong/ts-loader#getcustomtransformers
 * 
 * Someone else has done this, see:
 * https://github.com/nrwl/nx/issues/2147 
 */
const addSwagger = (config) => {
  const rule = config.module.rules
    // tslint:disable-next-line: no-shadowed-variable
    .find(rule => rule.loader);
  if (!rule)
    throw new Error('no ts-loader rule found');
  rule.options = {
    ...rule.options,
    getCustomTransformers: () => {
      const program = ts.createProgram([
        path.join(__dirname, 'main.ts')
      ], {});
      return {
        before: [require('@nestjs/swagger/plugin').before({
          classValidatorShim: true,
        }, program)]
      };
    },
  };
}