class TreeNode {
    constructor(value = null) {
        this.data = value
        this.left = null
        this.right = null
    }
}

export default class Bst {
    constructor() {
        this.root = null
        this.set = new Set()
    }

    _removeDuplicates(array) {
        for (let i = 0; i < array.length; i += 1) {
            if (i >= array.length) {
                break
            }
            while (this.set.has(array[i])) {
                array[i] = array[array.length - 1]
                array.pop()
            }
            this.set.add(array[i])
        }
        return array
    }
    
    _sort(sortFunction, array) {
        return sortFunction(this._removeDuplicates(array))
    }

    buildTree(array, sortFunction) {
        this.root = this._recurseTree(this._sort(sortFunction, array), 0, array.length)
        return this.root
    }

    _recurseTree(array, start, end) {
        if (end - start === 0) {
            return null
        }
        if (end - start === 1) {
            return new TreeNode(array[start])
        }
        const mid = start + Math.floor( (end - start) / 2 )
        const root = new TreeNode(array[mid])
        root.left = this._recurseTree(array, start, mid)
        root.right = this._recurseTree(array, mid+1, end) 
        return root
    }

    insert(value) {
        if (this.set.has(value)) {
            return
        }
        this.set.add(value)
        let pointer = this.root
        while (pointer !== null) {
            if (value < pointer.data) {
                if (pointer.left === null) {
                    pointer.left = new TreeNode(value)
                    return
                }
                pointer = pointer.left
            }
            else {
                if (pointer.right === null) {
                    pointer.right = new TreeNode(value)
                    return
                }
                pointer = pointer.right
            }
        }
        // Exiting while loop means tree is empty
        this.root = new TreeNode(value)
        return
    }

    delete(value) {
        if (!this.set.has(value)) {
            return 
        }

    }

    find(value) {
        if (!this.set.has(value)) {
            return null
        }
        let pointer = this.root
        while (pointer !== null) {
            if (pointer.data === value) {
                return pointer
            }
            else if (pointer.data > value) {
                pointer = pointer.left
            }
            else {
                pointer = pointer.right
            }
        }
    }

    _isLeafNode(node) {
        if (node.left === null && node.right === null) {
            return true
        }
        return false
    }

    delete(value) {
        if (!this.set.has(value) || this.root === null) {
            return null
        }
        // find parent
        let node;
        if (value === this.root.data) {
            if (this._isLeafNode(this.root)) {
                this.root = null
                return
            }
            node = this.root
        }
        else {
            let parent = this.root
            while (parent.left !== null || parent.right !== null) {
                if (parent.data > value) {
                    if (parent.left.data == value) {
                        if (this._isLeafNode(parent.left)) {
                            parent.left = null
                            return
                        }
                        node = parent.left
                        break
                    }
                    parent = parent.left
                }
                else {
                    if (parent.right.data == value) {
                        if (this._isLeafNode(parent.right)) {
                            parent.right = null
                            return
                        }
                        node = parent.right
                        break
                    }
                    parent = parent.right
                }
            }
        }
        while (node.left !== null) {
            node.data = node.left.data
            if (this._isLeafNode(node.left)) {
                node.left = null
                return
            }
            node = node.left
        }
        while (node.right !== null) {
            node.data = node.right.data
            if (this._isLeafNode(node.right)) {
                node.right = null
                return
            }
            node = node.right
        }       
    }

    levelOrder(fxn = null) {
        const queue = [this.root]
        const arr = []
        let pointer = 0
        let pop;
        while (queue.length > 0) {
            pop = queue.shift()
            if (pop === null) {
                continue
            }
            if (fxn !== null) {
                fxn(pop)
            }
            arr.push(pop.data)
            queue.push(pop.left)
            queue.push(pop.right)
        }
        if (fxn === null) {
            return arr
        }
    }

    inorder(fxn = null) {
        const arr = []
        const _inorderR = (fxn, node) => {
            if (node === null) {
                return
            }
            _inorderR(fxn, node.left)
            arr.push(node.data)
            if (fxn !== null) {
                fxn(node)
            }
            _inorderR(fxn, node.right)
        }
        _inorderR(fxn, this.root)
        if (fxn === null) {
            return arr
        }
    }

    preorder(fxn = null) {
        const arr = []
        const _preorderR = (fxn, node) => {
            if (node === null) {
                return
            }
            arr.push(node.data)
            if (fxn !== null) {
                fxn(node)
            }
            _preorderR(fxn, node.left)
            _preorderR(fxn, node.right)
        }
        _preorderR(fxn, this.root)
        if (fxn === null) {
            return arr
        }
    }

    postorder(fxn = null) {
        const arr = []
        const _postorderR = (fxn, node) => {
            if (node === null) {
                return
            }
            _postorderR(fxn, node.left)
            _postorderR(fxn, node.right)
            arr.push(node.data)
            if (fxn !== null) {
                fxn(node)
            }
        }
        _postorderR(fxn, this.root)
        if (fxn === null) {
            return arr
        }
    }

    height(node) {
        const traverse = (node, number) => {
            if (node === null) {
                return number - 1
            }
            return Math.max(traverse(node.left, number + 1), traverse(node.right, number + 1))
        }
        return traverse(node, 0)
    }

    depth(node) {
        let depth = 0;
        let pointer = this.root
        while (node !== pointer) {
            if (pointer.data > node.data) {
                pointer = pointer.left
            }
            else {
                pointer = pointer.right
            }
            depth += 1
        }
        return depth
    }

    isBalanced() {
        if (this.root === null) {
            return true
        }
        const balanced = (node)=> {
            if (node === null) {
                return 0 
            }
            const left = balanced(node.left)
            const right = balanced(node.right)
            if (left === -1 || right === -1) {
                return -1
            }
            if (Math.abs(left - right) <= 1) {
                return Math.max(left,right) + 1
            }
            return -1
        }
        return (balanced(this.root) !== -1)
    }

    rebalance() {
        const arr = this.inorder()
        this.root = this._recurseTree(arr, 0, arr.length)
    }
}
