import ChainMap from './chain-map'

class Loader {
  constructor({loader, options}) {
    this.loader = loader
    this.options = options
  }
}

export default class Rule extends ChainMap {
  constructor(parentChain) {
    super(parentChain)
    this._loaders = new ChainMap()
  }

  test(re) {
    this.set('test', re)
    return this
  }

  loader(name, loader, options) {
    if (this._loaders.has(name)) {
      const current = this._loaders.get(name)
      current.loader = loader
      current.options = options
    } else {
      this._loaders.set(name, new Loader({loader, options}))
    }
    return this
  }

  include(include) {
    this.set('include', include)
    return this
  }

  exclude(exclude) {
    this.set('exclude', exclude)
    return this
  }

  toConfig() {
    return {
      ...this.entries(),
      use: this._loaders.values()
    }
  }
}
