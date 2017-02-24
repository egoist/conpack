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
    this.loaders = new ChainMap()
  }

  test(re) {
    this.set('test', re)
    return this
  }

  loader(name, loader, options) {
    if (this.loaders.has(name)) {
      const current = this.loaders.get(name)
      current.loader = loader
      current.options = typeof options === 'function' ? options(current.options) : options
    } else {
      this.loaders.set(name, new Loader({loader, options}))
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
      use: this.loaders.values()
    }
  }
}
