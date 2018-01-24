import Conpack from '../src'

it('simple', () => {
  const conpack = new Conpack()
  conpack.config.entry = 'src/index.js'
  const jsRule = conpack.rules.add('js', {
    test: /\.js$/,
    exclude: [/node_modules/]
  })
  jsRule.loaders.add('babel', {
    loader: 'babel-loader',
    options: {}
  })
  jsRule.loaders.add('eslint', {
    loader: 'eslint-loader',
    options: { eslintrc: false }
  })
  jsRule.loaders.replace('babel', 'buble', {
    loader: 'buble',
    options: { hehe: true }
  })
  jsRule.loaders.update('eslint', options => {
    options.loader = 'my-eslint-loader'
    return options
  })
  class Plugin {
    constructor(...options) {
      this.options = options
    }
  }
  conpack.plugins.add('uglify', Plugin, [{ foo: 1 }, 's'])
  expect(conpack.getConfig()).toMatchSnapshot()
})
