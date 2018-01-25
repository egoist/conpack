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
        ...this.config.module,
        rules: [
          ...this.rules.toArray(),
          ...((this.config.module && this.config.module.rules) || [])
        ]
      },
      plugins: [...this.plugins.toArray(), ...(this.config.plugins || [])]
    }
  }
}

export default function () {
  return new Conpack()
}
