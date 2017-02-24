import ChainMap from './chain-map'

export default class Plugin extends ChainMap {
  use(PluginClass, ...options) {
    this.PluginClass = PluginClass
    this._options = options
    this._plugin = new PluginClass(...options)
    return this
  }

  update(handler) {
    this._plugin = new this.PluginClass(typeof handler === 'function' ? handler(...this._options) : handler)
    return this
  }

  toConfig() {
    return this._plugin
  }
}
