import { getOptions } from './utils'

export default class Rule {
  constructor(Ctor, options) {
    this.Ctor = Ctor
    this.options = Array.isArray(options) ? options : [options]
  }

  update(Ctor, getNewOptions) {
    if (Ctor) {
      this.Ctor = Ctor
    }
    if (getNewOptions) {
      this.options = getOptions(getNewOptions, this.options)
    }
    return this
  }

  invoke() {
    return new this.Ctor(...this.options)
  }
}
