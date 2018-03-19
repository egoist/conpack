import ArrayMap from './array-map'
import Plugin from './plugin'

export default class Plugins extends ArrayMap {
  add(name, Ctor, options) {
    this.store.set(name, new Plugin(Ctor, options))
    return this
  }

  update(name, Ctor, getNewOptions) {
    const plugin = this.get(name)
    plugin.update(Ctor, getNewOptions)
    return this
  }

  updateOptions(name, getNewOptions) {
    return this.update(name, null, getNewOptions)
  }

  toArray() {
    return Array.from(this.store.values()).map(plugin => plugin.invoke())
  }
}
