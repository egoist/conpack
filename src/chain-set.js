export default class ChainSet {
  constructor(parentChain) {
    this.parentChain = parentChain
    this.collection = new Set()
  }

  delete(value) {
    this.collection = new Set([...this.collection].filter(v => value !== v))
    return this
  }

  clear() {
    this.collection.clear()
    return this
  }

  add(value) {
    this.collection.add(value)
    return this
  }

  addMany(array) {
    for (const value of array) {
      this.add(value)
    }
    return this
  }

  prepend(value) {
    this.collection = new Set([value, ...this.collection])
    return this
  }

  append(value) {
    this.collection = new Set([...this.collection, value])
    return this
  }

  end() {
    return this.parentChain
  }

  values() {
    // Set to Array
    return [...this.collection]
  }

  has(value) {
    return this.collection.has(value)
  }
}
