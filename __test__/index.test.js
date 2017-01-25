import conpack from '../src'

test('loader', () => {
  const config = conpack({
    module: {
      rules: [
        {test: /\.css$/, loader: 'style-loader!css-loader'}
      ]
    }
  })
  config.loader('.css', rule => {
    rule.loader = 'style-loader!css-loader!postcss-loader'
    return rule
  })
  expect(config.webpackConfig.module.rules).toEqual([{
    test: /\.css$/,
    loader: 'style-loader!css-loader!postcss-loader'
  }])
})

test('plugin', () => {
  const config = conpack()
  config.plugin('html', 'foo')
  config.plugin('html', 'bar')
  config.plugin('css', 'haha')
  expect(config.webpackConfig.plugins).toEqual([
    'bar',
    'haha'
  ])
})
