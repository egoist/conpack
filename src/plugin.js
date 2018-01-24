export default class Rule {
  constructor(Ctor, options) {
    this.Ctor = Ctor
    this.options = Array.isArray(options) ? options : [options]
  }

  update(getNewOptions) {
    this.options = getNewOptions(this.options)
    return this
  }

  invoke() {
    return new this.Ctor(...this.options)
  }
}
