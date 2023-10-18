class Knight {
    constructor() {
    }
    // Returns array of coord arrays 
    posMoves(startCoord) {
        const x = startCoord[0]
        const y = startCoord[1]
        return [[x-2, y+1], [x-2, y-1], [x-1, y+2], [x+1, y+2], [x+2, y+1], [x+2, y-1], [x-1, y-2], [x+1, y-2]]
    }
}

class Board {
    constructor(sideLength = 8) {
        this.sideLength = sideLength
    }

    isLegal(coord) {
        return (coord[0] >= 0 && coord[0] < this.sideLength && coord[1] >= 0 && coord[1] < this.sideLength)
    }
}

class Node {
    constructor(data) {
        this.data = data
        this.next = []
        this.previous = null
    }
}

class MoveTree {
    constructor(start) {
        this.root = new Node(start)
        this.map = {}
        this.map[start] = this.root
    }

    insert(parentData, data) {
        const parent = this.map[parentData]
        const node = new Node(data)
        parent.next.push(node)
        node.previous = parent
        this.map[data] = node
    }

    printPath(data) {
        let str = `[${data}]`
        let pointer = this.map[data].previous
        while (pointer !== null) {
            str = `[${pointer.data}] \n` + str
            pointer = pointer.previous
        }
        return str
    }
}

const knightMoves = (start, end) => {
    let numTurns = 0
    if (start[0] === end[0] && start[1] == end[1]) {
        console.log('Please choose two different locations')
        return
    }
    const knight = new Knight()
    const board = new Board(8)
    const moveTree = new MoveTree(start)

    const findPathToEnd = (start) => {
        const positionQueue = [start]
        const seenPositions = {}
        seenPositions[start] = 0
        while (positionQueue.length > 0) {
            // check if can be added 
            let pos = positionQueue.shift()
            let arrayNextMoves = knight.posMoves(pos)
            for (const coord of arrayNextMoves) {
                if (coord in seenPositions || !board.isLegal(coord)) {
                    continue
                }
                seenPositions[coord] = seenPositions[pos] + 1
                positionQueue.push(coord)
                moveTree.insert(pos,coord)
                if (coord[0] === end[0] && coord[1] === end[1]) {
                    return (seenPositions[pos] + 1)
                }
            }
        }
    }

    numTurns = findPathToEnd(start)
    const printPath = moveTree.printPath(end)
    const message = `=> You made it in ${numTurns} moves! Here's your path: \n ${printPath}`
    console.log(message);
}

knightMoves([3,3], [3,4])