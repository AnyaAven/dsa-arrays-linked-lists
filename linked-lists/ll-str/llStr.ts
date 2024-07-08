/** IndexError: raised when index not found. */

class IndexError extends Error {
}

/**
 * NodeStr: node for a singly-linked list of string.
 *
 * - val
 * - next: next NodeStr or null
 */

class NodeStr {
  val: string;
  next: NodeStr | null;

  constructor(val: string) {
    this.val = val;
    this.next = null;
  }
}

/**
 * Linked list of numbers.
 */

class LLStr {
  head: NodeStr | null;
  tail: NodeStr | null;
  length: number;

  constructor(vals: string[] = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (const val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val: string): void {
    const newNode = new NodeStr(val);

    if (this.head === null) this.head = newNode;
    else if (this.tail !== null) this.tail.next = newNode;

    this.tail = newNode;

    this.length += 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val: string): void {
    const newNode = new NodeStr(val);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {

      newNode.next = this.head;
      this.head = newNode;
    }

    this.length += 1;
  }

  /** pop(): return & remove last item.
   *
   * Throws IndexError on empty list.
   **/

  pop(): string {
    if (this.head === null || this.tail === null ) throw new IndexError;

    const val = this.tail?.val;
    let current = this.head;
    let prev = this.head;

    while (current.next) {
      prev = current;
      current = current.next;
    }
    prev.next = null;
    this.tail = prev;
    this.length -= 1;

    if(this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    return val
  }

  /** shift(): return & remove first item.
   *
   * Throws IndexError on empty list.
   **/

  shift(): string {
    if (this.head === null || this.tail === null) throw new IndexError;

    const firstVal = this.head.val;
    this.head = this.head.next;
    this.length -= 1;

    if(this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    return firstVal;
  }

  /** getAt(idx): get val at idx.
   *
   * Throws IndexError if not found.
   **/

  getAt(idx: number): string {
    if (this.head === null || this.tail === null) throw new IndexError;
    if (idx > this.length - 1) throw new IndexError

    let current = this.head;
    for(let i = 0; i <= idx; i++){
      if (i === idx) return current.val;
      if (current.next) current = current.next;
      else throw new IndexError;
    }

    throw new IndexError;
  }

  /** setAt(idx, val): set val at idx to val.
   *
   * Throws IndexError if not found.
   **/

  setAt(idx: number, val: string): void {
    if (this.head === null || this.tail === null) throw new IndexError;
    if (idx > this.length - 1 || idx < 0) throw new IndexError

    let current = this.head;

    if(this.length === 1){
      const newNode = new NodeStr(val);
      this.head = newNode;
      this.tail = newNode;
      return;
    }

    if(idx === 0){
      this.head = new NodeStr(val);
      this.head.next = current.next;
      return;
    }

    for(let i = 0; i <= idx; i++){
      if (i === idx - 1) {
        const followingNode = current.next!.next;
        current.next = new NodeStr(val);
        current.next.next = followingNode;
        if(followingNode === null) this.tail = current.next
        return
      }

      if (current.next) current = current.next;
    }
  }

  /** insertAt(idx, val): add node w/val before idx.
   *
   * Throws IndexError if not found.
   **/

  insertAt(idx: number, val: string): void {
    // if (this.head === null || this.tail === null) throw new IndexError;
    if ((idx > this.length) && this.length > 0 || idx < 0) throw new IndexError

    if(this.head === null || this.tail === null){
      const newNode = new NodeStr(val);
      this.head = newNode;
      this.tail = newNode;
      this.length++;
      return;
    }

    let current = this.head;

    if(idx === 0){
      this.head = new NodeStr(val);
      this.head.next = current;
      if (this.length === 1) {
        this.tail = current;
      }
      this.length++;
      return;
    }

    for(let i = 0; i <= idx; i++){
      if (i === idx - 1) {
        const followingNode = current.next;
        current.next = new NodeStr(val);
        current.next.next = followingNode;
        if(followingNode === null) this.tail = current.next
        this.length++;
        return
      }

      if (current.next) current = current.next;
    }
  }

  /** removeAt(idx): return & remove item at idx,
   *
   * Throws IndexError if not found.
   **/

  removeAt(idx: number): string {
    if (this.head === null || this.tail === null) throw new IndexError;
    if (idx > this.length - 1 || idx < 0) throw new IndexError

    let current = this.head

    if (idx === 0) {
      this.head = current.next;
      this.length--;
      if (this.length === 0) {
        this.head = null;
        this.tail = null;
      }
      return current.val;
    }

    for(let i = 0; i <= idx; i++){
      if(i === idx - 1){
        const removedVal = current.next!.val;
        const followingNode = current.next!.next;
        current.next = followingNode;
        this.length--;
        return removedVal;
      }

      if (current.next) current = current.next;
    }

    throw new IndexError;
  }

  /** toArray (useful for tests!) */

  toArray(): string[] {
    const out = [];
    let current = this.head;

    while (current) {
      out.push(current.val);
      current = current.next;
    }

    return out;
  }
}


export {
  IndexError,
  LLStr,
  NodeStr,
};