import Config from '../src/config'

describe('plugin', () => {
  it('add a plugin', () => {
    const config = new Config()
    class Plugin {
      constructor(options) {return options}
    }
    config
      .plugin('html')
      .use(Plugin, {foo: 'foo'})

    expect(config.toConfig().plugins).toEqual([{foo: 'foo'}])
  })

  it('replace a plugin', () => {
    const config = new Config()
    class Plugin {
      constructor(options) {return options}
    }
    config
      .plugin('html')
        .use(Plugin, {foo: 'foo'})
        .end()
      .plugin('html')
        .use(Plugin, {foo: 'bar'})

    expect(config.toConfig().plugins).toEqual([{foo: 'bar'}])
  })

  it('update options of a plugin', () => {
    const config = new Config()

    class Plugin {
      constructor(options) {return options}
    }

    config
      .plugin('html')
        .use(Plugin, {foo: 1})
        .update({foo: 2})
        .end()
      .plugin('css')
        .use(Plugin, {bar: 1})
        .update(options => ({bar: options.bar + 1}))

    expect(config.toConfig().plugins).toEqual([{
      foo: 2
    }, {
      bar: 2
    }])
  })

  it('delete a plugin', () => {
    const config = new Config()
    class Plugin {
      constructor(options) {return options}
    }
    config
      .plugin('html')
        .use(Plugin, {foo: 'foo'})
        .end()
      .plugins
        .delete('html')

    expect(config.toConfig().plugins).toEqual([])
  })
})
