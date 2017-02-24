import Config from '../src/config'

describe('config', () => {
  it('set devtool', () => {
    const config = new Config()

    config.devtool('source-map')

    expect(config.toConfig().devtool)
      .toBe('source-map')
  })

  it('set target', () => {
    const config = new Config()

    config.target('node')

    expect(config.toConfig().target)
      .toBe('node')
  })

  it('set context', () => {
    const config = new Config()

    config.context(__dirname)

    expect(config.toConfig().context)
      .toBe(__dirname)
  })

  it('set profile', () => {
    const config = new Config()

    config.profile(true)

    expect(config.toConfig().profile)
      .toBe(true)
  })
})
