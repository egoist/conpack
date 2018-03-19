module.exports = (config, { babelLoaderOptions } = {}) => {
  const jsRule = config.rules.add('js', {
    test: /\.jsx?$/,
    exclude: [/node_modules/]
  })

  jsRule.loaders.add('babel-loader', {
    loader: 'babel-loader',
    options: babelLoaderOptions
  })

  return config
}
