class Cache {
  /**
   * The max number of keys this cache can hold
   * @param {number} size
   */
  constructor(size) {
    if (isNaN(size)) throw new Error("Cache size must be a number");
    if (size < 1) throw new Error("Cache size must at least be 1");
    this.map = new Map();
    this.keys = new Array(size);
    this.currIndex = 0;
  }

  /**
   * Adds a key and pairs it with a value
   * If this is already at maximum occupation, this will remove the oldest element.
   * @param {any} key
   * @param {any} value
   */
  add(key, value) {
    if (this.map.has(key)) {
      this.map.set(key, value);
      return;
    }

    if (this.keys[this.currIndex] != null) {
      this.map.delete(this.keys[this.currIndex]);
    }

    this.keys[this.currIndex] = key;
    this.currIndex = (this.currIndex + 1) % this.keys.length;
    this.map.set(key, value);
  }

  /**
   * Checks if this cache contains a key
   * @param {any} key
   */
  contains(key) {
    return this.map.has(key);
  }

  /**
   * Retrieves a value from this cache corresponding to the specified key
   * @param {any} key
   */
  get(key) {
    return this.map.get(key);
  }

  /**
   * Removed the key value entry from this cache corresponding to the specified key
   * @param {any} key
   */
  remove(key) {
    this.map.delete(key);
  }

  clear() {
    this.map.clear();
  }
}

module.exports = Cache;
