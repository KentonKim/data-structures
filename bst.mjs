class TreeNode {
    constructor(value = null) {
        this.value = value
        this.left = null
        this.right = null
    }
}

class Bst {
    constructor() {
        this.root = null
    }

    _heapify(array) {

    }

    buildTree(array) {
        this.root = new TreeNode(array[0])
        let pointer = this.root
        const stack = []
        for (let i = 1; i < array.length; i += 2){
            
        }
        return this.root
    }
}

// build tree
    // array -> balanced bst
    // return root

// insert(value)
// delete(value)
// find(value) -> node
// levelOrder(fxn)
    // bfs
    // fxn(node)
    // implement both iterative and recursive
    // else return array of nodes

// inorder(fxn)
    // else return array of nodes
// preorder(fxn)
    // else return array of nodes
// postorder(fxn)
    // else return array of nodes

// height -> int
// depth -> int

// isBalanced()
// rebalance()
    // use traversal method to provide new array to buildtree

