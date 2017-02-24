import ChainMap from './chain-map'
import Rule from './rule'

export default class Module extends ChainMap {
  constructor(parentChain) {
    super(parentChain)
    this.rules = new ChainMap(this)
  }

  rule(name) {
    if (!this.rules.has(name)) {
      this.rules.set(name, new Rule(this))
    }
    return this.rules.get(name)
  }

  toConfig() {
    const rules = this.rules.values().map(r => r.toConfig())

    return {
      rules,
      ...this.entries()
    }
  }
}
