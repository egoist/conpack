import ArrayMap from './array-map'

export default class Rule {
  constructor(options) {
    this.options = options
    this.loaders = new ArrayMap()
  }

  update(getNewOptions) {
    this.options = getNewOptions(this.options)
    return this
  }

  toObject() {
    return {
      ...this.options,
      use: this.loaders.toArray()
    }
  }
}
