import Rules from './rules'
import Plugins from './plugins'

class Conpack {
  constructor() {
    this.config = {}
    this.rules = new Rules()
    this.plugins = new Plugins()
  }

  getConfig() {
    return {
      ...this.config,
      module: {
        ...(this.config && this.config.module),
        rules: this.rules.toArray()
      },
      plugins: this.plugins.toArray()
    }
  }
}

export default function () {
  return new Conpack()
}
