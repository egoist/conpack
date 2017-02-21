import ChainMap from './chain-map'
import Rule from './rule'

export default class Module extends ChainMap {
  constructor(parentChain) {
    super(parentChain)
    this._rules = new ChainMap(this)
  }

  rule(name) {
    if (!this._rules.has(name)) {
      this._rules.set(name, new Rule(this.parentChain))
    }
    return this._rules.get(name)
  }

  toConfig() {
    const rules = this._rules.values().map(r => r.toConfig())
    return {rules}
  }
}
