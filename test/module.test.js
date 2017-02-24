import Config from '../src/config'

describe('module', () => {
  describe('rule', () => {
    it('add rule add delete rule', () => {
      const config = new Config()

      const res = config
        .module
          .rule('compile')
            .loader('babel', 'babel-loader', {
              presets: ['es2015']
            })
            .end()
          .rules
            .delete('compile')

      expect(config.toConfig().module.rules).toEqual([])
    })

    it('add loader and remove loader', () => {
      const config = new Config()

      config
        .module
          .rule('compile')
            .loader('babel', 'babel-loader', {
              presets: ['es2015']
            })
            .loader('eslint', 'eslint-loader', {
              eslintrc: false
            })
            .loader('to-delete', 'delete-loader', {})
            .loaders
              .delete('to-delete')

      expect(config.toConfig().module.rules).toEqual([{
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }, {
          loader: 'eslint-loader',
          options: {
            eslintrc: false
          }
        }]
      }])
    })

    it('set include and exclude', () => {
      const config = new Config()

      config
        .module
          .rule('compile')
            .loader('babel', 'babel-loader')
            .include('foo')
            .exclude('bar')

      expect(config.toConfig().module.rules).toEqual([{
        use: [{
          loader: 'babel-loader'
        }],
        include: 'foo',
        exclude: 'bar'
      }])
    })

    it('use function as loader option', () => {
      const config = new Config()

      config
        .module
          .rule('compile')
            .loader('babel', 'babel-loader', {foo: 1})
            .loader('babel', 'babel-loader', options => ({foo: options.foo + 1}))

      expect(config.toConfig().module.rules).toEqual([{
        use: [{
          loader: 'babel-loader',
          options: {foo: 2}
        }]
      }])
    })

    it('test extension', () => {
      const config = new Config()

      config
        .module
          .rule('compile')
            .test(/\.js$/)
            .loader('babel', 'babel-loader')

      expect(config.toConfig().module.rules).toEqual([{
        test: /\.js$/,
        use: [{
          loader: 'babel-loader'
        }]
      }])
    })
  })

  it('set custom property', () => {
    const config = new Config()

    config
      .module
        .set('noParse', /react/)

    expect(config.toConfig().module).toEqual({
      rules: [],
      noParse: /react/
    })
  })
})
