import ChainMap from './chain-map'

export default class Plugin extends ChainMap {
  constructor(parentChain) {
    super(parentChain)
  }

  use(PluginClass, ...options) {
    this._plugin = typeof PluginClass === 'function' ? new PluginClass(...options) : PluginClass
    return this
  }

  toConfig() {
    return this._plugin
  }
}
