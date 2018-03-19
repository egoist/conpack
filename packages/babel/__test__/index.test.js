import Conpack from 'conpack'
import babel from '..'

describe('main', () => {
  it('defaults', () => {
    const config = new Conpack()
    babel(config)
    expect(config.toConfig()).toMatchSnapshot()
  })

  it('babel-loader options', () => {
    const config = new Conpack()
    babel(config, {
      babelLoaderOptions: {
        babelrc: false
      }
    })
    expect(config.toConfig()).toMatchSnapshot()
  })
})
