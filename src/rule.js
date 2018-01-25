import ArrayMap from './array-map'
import { getOptions } from './utils'

export default class Rule {
  constructor(options) {
    this.options = options
    this.loaders = new ArrayMap()
  }

  update(getNewOptions) {
    this.options = getOptions(getNewOptions, this.options)
    return this
  }

  toObject() {
    return {
      ...this.options,
      use: this.loaders.toArray()
    }
  }
}
