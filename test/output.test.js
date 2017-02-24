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
