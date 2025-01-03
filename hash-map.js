import LinkedList from '../linked-list/linked-list.js';

export class HashMap {

  loadFactor = 0.75;
  capacity = 16;
  table = new Array(this.capacity);

  hash(key) {
    let hashCode = 0;
       
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
 
    return hashCode;
  }

  set(key, value) {
    const hashCode = this.hash(key);

    if (!(this.table[hashCode] instanceof LinkedList)) {
      this.table[hashCode] = new LinkedList();
      this.table[hashCode].append({key, value});
      this.manageLoad();
      return;
    }

    const list = this.table[hashCode];

    if ( this.has(key) ) {
      const oldNodeIndex = this.find(key);
      const oldNode = list.at(oldNodeIndex);
      oldNode.value = {key, value};
    } else {
      list.append({key, value});
    }

    this.manageLoad();
  }

  get(key) {
    const hashCode = this.hash(key);
    const list = this.table[hashCode];

    if ( this.has(key) ) {
      const keyIndex = this.find(key);
      return list.at(keyIndex).value.value;
    } else {
      return null;
    }
  }

  has(key) {
    const hashCode = this.hash(key);

    if (!(this.table[hashCode] instanceof LinkedList)) return false;

    const list = this.table[hashCode];
    let currentNode = list.head;

    for (let i = 0; i < list.size; i++) {
      if (currentNode.value.key === key) {
        return true;
      } else {
        currentNode = currentNode.nextNode;
      }
    }

    return false;
  }

  remove(key) {
    const hashCode = this.hash(key);
    const list = this.table[hashCode];

    if ( this.has(key) ) {
      const keyIndex = this.find(key);
      list.removeAt(keyIndex);
      return true;
    } else {
      return false;
    }
  }

  length() {
    let length = 0;
    for (let row of this.table) {
      if (row instanceof LinkedList) {
        length += row.size;
      }
    }

    return length;
  }

  clear() {
    for (let row of this.table) {
      if (row instanceof LinkedList) {
        while (row.size !== 0) {
          row.pop();
        }
      }
    }
  }

  keys() {
    let arr = [];

    for (let row of this.table) {
      if (row instanceof LinkedList) {
        for (let i = 0; i < row.size; i++) {
          arr.push(row.at(i).value.key);
        }
      }
    }

    return arr;
  }

  values() {
    let arr = [];

    for (let row of this.table) {
      if (row instanceof LinkedList) {
        for (let i = 0; i < row.size; i++) {
          arr.push(row.at(i).value.value);
        }
      }
    }

    return arr;
  }

  entries() {
    let arr = [];

    for (let row of this.table) {
      if (row instanceof LinkedList) {
        for (let i = 0; i < row.size; i++) {
          arr.push([row.at(i).value.key, row.at(i).value.value]);
        }
      }
    }

    return arr;
  }

  find(key) {
    const hashCode = this.hash(key);

    if (!(this.table[hashCode] instanceof LinkedList)) return -1;

    const list = this.table[hashCode];
    let currentNode = list.head;

    for (let i = 0; i < list.size; i++) {
      if (currentNode.value.key === key) {
        return i;
      } else {
        currentNode = currentNode.nextNode;
      }
    }

    return -1;
  }

  manageLoad() {
    const isOverLoaded = ( (this.length() / this.capacity) > this.loadFactor) ? true : false;
    if (isOverLoaded) {
      const entries = this.entries();
      this.capacity = this.capacity * 2;
      this.table = new Array(this.capacity);
      for (let entry of entries) {
        this.set(entry[0], entry[1]);
      }
    } 
  }
 
}