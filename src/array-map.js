import { getOptions } from './utils'

export default class ArrayMap {
  constructor() {
    this.store = new Map()
  }

  add(name, value) {
    this.store.set(name, value)
    return value
  }

  has(name) {
    return this.store.has(name)
  }

  prepend(name, options) {
    this.store = new Map([
      [name, options],
      ...Array.from(this.store)
    ])
    return this
  }

  get(name) {
    return this.store.get(name)
  }

  update(name, getNewValue) {
    const newValue = getOptions(getNewValue, this.get(name))
    this.store.set(name, newValue)
    return this
  }

  replace(oldName, newName, options) {
    const store = Array.from(this.store)
    this.store = new Map(store.map(item => {
      const [name] = item
      if (oldName === name) {
        return [newName, options]
      }
      return item
    }))
    return this
  }

  toArray() {
    return Array.from(this.store.values())
  }
}
