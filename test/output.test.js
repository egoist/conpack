import Config from '../src/config'

describe('output', () => {
  it('set path', () => {
    const config = new Config()

    config
      .output
        .path(__dirname)
        .end()

    expect(config.toConfig().output).toEqual({
      path: __dirname
    })
  })

  it('set filename', () => {
    const config = new Config()

    config
      .output
        .filename('[name].js')

    expect(config.toConfig().output).toEqual({filename: '[name].js'})
  })

  it('set publicPath', () => {
    const config = new Config()

    config
      .output
        .publicPath(__dirname)

    expect(config.toConfig().output).toEqual({publicPath: __dirname})
  })

  it('set library', () => {
    const config = new Config()

    config
      .output
        .library('foo')

    expect(config.toConfig().output).toEqual({library: 'foo'})
  })

  it('set libraryTarget', () => {
    const config = new Config()

    config
      .output
        .libraryTarget('foo')

    expect(config.toConfig().output).toEqual({libraryTarget: 'foo'})
  })

  it('set custom property', () => {
    const config = new Config()

    config
      .output
        .set('chunkFilename', '[id].js')
        .end()

    expect(config.toConfig().output).toEqual({
      chunkFilename: '[id].js'
    })
  })
})
