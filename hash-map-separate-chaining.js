import LinkedList from './LinkedList.js';

class HashMap {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this._hashTable = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._hashTable[index] === undefined) {
      return null;
    }
    return this._hashTable[index].find(key).data.value;
  }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }
    // Find the slot where this key should be in
    const index = this._findSlot(key);

    if (!this._hashTable[index]) {
      this.length++;
      const tempLinkedList = new LinkedList();
      tempLinkedList.insertLast({
        key,
        value,
      });
      this._hashTable[index] = tempLinkedList;
    } else {
      const currNodeWithKey = this._hashTable[index].find(key);
      if (!currNodeWithKey) {
        this._hashTable[index].insertLast({
          key,
          value,
        });
      } else {
        currNodeWithKey.data.value = value;
      }
    }
  }

  delete(key) {
    const index = this._findSlot(key);
    const slot = this._hashTable[index];
    if (slot === undefined) {
      throw new Error('Key error');
    }
    slot.remove(key);
    this.length--;
    this._deleted++;
  }

  _findSlot(key) {
    const hash = HashMap._hashString(key);
    return hash % this._capacity;
  }

  _resize(size) {
    const oldSlots = this._hashTable;
    this._capacity = size;
    // Reset the length - it will get rebuilt as you add the items back
    this.length = 0;
    this._deleted = 0;
    this._hashTable = [];

    for (const slot of oldSlots) {
      if (slot !== undefined) {
        let currNode = slot.head;
        while (currNode !== null) {
          this.set(currNode.data.key, currNode.data.value);
          currNode = currNode.next;
        }
      }
    }
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      // Bitwise left shift with 5 0s - this would be similar to
      // hash*31, 31 being the decent prime number
      // but bit shifting is a faster way to do this
      // tradeoff is understandability
      hash = (hash << 5) + hash + string.charCodeAt(i);
      // converting hash to a 32 bit integer
      hash &= hash;
    }
    // making sure hash is unsigned - meaning non-negtive number.
    return hash >>> 0;
  }
}

HashMap.MAX_LOAD_RATIO = 0.5;
HashMap.SIZE_RATIO = 3;

export default HashMap;
