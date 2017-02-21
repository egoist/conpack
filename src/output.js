import ChainMap from './chain-map'

export default class Output extends ChainMap {
  path(path) {
    this.set('path', path)
    return this
  }

  filename(filename) {
    this.set('filename', filename)
    return this
  }

  publicPath(path) {
    this.set('publicPath', path)
    return this
  }

  library(library) {
    this.set('library', library)
    return this
  }

  libraryTarget(libraryTarget) {
    this.set('libraryTarget', libraryTarget)
    return this
  }
}
