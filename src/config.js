import ChainMap from './chain-map'
import ChainSet from './chain-set'
import Output from './output'
import Module from './module'
import Resolve from './resolve'
import ResolveLoader from './resolve-loader'
import Plugin from './plugin'

export default class Config {
  constructor() {
    this.options = new ChainMap(this)
    this.entries = new ChainMap(this)
    this.output = new Output(this)
    this.node = new ChainMap(this)
    this.performance = new ChainMap(this)
    this.module = new Module(this)
    this.resolve = new Resolve(this)
    this.resolveLoader = new ResolveLoader(this)
    this.plugins = new ChainMap(this)
  }

  entry(name) {
    if (!this.entries.has(name)) {
      this.entries.set(name, new ChainSet(this))
    }
    return this.entries.get(name)
  }

  plugin(name) {
    if (!this.plugins.has(name)) {
      this.plugins.set(name, new Plugin(this))
    }
    return this.plugins.get(name)
  }

  devtool(devtool) {
    this.options.set('devtool', devtool)
    return this
  }

  target(target) {
    this.options.set('target', target)
    return this
  }

  context(context) {
    this.options.set('context', context)
    return this
  }

  profile(profile) {
    this.options.set('profile', profile)
    return this
  }

  toConfig() {
    const entries = this.entries.entries()
    return {
      entry: entries && Object.keys(entries)
        .reduce((curr, next) => {
          curr[next] = entries[next].values()
          return curr
        }, {}),
      output: this.output.entries(),
      node: this.node.entries(),
      performance: this.performance.entries(),
      module: this.module.toConfig(),
      resolve: this.resolve.toConfig(),
      resolveLoader: this.resolveLoader.toConfig(),
      plugins: this.plugins.values().map(plugin => plugin.toConfig()),
      ...this.options.entries()
    }
  }
}
