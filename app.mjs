import Bst from "./bst.mjs";
import * as fib from "./fibonacci.mjs";
import LinkedList from "./linkedlist.mjs";
import mergeSort from "./mergeSort.mjs";

// console.log(fib.fibR(0))
// console.log(fib.fibIt(0))
// console.log(fib.fibR(2))
// console.log(fib.fibIt(2))
// console.log(fib.fibR(3))
// console.log(fib.fibIt(3))
// console.log(fib.fibR(10))
// console.log(fib.fibIt(10))

const randArr = (length) => {
    const arr = []
    for (let i = 0; i < length; i += 1) {
        arr.push(Math.floor(Math.random()*100))
    }
    return arr
}
// console.log(mergeSort(randArr(10)))
// console.log(mergeSort(randArr(30)))

// const ll = new LinkedList()
// ll.append(2)
// ll.prepend(1)
// ll.insertAt(3,2)
// ll.insertAt(4,2)
// ll.insertAt(5,1)
// console.log(ll.find(0))
// console.log(ll.toString())

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

const tree = new Bst()
tree.buildTree(randArr(20), mergeSort)
prettyPrint(tree.root)
console.log(tree.isBalanced())
console.log(tree.inorder())
console.log(tree.preorder())
console.log(tree.postorder())
for (let i = 0; i < 10; i++) {
    tree.insert(Math.floor(Math.random()*100) + 100)
}
prettyPrint(tree.root)
console.log(tree.isBalanced())
tree.rebalance()
prettyPrint(tree.root)
console.log(tree.isBalanced())
console.log(tree.inorder())
console.log(tree.preorder())
console.log(tree.postorder())
