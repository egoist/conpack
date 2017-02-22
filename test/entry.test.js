import Config from '../src/config'

describe('entry', () => {
  it('add a namespace', () => {
    const config = new Config()

    config
      .entry('client')
        .add('src/index.js')
        .end()

    expect(config.toConfig().entry).toEqual({
      client: ['src/index.js']
    })
  })

  it('add multiple namespaces', () => {
    const config = new Config()

    config
      .entry('client')
        .add('src/index.js')
        .add('foo.js')
        .end()
      .entry('vendor')
        .add('react')
        .add('vue')
        .end()

    expect(config.toConfig().entry).toEqual({
      client: ['src/index.js', 'foo.js'],
      vendor: ['react', 'vue']
    })
  })

  it('add path to existing namespace', () => {
    const config = new Config()

    config
      .entry('client')
        .add('src/index.js')
        .end()
      .entry('client')
        .add('foo.js')
        .end()

    expect(config.toConfig().entry).toEqual({
      client: ['src/index.js', 'foo.js']
    })
  })

  it('prepend path to existing namespace', () => {
    const config = new Config()

    config
      .entry('client')
        .add('src/index.js')
        .prepend('foo.js')
        .end()

    expect(config.toConfig().entry).toEqual({
      client: ['foo.js', 'src/index.js']
    })
  })

  it('delete a path', () => {
    const config = new Config()

    config
      .entry('client')
        .add('foo.js')
        .end()
      .entry('client')
        .delete('foo.js')
        .end()

    expect(config.toConfig().entry).toEqual({
      client: []
    })
  })
})
