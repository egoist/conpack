import ArrayMap from './array-map'
import Rule from './rule'

export default class Rules extends ArrayMap {
  add(name, options) {
    const rule = new Rule(options)
    this.store.set(name, rule)
    return rule
  }

  update(name, getNewOptions) {
    const rule = this.get(name)
    rule.update(getNewOptions)
    return this
  }

  toArray() {
    return Array.from(this.store.values()).map(rule => rule.toObject())
  }
}
