require('babel-register')({
  presets: ['es2015', 'stage-2'],
  babelrc: false
})
const format = require('serialize-javascript')

const config = require('./src')

const loader = config
  .entry('client')
    .add('src/index.js')
    .add('haha.js')
    .end()
  .entry('vendor')
    .add('vue')
    .add(['vuex', 'vue-router'])
    .end()
  .output
    .path(__dirname)
    .filename('[name].js')
    .end()
  .module
    .rule('compile')
    .test(/\.js$/)
    .loader('babel', 'babel-loader', {
      presets: ['es2017']
    })
    .end()
  .module
    .rule('css')
    .test(/\.css$/)
    .loader('style', 'style-loader')
    .loader('css', 'css-loader', {
      minimize: true
    })
    .include(() => {
      console.log('foo')
    })
    .end()
  .resolve
    .modules
      .add(__dirname)
      .end()
    .extensions
      .add('.js')
      .end()
    .end()
  .resolveLoader
    .modules
      .add('foo')
      .end()
    .end()
  .plugin('html')
    .use(class HtmlWebpackPlugin {
      constructor(opts) {
        return opts
      }
    }, {
      title: 'hello'
    })
    .end()
  .plugin('foo')
    .use(class {foo() {}}, {})
    .end()
  .plugin('html')
    .use({apply: 123})

console.log(format(config.toConfig(), 2))
