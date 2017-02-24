import Config from '../src/config'

describe('module', () => {
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
