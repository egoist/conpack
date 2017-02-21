import ChainMap from './chain-map'
import ChainSet from './chain-set'

export default class ResolveLoader extends ChainMap {
  constructor(parentChain) {
    super(parentChain)
    this.modules = new ChainSet(this)
  }

  toConfig() {
    return {
      modules: this.modules.values()
    }
  }
}
