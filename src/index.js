import get from 'lodash.get'
import set from 'lodash.set'
import Rules from './rules'
import Plugins from './plugins'

export default class Conpack {
  constructor() {
    this.config = {}
    this.rules = new Rules()
    this.plugins = new Plugins()
  }

  toConfig() {
    return {
      ...this.config,
      module: {
        ...this.config.module,
        rules: [
          ...this.rules.toArray(),
          ...((this.config.module && this.config.module.rules) || [])
        ]
      },
      plugins: [...this.plugins.toArray(), ...(this.config.plugins || [])]
    }
  }

  get(path) {
    return get(this.config, path)
  }

  set(path, value) {
    return set(this.config, path, value)
  }

  prepend(path, item) {
    const value = this.get(path) || []
    this.set(path, [
      item,
      ...value
    ])
    return this
  }

  append(path, item) {
    const value = this.get(path) || []
    this.set(path, [
      ...value,
      item
    ])
    return this
  }

  has(path, item) {
    return this.get(path).includes(item)
  }
}
