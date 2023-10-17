class Node {
    constructor(value = null) {
        this.value = value
        this.next = null
    }
}

export default class LinkedList {
    constructor() {
        this.size = 0
        this.head = null
        this.tail = null
    }

    _isEmpty() {
        if (this.head === null) {
            return true
        }
        return false
    }

    _addEmpty(node) {
        this.head = node
        this.tail = node
        this.size += 1
    }

    append(value) {
        const node = new Node(value)
        // check if empty
        if (this._isEmpty()) {
            this._addEmpty(node)
            return;
        }
        this.tail.next = node
        this.tail = node 
        this.size += 1
    }

    prepend(value) {
        const node = new Node(value)
        if (this._isEmpty()) {
            this._addEmpty(node)
            return;
        }
        node.next = this.head
        this.head = node
        this.size += 1
    }

    at(index) {
        if (index > this.size) {
            throw new Error('Index exceeds list size')
        }
        let count = 0
        let pointer = this.head
        while (count < index) {
            pointer = pointer.next
            count += 1
        }
        return pointer
    }

    pop() {
        if (this._isEmpty()) {
            return null;
        }
        let pointer = this.head
        if (this.head === this.tail) {
            this.head = null
            this.tail = null
            this.size -= 1
            return pointer
        }
        while (pointer.next !== this.tail) {
            pointer = pointer.next
        }
        const node = this.tail
        pointer.next = null
        this.tail = pointer 
        this.size -= 1
        return node
    }

    contains(value) {
        return (find(value) !== false)
    }

    find(value) {
        let index = 0
        let pointer = this.head
        while (pointer !== null) {
            if (pointer.value === value) {
                return index
            }
            pointer = pointer.next
            index += 1
        }
        return false
    }

    insertAt(value, index) {
        if (this._isEmpty()) {
            this._addEmpty(new Node(value))
        }
        if (index === 0) {
            this.prepend(value)
            return
        }
        if (index === this.size) {
            this.append(value)
            return
        }
        const pointer = this.at(index - 1)
        const node = new Node(value)
        node.next = pointer.next
        pointer.next = node
        this.size += 1
    }

    removeAt(index) {
        if (this._isEmpty()) {
            throw new Error('List is empty')
        }
        if (index == 0) {
            const pointer = this.head
            this.head = this.head.next
            this.size -= 1
            return pointer 
        }
        if (index === this.size - 1) {
            return this.pop()
        }
        const node = this.at(index)
        const pointer = this.at(index - 1)
        pointer.next = pointer.next.next
        this.size -= 1
        return node 
    }

    toString() {
        let str = ""
        let pointer = this.head
        while (pointer !== null) {
            str += `( ${pointer.value} ) -> `
            pointer = pointer.next
        }
        str += 'null'
        return str
    }
}
